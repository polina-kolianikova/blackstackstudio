import { BSSpiral } from '../spiral/spiral.js';

await document.fonts.ready;
const gallery = BSSpiral.mount(document.getElementById('projects'), {
  language: document.documentElement.lang || 'ru'
});
await gallery.ready;
gallery.setLanguage(document.documentElement.lang || 'ru');

// Keep a direct original navigation link aligned after gallery media are ready.
if (location.hash && location.hash !== '#hero') {
  document.querySelector(location.hash)?.scrollIntoView({ behavior: 'instant' });
}
