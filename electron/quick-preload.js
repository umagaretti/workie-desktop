/**
 * quick-preload.js — bridge del pannellino "Aggiungi task" (popover dalla barra).
 * Il pannello fa solo UI: scrittura/dettatura e anteprima. Il riconoscimento delle
 * task (mtParse) e la creazione avvengono nella finestra principale, così si usano
 * gli stessi dati e la stessa logica dell'app.
 */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('quickApi', {
  apiBase: 'https://workieapp.netlify.app',
  parse: (text) => ipcRenderer.invoke('workie:parse-tasks', text), // → array di bozze {title,date,time}
  addMany: (drafts) => ipcRenderer.send('workie:create-many', drafts),
  close: () => ipcRenderer.send('workie:quick-close'),
  resize: (h) => ipcRenderer.send('workie:quick-resize', h),
  onFocus: (cb) => ipcRenderer.on('quick:focus', () => { try { cb() } catch (e) {} }),
  onTheme: (cb) => ipcRenderer.on('quick:theme', (_e, th) => { try { cb(th) } catch (e) {} }),
})
