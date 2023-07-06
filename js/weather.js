$(function () {

  function checkBreakPoint() {
    w = $(window).width();
    if (w <= 1540) {
      // 1540px以下のとき
      $('#slider-weatherForecastData').not('.slick-initialized').slick({
        //スライドさせる
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1280,
            settings: {
            slidesToShow: 2,
            },
          },
          {
            breakpoint: 1024,
            settings: {
            slidesToShow: 2,
            },
          },
        ],
      });
    } else {
      // 1540以上のとき
      //スライドさせない
      $('#slider-weatherForecastData').slick('unslick');
    }
    if (w <= 980) {
      // 980px以下のとき
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
