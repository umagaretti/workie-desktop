/**
 * main.js — Electron main process.
 * Creates the desktop window and loads the Workie web app (index.html).
 * Security: contextIsolation on, nodeIntegration off; external links open in
 * the user's browser, not inside the app window.
 */

const { app, BrowserWindow, shell, dialog, Tray, Menu, globalShortcut, nativeImage } = require('electron')
const { autoUpdater } = require('electron-updater')
const path = require('path')

// Scorciatoia globale per "Nuova task al volo" (funziona anche fuori dall'app).
// Due tasti soli, sempre con ⌘. Si cambia in una riga qui sotto.
const QUICK_TASK_ACCEL = 'CommandOrControl+J'

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
/** @type {Tray | null} */
let tray = null // tenuto in vita: se lo perde il GC, l'icona sparisce dalla barra

/** Mostra e porta davanti la finestra (la ricrea se chiusa del tutto). */
function showApp() {
  if (!mainWindow) {
    createWindow()
    return
  }
  if (mainWindow.isMinimized()) mainWindow.restore()
  mainWindow.show()
  mainWindow.focus()
}

/** Porta davanti Workie e apre subito la finestra "Nuova task". */
function quickTask() {
  // Finestra viva ma nascosta → la pagina è già caricata, apre all'istante.
  if (mainWindow && !mainWindow.webContents.isLoading()) {
    showApp()
    mainWindow.webContents.send('workie:quick-task')
    return
  }
  // Finestra non pronta (o appena ricreata): aspetta il caricamento, poi manda.
  if (!mainWindow) createWindow()
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
    mainWindow?.focus()
  })
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow?.webContents.send('workie:quick-task')
  })
}

/** Icona nella barra dei menu (in alto a destra). Bianca su barra scura: è una
 *  "template image" (macOS la colora da sé). Click sinistro = apre l'app. */
function createTray() {
  if (tray) return
  const icon = nativeImage.createFromPath(path.join(__dirname, 'workieTrayTemplate.png'))
  icon.setTemplateImage(true)
  tray = new Tray(icon)
  tray.setToolTip('Workie')
  const menu = Menu.buildFromTemplate([
    { label: 'Apri Workie', click: showApp },
    { label: 'Nuova task', accelerator: 'Cmd+J', click: quickTask },
    { type: 'separator' },
    { label: 'Esci da Workie', click: () => { app.isQuitting = true; app.quit() } },
  ])
  // Niente setContextMenu: così il click sinistro apre l'app e il destro mostra il menu.
  tray.on('click', showApp)
  tray.on('right-click', () => tray?.popUpContextMenu(menu))
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#ffffff',
    titleBarStyle: 'hiddenInset', // native macOS traffic lights, roomy title bar
    trafficLightPosition: { x: 13, y: 16 }, // pallini macOS un filo più in basso
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

  // Chiudere la finestra (pallino rosso) la NASCONDE: l'app resta nella barra in
  // alto e si riapre all'istante da icona o scorciatoia. Con Cmd+Q esce davvero.
  mainWindow.on('close', (e) => {
    if (!app.isQuitting) {
      e.preventDefault()
      mainWindow?.hide()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()
  createTray()

  // Scorciatoia globale: apre "Nuova task" da qualsiasi app.
  const ok = globalShortcut.register(QUICK_TASK_ACCEL, quickTask)
  if (!ok) console.error('[shortcut] impossibile registrare', QUICK_TASK_ACCEL)

  // Check for updates only in the packaged app (never during `npm start`).
  if (app.isPackaged) initAutoUpdate()

  // macOS: riporta su la finestra quando si clicca l'icona nel Dock.
  app.on('activate', () => showApp())
})

// Cmd+Q / uscita esplicita: segna che stiamo chiudendo davvero.
app.on('before-quit', () => { app.isQuitting = true })

// Libera la scorciatoia globale all'uscita.
app.on('will-quit', () => globalShortcut.unregisterAll())

// macOS keeps apps running until Cmd+Q; other platforms quit on last window.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
