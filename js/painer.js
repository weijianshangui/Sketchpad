(function(){
  function painer(canvasID){
    var canvas = document.getElementById(canvasID);
    this.context = canvas.getContext("2d");
    this.draw(canvas);
  }
  //绘制
  painer.prototype.draw = function(canvas){
    var that = this;
    //鼠标按下时
    canvas.onmousedown = function(ev){
      var ev = ev || window.event;
      var start_x = ev.clientX - parseFloat(getStyle(slider, 'width')) - canvas.offsetLeft + document.body.scrollLeft;
      var start_y = ev.clientY - canvas.offsetTop + document.body.scrollTop;
      that.context.beginPath();

      //移动画笔的初始位置
      if(window.widthChange){
        that.context.moveTo(start_x,start_y);
      }else{
        that.context.moveTo(start_x*(1-0.2),start_y*(1-0.2))
      }
      //设置画笔属性
      //that.context.lineCap = 'round';
      //that.context.lineJoin ="round";
      //that.context.lineWidth = 1;
      //that.context.strokeStyle = canvasPen;
      //鼠标移动时
      canvas.onmousemove = function(ev){
        var move_x = ev.clientX - parseFloat(getStyle(slider, 'width')) - canvas.offsetLeft + document.body.scrollLeft;
        var move_y = ev.clientY - canvas.offsetTop + document.body.scrollTop;
        //移动画笔的结束位置
        if(window.widthChange){
          that.context.lineTo(move_x,move_y);
        }else{
          that.context.lineTo(move_x*(1-0.2), move_y);
        }
        //开始绘制
        that.context.stroke();
      };

      //鼠标抬起时
      canvas.onmouseup = function(){
        that.context.restore();
        that.context.closePath();
        canvas.onmousemove = null;
        canvas.onmouseup = null;
      }
    }
  }
  //画笔宽度
	painer.prototype.setLineWidth = function(width){
		if(width==""){
			this.context.lineWidth = 5;
		}else{
			this.context.lineWidth = width;
		}
	}
	//画笔颜色
	painer.prototype.setLineColor = function(color){
		if(color==""){
			this.context.strokeStyle = "#f19600";
		}else{
			this.context.strokeStyle = color;
		}

	}
	//绘制的形状
	painer.prototype.setShape = function(shape){

	}

  window.painter = painer;
})()
