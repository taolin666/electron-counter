
/*
*   使用说明: 
*   本计算器代码,只是为了演示electron 开发桌面级软件测试使用,
*   因为时间关系,并么有解决完所有bug,如遇到望谅解! 
* 
*/
var num = 0, // 临时值    幕后值
  result = 0, // 结果值   显示: 结果值
  numshow = "0"; //屏幕值  显示: 临时值

const JINGDU = 100000;

var operate = 0; //判断输入状态的标志   1: 点击加减乘除操作 0:输入数字状态
// 作用: 判断是否需要拼接后面
var method = 0; //判断计算的方式 判断计算状态的标志  加:1 减:2 乘:3 除:4
var quit = 0; //防止重复按键的标志
// 作用: 防止一直连续加下去

//方法1:  点击数据
function command(num) {


  //1. 获取屏幕得值
  var str = document.getElementById('screenNum').value;
  // 如果不为0 , 说明有数据,就按照数据走
  // 如果operate == 0为哦,意思就是还没有开始输入+-*操作,
  //            != 0 意思就是还没有开始操作,
  // 如果为0 ,说明还没有开始输入数据,就为空字符串
  //  如果当前值不是"0"，且状态为0，则返回当前值，否则返回空值; 
  //  str = (str != "0") ? ((operate == 0) ? str : "") : ""; //
  str = (str != "0") ? ((operate == 0) ? str : '') : '';

  //2.拼接当前输入的值 
  str = str + String(num);

  //3. 刷新当前数据
  document.querySelector('#screenNum').value = str;

  //4. 切换状态 (0:为数字输入状态)
  operate = 0;
  quit = 0;
}

//方法2:  点击 + 
function plus() {

  calculate(); // 计算
  method = 1; // 加法
  operate = 1; //切换到: 操作 
}

// 方法3: 减法 - 
function minus() {

  calculate(); // 计算
  method = 2; // 减法
  operate = 1; //切换到: 操作 
}

// 方法4: 乘法 x 
function times() {

  calculate(); // 计算
  method = 3; // 减法
  operate = 1; //切换到: 操作 
}

// 方法3: 除法 
function divide() {

  calculate(); // 计算
  method = 4; // 减法
  operate = 1; //切换到: 操作 
}

//方法3: 点击 = 
function equal() {

  calculate();
  operate = 1;
  num = 0;
  result = 0;
  numshow = '0';

}

// 方法4: 清空
function clearScreen() {

  num = 0;
  result = 0;
  numshow = '0';
  document.querySelector('#screenNum').value = '0';
}

// 小数点
function dot() {

  // 判断当前值是不是'0',且状态为0 ,则返回当前值,否则返回''
  var str = document.querySelector('#screenNum').value;

  // 举例 : 
  //1. 是:0 点击 . 的话 --> 0.XXX 所以要留下0
  //2. 不是0 
  //2.1 operate是0: 如果是 234,  直接连接.
  //2.2 operate 不是0, 如果是 + , 那就的重新获取0
  str = (str != 0) ? ((operate == 0) ? str : '0') : '0'

  //2. 遍历之前是不是有过.了,如果有了,不再添加.

  for (var i = 0; i < str.length; i++) {
    var element = str[i];

    // console.log(element);

    if (element == '.') {
      console.log('返回')
      return;
    }
    // }
  }

  //3. 拼接 赋值

  // str = str + '.';
  document.querySelector('#screenNum').value = str + '.';

  //4. 设置输入状态
  operate = 0;

}

// 正负
function opposite() {

  var str = document.querySelector('#screenNum').value;

  // str =  (str != 0) ? str : '0'
  // str =  (str != 0) ? ((operate == 1) ? '0': str) : '0';

  if (str != '0' && str != '') {

    // 是负数
    if (str.indexOf('-') > -1) {

      str = str.substr(1, str.length);

      // 证书  
    } else {
      str = '-' + str;
    }
  }

  // 获取值
  document.querySelector('#screenNum').value = str;;

  // num = Number(str);


  console.log('-----', str, num);

}

// 求余
function remaind() {

  calculate();
  operate = 1;
  method = 5;
}


// 方法3: 计算函数
function calculate() {


  // 思路: 点击 + : num(之前的结果) + numshow(屏幕展示的值)
  // 1+2(1+2=num)+ 3(numshow) + 6

  //1. 获取屏幕值
  numshow = document.querySelector('#screenNum').value;

  // 结果为0 的时候,处理加减没有意义
  //2. 计算
  if (num != 0 && quit != 1) {
    switch (method) {
      case 1: //加

        // num + (numshow - 0)
        // console.log('ca: ',(numshow - 0)*JINGDU))
        result = (num * JINGDU + (numshow - 0) * JINGDU) / JINGDU;
        break;
      case 2: //减
        // num - (numshow - 0)
        result = (num * JINGDU - (numshow - 0) * JINGDU) / JINGDU;
        break;
      case 3: //乘

        result = (num * JINGDU * (numshow - 0)) / JINGDU;
       // result = (((num - 0)*JINGDU) * ((numshow - 0)*JINGDU)) / (JINGDU*JINGDU);
       // console.log(((num - 0)*JINGDU));
        // console.log(((numshow - 0)*JINGDU));
        // console.log((((num - 0)*JINGDU) * ((numshow - 0)*JINGDU)));
        // console.log(JINGDU*JINGDU);
        // console.log(result);
        
        
        break;
      case 4: //除


        if (numshow != 0) {

          // 小数后5位
          result = ((num * JINGDU / (numshow - 0)) / JINGDU) //.toFixed(5)
          // result = (num/ (numshow - 0)).toFixed(5);

          // 小数后都是0 只拿前面的
          console.log('result', result);

          if ((result + '').indexOf('.') > -1 && (result + '').split('.')[1].length > 5) {

            result = result.toFixed(5);
          }

        } else {
          alert('被除数不能为 0');
        }

        break;

      case 5: //求余

        result = num % (numshow - 0); //(num * JINGDU % (numshow - 0)*JINGDU) / JINGDU;
        // result = (((num - 0)*JINGDU) * ((numshow - 0)*JINGDU)) / (JINGDU*JINGDU);

        //遍历 result 找到.后面的位数,如果大于5,就截取前面五个
        // if (result.splite) {

        // }


        break;
    }
    // 防止重复点击操作 进行计算
    quit = 1;
  } else {

  
    console.log('numshow', numshow)
    result = numshow;

  }

    //3. 获取结果赋值
    document.querySelector('#screenNum').value = String(result);

    //4. 存储当前值
    num = result;

}


const {ipcRenderer} = require('electron')
// 接受主进程传来的color
ipcRenderer.on('color2Index', (event, color) => {
  document.querySelector('#screenNum').style.color = color;
})

// 接受主进程传来的空的fontSize
ipcRenderer.on('fontSize2IndexADD', (event, fontSize) => {
  let font = window.getComputedStyle(document.querySelector('#screenNum'), null).fontSize
  // 增加fontSize
  document.querySelector('#screenNum').style.fontSize = font.replace(/px/, '')-0 + 3 + 'px'
})

// 接受主进程传来的空的fontSize
ipcRenderer.on('fontSize2IndexReduce', (event, fontSize) => {
  let font = window.getComputedStyle(document.querySelector('#screenNum'), null).fontSize
  // 减少fontSize
  document.querySelector('#screenNum').style.fontSize = font.replace(/px/, '') - 3 + 'px'
})


