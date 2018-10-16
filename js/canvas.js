var canvas = document.getElementById('canvas');
var oul = document.getElementById('pen');
var oli = oul.getElementsByTagName('li');
var context = canvas.getContext("2d");
var slider = document.getElementsByClassName("slider")[0];

var canvasPen = "#fffff";

//设置画笔颜色
var oliflag = oli[0];
oliflag.style.border = "2px solid #ddd";
function handler(ele){
  return function(){
    oliflag.style.border = "";
    oliflag = ele;
    ele.style.border = "2px solid #ddd";
    var penColor = colorRGB2Hex(getStyle(ele, 'background'));
    canvasPen = penColor;
  }
}
for(var i=0; i<oli.length; i++){
  oli[i].onclick = handler(oli[i]);
}

//canvas绘制事件
//鼠标按下时
canvas.onmousedown = function(ev){
  var ev = ev || window.event;
  var start_x = ev.clientX - parseFloat(getStyle(slider, 'width')) - canvas.offsetLeft + document.body.scrollLeft;
  var start_y = ev.clientY - canvas.offsetTop + document.body.scrollTop;
  context.beginPath();

  //移动画笔的初始位置
  if(window.widthChange){
    context.moveTo(start_x,start_y);
  }else{
    context.moveTo(start_x*(1-0.2),start_y*(1-0.2))
  }
  //设置画笔属性
  context.lineCap = 'round';
  context.lineJoin ="round";
  context.lineWidth = 1;
  context.strokeStyle = canvasPen;
  //鼠标移动时
  canvas.onmousemove = function(ev){
    var move_x = ev.clientX - parseFloat(getStyle(slider, 'width')) - canvas.offsetLeft + document.body.scrollLeft;
    var move_y = ev.clientY - canvas.offsetTop + document.body.scrollTop;
    //移动画笔的结束位置
    if(window.widthChange){
      context.lineTo(move_x,move_y);
    }else{
      context.lineTo(move_x*(1-0.2), move_y);
    }
    //开始绘制
    context.stroke();
  };

  //鼠标抬起时
  canvas.onmouseup = function(){
    context.restore();
    context.closePath();
    canvas.onmousemove = null;
    canvas.onmouseup = null;
  }
}

//获取元素的样式
function getStyle(el, name){
  if(window.getComputedStyle){
    return window.getComputedStyle(el)[name];
  }else{
    return el.currentStyle[name];
  }
}
//将rgb颜色转为hex
function colorRGB2Hex(color) {
  var rgb = color.split(',');
  var r = parseInt(rgb[0].split('(')[1]);
  var g = parseInt(rgb[1]);
  var b = parseInt(rgb[2].split(')')[0]);
  var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex;
}
