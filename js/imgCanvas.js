var dropzone = document.getElementsByClassName("dropzone")[0];
var fileInput = document.getElementById("imgFile");

dropzone.addEventListener("click", function(e){
  if(fileInput){
    fileInput.click();
  }
  e.preventDefault();
}, false)

fileInput.onchange = function(){
  setImagePreview(this.value);
}

//实现实时预览的函数
function setImagePreview(avalue) {
  var divs = document.getElementById("localImag");
  if (fileInput.files && fileInput.files[0]) {
     //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
     var imgsrc = window.URL.createObjectURL(fileInput.files[0]);
     var node = document.createElement("img");
     node.src = imgsrc;
     node.className = "imglist";
     divs.appendChild(node);
   } else {
     //IE下，使用滤镜
     fileInput.select();
     var imgSrc = document.selection.createRange().text;
     var localImagId = document.getElementById("localImag");
     //必须设置初始大小
     localImagId.style.width = "100px";
     localImagId.style.height = "100px";
     //图片异常的捕捉，防止用户修改后缀来伪造图片
     try {
         localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)"
         localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
      } catch(e) {
          alert("您上传的图片格式不正确，请重新选择!");
          return false;
      }
      imgObjPreview.style.display = 'none';
      document.selection.empty();
   }
  return true;
}
