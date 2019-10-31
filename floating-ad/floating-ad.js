var float = (function () {
  var $floatDom = null
  var defualt = {
    imgSrc : 'https://avatars3.githubusercontent.com/u/33107804', //背景图路径
    url:'https://github.com/Fredxingxing', //跳转页
    newWindow:true, //当前页还是新页
    imgWidth:300,
    speed:10,
  }
  var toRight = true
  var toBottom = true
  var step = 1
  var x= 0
  var y = 0
  var render =  function  (options) {
    defualt = $.extend(defualt,options)
    // console.log(defualt)
    var target = defualt.newWindow ? "target='_blank'" : '';
    $floatDom = "" +
      "<div id='float' style='position:absolute;left: 0;top:0;z-index: 10000;clear:both'>" +
      " <div style='position:relative'>" +
      "   <a href='"+defualt.url+"' "+target+" style='display: block'>" +
      "    <img width='"+defualt.imgWidth+"'  src='"+defualt.imgSrc+"' class='float_img'/>  " +
      "   </a>" +
      "   <a id='float-close' style='font-size:16px;font-weight:bold;color:white;position:absolute;right:0px;top:0px;width:24px;text-align:center;cursor: pointer;'>" +
      "      X" +
      "   </a> " +
      // "   " +
      " </div>" +
      "</div>"
    $('body').append($floatDom)
    $('#float-close').click(function () {
      $('#float').remove()
    })
    var moving = setInterval(floating, options.speed);
    $('#float').mouseover(function () {
      clearInterval(moving)
    })
    $('#float').mouseout(function () {
      moving = setInterval(floating, options.speed);
    })
  }
  var floating = function () {
    var obj = $('#float')
    var doc = $(document)
    var obj_W = obj.width()
    var obj_H = obj.height()
    var doc_W = doc.width()
    var doc_H = doc.height()
    if(x>doc_W-obj_W-1){
      toRight = false
      x = doc_W-obj_W-1
    }
    if(x<0){
      toRight = true
      x= 0
    }
    x = x+ step*(toRight? 1 :-1)
    if(y>doc_H-obj_H-1){
      toBottom = false
      y = doc_H - obj_H-1
    }
    if(y<0){
      toBottom = true
      y = 0
    }
    y= y+step*(toBottom?1:-1)
    var left = x;
    var top = y;

    obj.css({
      'top': top,
      'left': left
    });
  }
  return{
    render // 参数 render
  }
})()
