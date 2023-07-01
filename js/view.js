//loading
var TEMP = {}

$(function(){
  TEMP = {
    _loading:function(flag){
      if(flag){
        var loading = _.template(
          '<div class="sk-folding-cubeWrap">'+
            '<div class="sk-folding-cube">'+
            '<div class="sk-cube1 sk-cube"></div>'+
            '<div class="sk-cube2 sk-cube"></div>'+
            '<div class="sk-cube4 sk-cube"></div>'+
            '<div class="sk-cube3 sk-cube"></div>'+
            '</div>'+
          '</div>'
        );
        return new Promise(function(resolve) {
          resolve($(".l-Content--main").prepend(loading()));
        });
      }else{
        $(".sk-folding-cubeWrap").fadeOut('fast',function(){
          $(this).remove();
        });
      }
    }
  }

});
