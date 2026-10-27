/**
 * main.js — Electron main process.
 * Creates the desktop window and loads the Workie web app (index.html).
 * Security: contextIsolation on, nodeIntegration off; external links open in
 * the user's browser, not inside the app window.
 */

const { app, BrowserWindow, shell } = require('electron')
const path = require('path')

/** @type {BrowserWindow | null} */
let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#ffffff',
    titleBarStyle: 'hiddenInset', // native macOS traffic lights, roomy title bar
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  mainWindow.loadFile(path.join(__dirname, '..', 'index.html'))

  mainWindow.once('ready-to-show', () => mainWindow?.show())

  // Open target="_blank" / window.open links in the default browser.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      shell.openExternal(url)
    }
    return { action: 'deny' }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()

  // macOS: re-create a window when the dock icon is clicked and none are open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// macOS keeps apps running until Cmd+Q; other platforms quit on last window.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
