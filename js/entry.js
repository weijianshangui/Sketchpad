window.onload = function(){
  var menuBtn = document.getElementsByClassName("menu")[0];
  var slider = document.getElementsByClassName("slider")[0];
  var content = document.getElementsByClassName("content")[0];
  var sliderContent = document.getElementsByClassName("sliderContent")[0];
  var covans = document.getElementById("canvas");

  var flag = true; //slider打开与关闭的flag
  var timer = null; //slider滑动的定时器
  var sliderW = 20; //slider占款宽度的20%
  var contentW = 80;//content占宽度的80%
  window.widthChange = true;

  slider.style.height = document.documentElement.clientHeight + 'px';
  content.style.height = document.documentElement.clientHeight + 'px';
  //设置canvas的大小
  canvas.width = parseFloat(getStyle(content, 'width'));
  canvas.height = parseFloat(getStyle(content, 'height'))
  //按钮控制左侧滑动页
  menuBtn.onclick = function(){
    var speed = 1;    //滑动的速度
    var flagDisplay = true;
    clearInterval(timer);
    if(flag){
      window.widthChange = false;
      flag = false;
      timer = setInterval(function(){
        if(sliderW > speed){ //这里需要注意一下，不能将sliderW设置为大于0，因为如果当sliderW-speed小于0是 走到else会出现闪屏现象
          speed += 0.2;
          sliderW -= speed;
          contentW += speed;
          slider.style.width = sliderW + '%';
          content.style.width = contentW + '%';
          if(sliderW < 15){
            if(flagDisplay){
              flagDisplay = false;
              sliderContent.style.display = "none";
            }
          }
        }else{
          slider.style.width = 0;
          content.style.width = "100%";
          //调整canvas的大小
        //  canvas.width = parseFloat(getStyle(content, 'width'));
          //canvas.height = parseFloat(getStyle(content, 'height'));
          clearInterval(timer);
        }
      },20);
    }else{
      window.widthChange = true;
      flag = true;
      timer = setInterval(function(){
        if(sliderW < (20-speed)){
          speed += 0.1;
          sliderW += speed;
          contentW -= speed;
          if(sliderW > 15){
            sliderContent.style.display = "block";
          }
          slider.style.width = sliderW + '%';
          content.style.width = contentW + '%';
        }else{
          content.style.width = "80%";
          slider.style.width = "20%";
          //调整canvas的大小
          //canvas.width = parseFloat(getStyle(content, 'width'));
          //canvas.height = parseFloat(getStyle(content, 'height'));
          clearInterval(timer);
        }
      },20);
    };
  }
  //获取元素的样式
  function getStyle(el, name){
    if(window.getComputedStyle){
      return window.getComputedStyle(el)[name];
    }else{
      return el.currentStyle[name];
    }
  }
}
