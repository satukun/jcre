var E = {}
$(function(){

  let elm = [
    ".p-main--notification .a-notification__detailWrap",
    ".a-ButtonSet .btn",
    ".a-notification__link",
    ".modal-content",
    ".p-main--infolist .a-infolist__detailWrap"
  ]

  E = {

    _init:function(){
      this._event();
    },

    _event:function(){
      $.each(elm,function(index, element){
        $(document).on('click',elm[index],function(e){
          if($(this).hasClass("a-notification__detailWrap")){
            //アコーディオンの開閉
            window.ENE._accordion($(this));

          }else if($(this).hasClass("a-btn")){
            if(!$(this).hasClass("is-disable")){
              if (!$(this).hasClass("is-error")) {
                //ボタンのon/offの切り替え
                window.ENE._buttonGroupToggle($(this));
              }
            }
          }else if($(this).hasClass("modal-content")){
            e.stopPropagation();
          } else if ($(this).hasClass("a-infolist__detailWrap")) {
              //アコーディオンの開閉
              window.ENE._accordion($(this));
          }
        });
      });
    }
  }

  E._init();
});
