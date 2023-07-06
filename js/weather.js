$(function () {
  // スライダー要素を取得
  const slider = $("#slider-weatherForecastData");

  // ブレイクポイントをチェックし、スライダーの初期化・非初期化を行う関数
  function checkBreakPoint() {
    // ウィンドウの幅を取得
    const windowWidth = $(window).width();

    // ウィンドウの幅が980px以下または1541px以上の場合
    if (windowWidth <= 980 || windowWidth >= 1541) {
      // スライダーが初期化されている場合は非初期化
      if (slider.hasClass("slick-initialized")) {
        slider.slick("unslick");
      }
      // スライダーが初期化されない場合でも、画像のsrc属性を元の画像に戻す
      slider.find("img[data-lazy]").each(function () {
        $(this).attr("src", $(this).attr("data-lazy"));
      });
    } else {
      // ウィンドウの幅が981px以上1540px以下の場合
      if (!slider.hasClass("slick-initialized")) {
        // スライダーが初期化されていない場合は初期化
        // ローディング画像の設定
        slider.find("img[data-lazy]").each(function () {
          $(this).attr("src", "../img/ajax-loader.gif");
        });

        // スライダーを初期化
        slider.slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          lazyLoad: "ondemand", // 画像の遅延読み込みを有効にする
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
          // 画像が遅延読み込みされた後に実行される関数
          onLazyLoaded: function (event, slick, image, imageSource) {
            // 画像のsrc属性を元の画像に戻す
            image.attr("src", imageSource);
          },
        });
      }
    }
  }

  // ウィンドウがリサイズされたときにブレイクポイントのチェックを行う
  $(window).resize(checkBreakPoint);
  // 初回のブレイクポイントのチェックを行う
  checkBreakPoint();
});
