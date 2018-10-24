var painter = new painter("canvas");   //画笔模块
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
    //canvasPen = penColor;
    painter.setLineColor(penColor);
  }
}
for(var i=0; i<oli.length; i++){
  oli[i].onclick = handler(oli[i]);
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
