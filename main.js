
// 导入electron模块的app和 BrowserWindow模块
const {app, BrowserWindow, ipcMain } = require('electron')

// 加载path模块
const path = require('path')

// 保持对window的全局引用
let win

// 开启 （electron的初始化，创建窗口）
app.on('ready', creatWindow)

// 开启函数
function creatWindow() {

  // 创建浏览器窗口,设计窗口的属性
  win = new BrowserWindow({
    width: 248,
    height: 358
    // resizable: false
    // width: 800,
    // height: 500
  })
  
  // 打开开发者工具页面
  // win.webContents.openDevTools()

  // 要加载的路径
  win.loadURL(path.join(__dirname, './index.html'))
}
require('./main-prosecc/menu')

// 接受color渲染进程传来的值
ipcMain.on('color2main', (event, color) => {
  
  // 再传给子进程index
  win.webContents.send('color2Index', color)
})



