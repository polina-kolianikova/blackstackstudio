document.addEventListener("DOMContentLoaded", () => {
    const template = document.getElementById("brief-template");
    const button = document.getElementById("select-template");
    const status = document.getElementById("template-status");
    if (!template || !button || !status) return;
    button.hidden = false;
    button.addEventListener("click", () => {
        template.focus({ preventScroll: true });
        template.select();
        status.textContent = "Текст выделен — скопируйте его или скачайте файл";
    });
});
