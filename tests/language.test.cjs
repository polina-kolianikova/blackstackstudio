const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../js/language.js'), 'utf8');
const api = require('../js/language.js');

function visit({url = 'https://blackstackstudio.com/', languages = ['ka-GE', 'en'], saved, legacy, blocked = false} = {}) {
  let redirected;
  const storage = new Map();
  if (saved !== undefined) storage.set(api.storageKey, saved);
  if (legacy !== undefined) storage.set('bs.lang', legacy);
  const window = {
    document: {addEventListener() {}},
    navigator: {languages, language: languages[0]},
    location: {href: url, replace(target) { redirected = target; }},
    localStorage: {
      getItem(key) { if (blocked) throw Error('disabled'); return storage.get(key); },
      setItem(key, value) { if (blocked) throw Error('disabled'); storage.set(key, value); },
    },
  };
  vm.runInNewContext(source, {window, URL});
  return {redirected, storage};
}

test('regional browser preferences select the first supported language', () => {
  assert.equal(api.browserLanguage(['tr-TR', 'ka-GE', 'en-US']), 'ka');
  assert.equal(api.browserLanguage(['uk-UA', 'ru']), 'uk');
  assert.equal(api.browserLanguage(['ru-RU', 'en-US']), 'ru');
  assert.equal(api.browserLanguage(['hy-AM', 'tr']), 'en');
  assert.equal(api.browserLanguage([]), 'en');
});
test('first visit uses browser language and keeps query and fragment', () => {
  assert.equal(visit({url:'https://blackstackstudio.com/?utm_source=instagram#contact'}).redirected,
    'https://blackstackstudio.com/ka/?utm_source=instagram#contact');
});
test('saved Russian overrides a Georgian browser on later visits', () => {
  assert.equal(visit({saved:'ru'}).redirected, undefined);
  assert.equal(visit({saved:'uk'}).redirected, 'https://blackstackstudio.com/uk/');
});
test('previously stored website choices are honored', () => {
  assert.equal(visit({legacy:'ru'}).redirected, undefined);
  assert.equal(visit({legacy:'uk'}).redirected, 'https://blackstackstudio.com/uk/');
  assert.equal(visit({saved:'ru', legacy:'uk'}).redirected, undefined);
});
test('explicit localized URLs never redirect or overwrite the visitor preference', () => {
  for (const path of ['/en/', '/uk/', '/ka/', '/ka/design/', '/en/montage/?category=short-video']) {
    const result = visit({url:'https://blackstackstudio.com'+path,saved:'ru'});
    assert.equal(result.redirected, undefined);
    assert.equal(result.storage.get(api.storageKey), 'ru');
  }
});
test('invalid or unavailable storage cannot break negotiation', () => {
  assert.equal(visit({saved:'invalid'}).redirected, 'https://blackstackstudio.com/ka/');
  assert.equal(visit({blocked:true}).redirected, 'https://blackstackstudio.com/ka/');
  assert.equal(visit({blocked:true,url:'https://blackstackstudio.com/?lang=ru'}).redirected, undefined);
});
test('explicit fallback choice is saved when possible and prevents a redirect loop', () => {
  const result = visit({url:'https://blackstackstudio.com/?lang=ru',saved:'ka'});
  assert.equal(result.redirected, undefined);
  assert.equal(result.storage.get(api.storageKey), 'ru');
});
test('switching language preserves the equivalent route', () => {
  assert.equal(api.localizedPath('/en/services/web-development/','ka'), '/ka/services/web-development/');
  assert.equal(api.localizedPath('/ka/montage/','ru'), '/montage/');
  assert.equal(api.localizedPath('/design/','uk'), '/uk/design/');
  assert.equal(api.localizedPath('/index.html','ka'), '/ka/');
});
