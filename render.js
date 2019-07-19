// 加载app模块
const {app} = require('electron')

// 
const {BrowserWindow} = require('electron').remote

const path = require('path')

let colorWin

app.on('ready', creatColorWindow)

function creatColorWindow() {
  colorWin = new BrowserWindow({
    width:284,
    height:198
  })

  colorWin.loadURL('https://github.com')
}