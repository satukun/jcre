$(function () {

  function checkBreakPoint() {
    w = $(window).width();
    if (w <= 1280) {
      // 1280px以下のとき
      $('#slider-weatherForecastData').not('.slick-initialized').slick({
        //スライドさせる
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
            slidesToShow: 1,
            },
          },
        ],
      });
    } else {
      // 1281以上のとき
      //スライドさせない
      $('#slider-weatherForecastData').slick('unslick');
    }
    if (w <= 768) {
      // 768px以下のとき
      //スライドさせない
      $('#slider-weatherForecastData').slick('unslick');
    } 
  }
  // ウインドウがリサイズする度にチェック
  $(window).resize(function () {
    checkBreakPoint();
  });
  // 初回チェック
  checkBreakPoint();
});
