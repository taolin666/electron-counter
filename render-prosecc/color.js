

const {ipcRenderer} = require('electron')

let span = document.querySelectorAll('span')

for(var i=0;i<span.length;i++) {
  span[i].onclick = function() {
    // 渲染进程向主进程传值
    ipcRenderer.send('color2main', this.dataset.color)
  }
}