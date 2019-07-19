// 加载Menu模块

const {app, BrowserWindow, Menu, webContents} = require('electron')
const path =  require('path');

// 配置menu的模板
let template = [
  {
    label: '斑马计算器',
    submenu: [
      {
        label: '退出',
        accelerator: 'ctrl+F4',
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: '设置',
    submenu: [
      {
        label: 'color',
        accelerator: 'ctrl+Z',
        click() {
          // 打开浏览器的地址
          // require('electron').shell.openExternal('https://electron.atom.io')

          ml_createColorHandl()
        }
      },
      // 菜单之间中间加一条线
      {
        type: 'separator'
      },
      {
        label: '增加size',
        accelerator:'ctrl+M',
        click(item, focusedWindow) {
          // focusedWindow 是点击的时候可以用的事件
          // 例：
          // blur: [Function],
          // focus: [Function],
          // show: [Function: visibilityChanged],
          // hide: [Function: visibilityChanged],
          // minimize: [Function: visibilityChanged],
          // maximize: [Function: visibilityChanged],
          // restore: [Function: visibilityChanged] },

          // item 是当前的这个窗口的信息

          if (focusedWindow) {
            // 发送一个标识到index（子进程）这样可以让传fontSize过来
            focusedWindow.webContents.send('fontSize2IndexADD')
          }
        }
      },
      {
        label: '减少size',
        accelerator:'ctrl+N',
        click(item, focusedWindow) {
          if (focusedWindow) {
            // 发送一个标识到index（子进程）这样可以让传fontSize过来
            focusedWindow.webContents.send('fontSize2IndexReduce')
          }
        }
      }
    ]
  }
]

// 生成menu
let menu = Menu.buildFromTemplate(template)

// 设置menu
Menu.setApplicationMenu(menu)

// 弹出颜色的进程函数
function ml_createColorHandl() {
  let win = new BrowserWindow({
    width:250,
    height: 95
  })
  // 关闭color的菜单
  win.setMenu(null)
  
  // win.webContents.openDevTools()
  win.loadURL(path.join(__dirname, '../sections/color.html'))
}

