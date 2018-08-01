'use strict'

import { app, BrowserWindow, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      webSecurity: false
    }
  })
  mainWindow.loadURL(winURL)
  mainWindow.webContents.on('did-finish-load', () => {
    let version = app.getVersion()
    let title = app.getName()
    mainWindow.setTitle(title + ' v' + version)
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    type: 'info',
    message: 'Se esta descargando la nueva actualizacion'
  })
})

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    type: 'info',
    message: 'Hay una nueva actualizacion disponible, desea descargarla?',
    buttons: ['Yes', 'No']
  }, (response) => {
    if (response === 0) {
      autoUpdater.quitAndInstall()
    }
  })
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdatesAndNotify()
})