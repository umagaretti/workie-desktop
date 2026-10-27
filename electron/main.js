/**
 * main.js — Electron main process.
 * Creates the desktop window and loads the Workie web app (index.html).
 * Security: contextIsolation on, nodeIntegration off; external links open in
 * the user's browser, not inside the app window.
 */

const { app, BrowserWindow, shell, dialog } = require('electron')
const { autoUpdater } = require('electron-updater')
const path = require('path')

// App name (menu bar, "About", notifications). The packaged build also gets this
// from package.json "productName"; setting it here fixes the name in dev too.
app.setName('Workie')

/**
 * Auto-update (electron-updater → GitHub Releases).
 * NOTE: on macOS this only applies updates when the app is SIGNED (Apple
 * requirement). Unsigned/dev builds just log and do nothing. Runs only in the
 * packaged app, never during `npm start`.
 */
function initAutoUpdate() {
  autoUpdater.autoDownload = true
  autoUpdater.autoInstallOnAppQuit = true

  autoUpdater.on('error', (err) => console.error('[auto-update] error:', err))
  autoUpdater.on('checking-for-update', () => console.log('[auto-update] checking…'))
  autoUpdater.on('update-available', (info) => console.log('[auto-update] available:', info.version))
  autoUpdater.on('update-not-available', () => console.log('[auto-update] up to date'))
  autoUpdater.on('update-downloaded', (info) => {
    dialog
      .showMessageBox({
        type: 'info',
        buttons: ['Riavvia ora', 'Più tardi'],
        defaultId: 0,
        cancelId: 1,
        message: 'Aggiornamento pronto',
        detail: `Workie ${info.version} è stato scaricato. Riavvia per applicarlo.`,
      })
      .then((res) => {
        if (res.response === 0) autoUpdater.quitAndInstall()
      })
  })

  autoUpdater.checkForUpdatesAndNotify().catch((e) => console.error('[auto-update]', e))
}

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

  // Check for updates only in the packaged app (never during `npm start`).
  if (app.isPackaged) initAutoUpdate()

  // macOS: re-create a window when the dock icon is clicked and none are open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// macOS keeps apps running until Cmd+Q; other platforms quit on last window.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
