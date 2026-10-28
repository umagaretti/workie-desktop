/**
 * main.js — Electron main process.
 * Creates the desktop window and loads the Workie web app (index.html).
 * Security: contextIsolation on, nodeIntegration off; external links open in
 * the user's browser, not inside the app window.
 */

const { app, BrowserWindow, shell, dialog, Tray, Menu, globalShortcut, nativeImage, ipcMain, screen, session } = require('electron')
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
/** @type {BrowserWindow | null} */
let popover = null // pannellino "Aggiungi task" che scende dall'icona nella barra
/** @type {Tray | null} */
let tray = null // tenuto in vita: se lo perde il GC, l'icona sparisce dalla barra

/** Mostra e porta davanti la finestra intera (menu "Apri Workie" / icona Dock). */
function showApp() {
  if (!mainWindow) {
    createWindow()
    return
  }
  if (mainWindow.isMinimized()) mainWindow.restore()
  mainWindow.show()
  mainWindow.focus()
}

/** Assicura che la finestra principale sia caricata (anche se nascosta), poi esegue cb.
 *  Serve per creare la task in background senza aprire l'app intera. */
function ensureMainLoaded(cb) {
  if (mainWindow && !mainWindow.webContents.isLoading()) { cb(); return }
  if (!mainWindow) createWindow()
  mainWindow.webContents.once('did-finish-load', cb)
}

/** Crea (una volta) il pannellino popover che ospita quick.html. */
function createPopover() {
  if (popover) return
  popover = new BrowserWindow({
    width: 344,
    height: 330,
    show: false,
    frame: false,
    transparent: true,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    hasShadow: false, // l'ombra la disegna il CSS (finestra trasparente)
    webPreferences: {
      preload: path.join(__dirname, 'quick-preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })
  popover.loadFile(path.join(__dirname, 'quick.html'))
  popover.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
  // Clic fuori dal pannellino → si chiude.
  popover.on('blur', () => { if (popover && popover.isVisible()) popover.hide() })
}

/** Posiziona il pannellino sotto l'icona nella barra, centrato, dentro lo schermo. */
function positionPopover() {
  try {
    const b = tray.getBounds()
    const w = popover.getBounds().width
    const area = screen.getDisplayNearestPoint({ x: b.x, y: b.y }).workArea
    let x = Math.round(b.x + b.width / 2 - w / 2)
    x = Math.max(area.x + 6, Math.min(x, area.x + area.width - w - 6))
    const y = Math.round(b.y + b.height + 2)
    popover.setPosition(x, y, false)
  } catch (e) { /* se fallisce resta dove sta */ }
}

/** Legge il tema corrente dall'app e lo passa al pannellino (così combacia dark/light). */
function sendThemeToPopover() {
  if (!popover || popover.isDestroyed()) return
  ensureMainLoaded(() => {
    const js = `(function(){var s=getComputedStyle(document.documentElement);var g=function(n){return s.getPropertyValue(n).trim();};return {bg:g('--bg'),panel:g('--panel'),panel2:g('--panel-2'),inset:g('--inset'),text:g('--text'),textDim:g('--text-dim'),muted:g('--muted'),border:g('--border'),borderSoft:g('--border-soft'),accent:g('--accent'),accent2:g('--accent-2'),accentSoft:g('--accent-soft')};})()`
    mainWindow.webContents.executeJavaScript(js, true)
      .then((th) => { if (popover && !popover.isDestroyed()) popover.webContents.send('quick:theme', th) })
      .catch(() => {})
  })
}

/** Mostra/nasconde il pannellino (icona barra e ⌘J fanno questo). */
function togglePopover() {
  if (!popover) createPopover()
  if (popover.isVisible()) { popover.hide(); return }
  positionPopover()
  sendThemeToPopover()
  popover.show()
  popover.focus()
  popover.webContents.send('quick:focus')
}

/** Icona nella barra dei menu (in alto a destra). Bianca su barra scura: è una
 *  "template image" (macOS la colora da sé). Click = apre il pannellino. */
function createTray() {
  if (tray) return
  const icon = nativeImage.createFromPath(path.join(__dirname, 'workieTrayTemplate.png'))
  icon.setTemplateImage(true)
  tray = new Tray(icon)
  tray.setToolTip('Workie — aggiungi una task')
  const menu = Menu.buildFromTemplate([
    { label: 'Aggiungi task', accelerator: 'Cmd+J', click: togglePopover },
    { label: 'Apri Workie', click: showApp },
    { type: 'separator' },
    { label: 'Esci da Workie', click: () => { app.isQuitting = true; app.quit() } },
  ])
  // Niente setContextMenu: il click sinistro apre il pannellino, il destro il menu.
  tray.on('click', togglePopover)
  tray.on('right-click', () => tray?.popUpContextMenu(menu))
}

// Riconoscimento task: riusa mtParse() della finestra principale (stesso parser dell'app).
ipcMain.handle('workie:parse-tasks', (_e, text) => new Promise((resolve) => {
  ensureMainLoaded(async () => {
    try {
      const js = '(function(){try{return (typeof mtParse==="function")?mtParse(' + JSON.stringify(String(text || '')) + '):[];}catch(e){return [];}})()'
      const drafts = await mainWindow.webContents.executeJavaScript(js, true)
      resolve(Array.isArray(drafts) ? drafts : [])
    } catch (e) { resolve([]) }
  })
}))
// Creazione: la logica vera sta nella finestra principale → stessi dati, stessa sync.
ipcMain.on('workie:create-many', (_e, drafts) => {
  ensureMainLoaded(() => mainWindow?.webContents.send('workie:create-many', drafts))
})
ipcMain.on('workie:quick-close', () => { if (popover) popover.hide() })
// Il pannellino misura la sua altezza reale e chiede di adattare la finestra.
ipcMain.on('workie:quick-resize', (_e, h) => {
  if (!popover) return
  const height = Math.max(120, Math.min(560, Math.round(h || 0)))
  const [w] = popover.getSize()
  popover.setContentSize(w, height)
  positionPopover()
})

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
  createPopover()

  // Microfono: consenti la dettatura (getUserMedia) alle nostre finestre.
  session.defaultSession.setPermissionRequestHandler((_wc, permission, cb) => {
    cb(permission === 'media' || permission === 'microphone' || permission === 'audioCapture')
  })
  session.defaultSession.setPermissionCheckHandler((_wc, permission) =>
    permission === 'media' || permission === 'microphone' || permission === 'audioCapture')

  // Scorciatoia globale: apre il pannellino "Aggiungi task" da qualsiasi app.
  const ok = globalShortcut.register(QUICK_TASK_ACCEL, togglePopover)
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
