const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const source = fs.readFileSync(path.join(root, "js/instagram.js"), "utf8");
const html = fs.readFileSync(path.join(root, "instagram/index.html"), "utf8");
const download = fs.readFileSync(path.join(root, "instagram/brief-template.txt"), "utf8");
const text = html.match(/<textarea\b[^>]*id="brief-template"[^>]*>([\s\S]*?)<\/textarea>/)[1];

test("selection covers the complete real brief without accessing either clipboard API", () => {
    let ready;
    let click;
    const template = {
        value: text, selectionStart: 10, selectionEnd: 20, focused: false,
        focus(options) { this.focused = true; assert.equal(options.preventScroll, true); },
        select() { this.selectionStart = 0; this.selectionEnd = this.value.length; },
    };
    const button = { hidden: true, addEventListener(_, handler) { click = handler; } };
    const status = { textContent: "" };
    const elements = { "brief-template": template, "select-template": button, "template-status": status };
    vm.runInNewContext(source, {
        document: {
            addEventListener(_, handler) { ready = handler; },
            getElementById(id) { return elements[id]; },
            execCommand() { assert.fail("Selection must not invoke clipboard commands"); },
        },
        navigator: { get clipboard() { assert.fail("Selection must not request clipboard access"); } },
    });
    ready();
    assert.equal(button.hidden, false);
    click();
    assert.equal(template.focused, true);
    assert.equal(template.value.slice(template.selectionStart, template.selectionEnd), text);
    assert.equal(template.value, text);
    assert.equal(status.textContent, "Текст выделен — скопируйте его или скачайте файл");
    assert.doesNotMatch(status.textContent, /скопирован/);
});

test("the downloadable file contains the exact visible template and a real download link", () => {
    assert.equal(download, text + "\n");
    assert.match(html, /href="\/instagram\/brief-template\.txt" download="Бриф для разработки\.txt"/);
    assert.match(html, /id="select-template"[^>]*>Выделить текст<\/button>/);
});
