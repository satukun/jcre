//********************
//アコーディオン
//ボタンセット
//日付選択
//**********

var ENE = {}

$(function(){

  let elm = [
    ".p-main--notification .a-notification__detailWrap",
    ".a-ButtonSet button",
    ".a-notification__link",
    ".a-notification__terms",
    ".modal-content",
    ".p-main--infolist .a-infolist__detailWrap",
  ]

  ENE = {
    _init:function(){
      var self = this;
      Promise.all([
        self._datepicker(),
        self._chartDrawing()
      ])
      .then(function(data) {
        setTimeout(function(){
          window.TEMP._loading(false);
          if($(".p-main--top").length > 0){
            $(".p-main--top,.m-copyright").fadeIn("fast");

          }else if($(".l-Content--mainTop").length > 0){
            $(".l-Content--mainTop,.m-copyright").fadeIn("fast");
          }

        },800);
      });

    },

    //********************
    //chart発火
    //********************
    _chartDrawing:function(){
        if($(".p-canvas").length > 0){
          if(window.data){
            return new Promise(function(resolve) {
              resolve(window._chart(data));
            });
          }else{
            return new Promise(function(resolve) {
              resolve("no data");
            });
          }
        }
      },

    //********************
    //アコーディオン
    //********************
    _accordion:function(elem){
      let self = elem.parent()
      if(self.hasClass("is-active")){
        self.removeClass("is-active");
      }else{
        self.addClass("is-active");
      }
    },

    //********************
    //ボタンセット
    //********************
    _buttonGroupToggle:function(elem){
      elem.siblings().removeClass("is-active");
      elem.addClass("is-active");
    },

    //********************
    //日付選択
    //********************
    _datepicker:function(){
      const month = {
        language:'ja',
        format: 'yyyy/mm',
        startView: 1,
        maxViewMode: 2,
        orientation: 'bottom',
        immediateUpdates: true,
        autoclose: true,
        assumeNearbyYear: true,
        minViewMode: 'months'
      }

      const measurement = {
        language:'ja',
        format: 'yyyy/mm/dd',
        startView: 0,
        orientation: 'bottom',
        immediateUpdates: false,
        autoclose: true,
        assumeNearbyYear: true,
        minViewMode: 'days'
      }

      return new Promise(function(resolve) {
          //年月表示
          if($('.a-datapicker--typeMonth').length > 0){
            const typeMonthElem = $('.a-datapicker--typeMonth');
            typeMonthElem.find('#aggregationPeriodFrom').datepicker(month);
            typeMonthElem.find('#aggregationPeriodTo').datepicker(month);
            typeMonthElem.find('#aggregationPeriodYYYYMM').datepicker(month);
            typeMonthElem.find('#compareTargetPeriodFrom').datepicker(month);
            typeMonthElem.find('#compareTargetPeriodTo').datepicker(month);
          }

          //年月日表示
          if($('.a-datapicker--typeDays').length > 0){
            const typeDaysElem = $('.a-datapicker--typeDays');
            typeDaysElem.find('#aggregationPeriodFrom').datepicker(measurement);
            typeDaysElem.find('#aggregationPeriodTo').datepicker(measurement);
            typeDaysElem.find('#aggregationPeriodAdditional').datepicker(measurement);
            typeDaysElem.find('#compareTargetPeriodFrom').datepicker(measurement);
            typeDaysElem.find('#compareTargetPeriodTo').datepicker(measurement);
            typeDaysElem.find('#summaryAggregationPeriodFrom').datepicker(measurement);
            typeDaysElem.find('#summaryAggregationPeriodTo').datepicker(measurement);
            typeDaysElem.find('#rankingAggregationPeriodFrom').datepicker(measurement);
            typeDaysElem.find('#rankingAggregationPeriodTo').datepicker(measurement);
            typeDaysElem.find('#dailyAggregationPeriod').datepicker(measurement);
            typeDaysElem.find('#infoStartDate').datepicker(measurement);
            typeDaysElem.find('#infoEndDate').datepicker(measurement);
          }

          //日付表示
          if($('.a-datapicker--typeDay').length > 0){
            const typeDayElem = $('.a-datapicker--typeDay');
            typeDayElem.find('#aggregationDate').datepicker(measurement);
          }
          resolve('datepicker');
        });
    }
  }

  ENE._init();
});
