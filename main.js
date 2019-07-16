
const {app, BrowserWindow} = require('electron')

app.on('ready', createWindow);

function createWindow() {
    let win = BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadURL('www.baidu.com')
}