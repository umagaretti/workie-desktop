/**
 * preload.js — secure bridge between the web app and the desktop shell.
 * Runs before the page loads, with contextIsolation on. We expose nothing yet;
 * when the UI needs native powers (notifications, file save, auto-update…) we
 * add narrow, explicit APIs here via contextBridge — never the whole of Node.
 */

// Intentionally empty for now. Example for later:
// const { contextBridge, ipcRenderer } = require('electron')
// contextBridge.exposeInMainWorld('workie', {
//   notify: (title, body) => ipcRenderer.send('notify', { title, body }),
// })
