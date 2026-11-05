/**
 * preload.js — secure bridge between the web app and the desktop shell.
 * Runs before the page loads, with contextIsolation on. For now it only exposes
 * a flag so the web app knows it's running inside the Electron desktop shell
 * (to switch on native-window chrome: hide the fake traffic lights, enable the
 * drag strip, use macOS zoom instead of the web Fullscreen API).
 * Later, narrow native powers (notifications, file save, auto-update…) go here.
 */

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('workieDesktop', {
  platform: process.platform,
  version: '0.1.0',
  // Backend base: l'app desktop (file locale) non raggiunge le Netlify functions con
  // percorsi relativi, quindi le chiama su questo sito pubblicato. ⚠️ Metti qui l'URL
  // reale del tuo sito Netlify (quello con le API key impostate).
  apiBase: 'https://workieapp.netlify.app',
  // Pannellino rapido (icona barra / ⌘J): il processo main manda qui le task da creare
  // (array di bozze), salvate con la stessa logica dell'app. Registrarsi con onQuickCreateMany(cb).
  onQuickCreateMany: (cb) => ipcRenderer.on('workie:create-many', (_e, drafts) => { try { cb(drafts) } catch (e) {} }),
  // Login Google su desktop: l'accesso avviene nel browser di sistema, che poi riapre
  // l'app con questo indirizzo (deep link). Va aggiunto anche tra i "Redirect URLs" di Supabase.
  authRedirect: 'workie://auth-callback',
  // Apre un link https nel browser di sistema (il main accetta solo https).
  openExternal: (url) => ipcRenderer.send('workie:open-external', String(url || '')),
  // Il main inoltra qui l'indirizzo workie://auth-callback… quando il browser riapre l'app.
  onAuthCallback: (cb) => ipcRenderer.on('workie:auth-callback', (_e, url) => { try { cb(url) } catch (e) {} }),
})
