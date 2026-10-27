/**
 * preload.js — secure bridge between the web app and the desktop shell.
 * Runs before the page loads, with contextIsolation on. For now it only exposes
 * a flag so the web app knows it's running inside the Electron desktop shell
 * (to switch on native-window chrome: hide the fake traffic lights, enable the
 * drag strip, use macOS zoom instead of the web Fullscreen API).
 * Later, narrow native powers (notifications, file save, auto-update…) go here.
 */

const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('workieDesktop', {
  platform: process.platform,
  version: '0.1.0',
  // Backend base: l'app desktop (file locale) non raggiunge le Netlify functions con
  // percorsi relativi, quindi le chiama su questo sito pubblicato. ⚠️ Metti qui l'URL
  // reale del tuo sito Netlify (quello con le API key impostate).
  apiBase: 'https://workieapp.netlify.app',
})
