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
    useContentSize: true,
    webPreferences: {
      webSecurity: false
    }
  })
  mainWindow.maximize()
  mainWindow.loadURL(winURL)
  mainWindow.webContents.on('did-finish-load', () => {
    let version = app.getVersion()
    let title = app.getName()
    mainWindow.setTitle(title + ' v' + version)
  })
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
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
    message: 'Se esta descargando la nueva version'
  })
})

autoUpdater.on('update-not-available', () => {
  createWindow()
})

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') {
    if (process.platform !== 'darwin') {
      autoUpdater.checkForUpdatesAndNotify()
    } else {
      createWindow()
    }
  }
  if (process.env.NODE_ENV === 'development') createWindow()
})
