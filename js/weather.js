$(function () {
  // スライダー要素を取得
  const slider = $("#slider-weatherForecastData");
  const slickInitialized = $("#slider-weatherForecastData");

  // デバウンス関数
  function debounce(func, wait) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    };
  }

  // ブレイクポイントをチェックし、スライダーの初期化・非初期化を行う関数
  function checkBreakPoint() {
    // ウィンドウの幅を取得
    const windowWidth = $(window).width();

    // ウィンドウの幅が1000px以下または1541px以上の場合
    if (windowWidth <= 990 || windowWidth >= 1541) {
      // スライダーが初期化されている場合は非初期化
      if (slider.hasClass("slick-initialized")) {
        slider.slick("unslick");
      }
    } else {
      // ウィンドウの幅が990px以上1540px以下の場合
      if (!slider.hasClass("slick-initialized")) {
        // スライダーが初期化されていない場合は初期化
        // スライダーを初期化
        slider.slick({
          slidesToShow: 6,
          slidesToScroll: 1,
          // lazyLoad: "ondemand", // 画像の遅延読み込みを有効にする
          responsive: [
            {
              breakpoint: 1461,
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 1281,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 1211,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 1071,
              settings: {
                slidesToShow: 2,
              },
            },
          ],
        });
      }
    }
    // リサイズイベント後にスライダーの再描画を強制;
    if (slider.hasClass("slick-initialized")) {
      slickInitialized.animate({ opacity: 1 });
    }
  }

  // デバウンスを適用してリサイズイベントの負担を軽減
  $(window).resize(debounce(checkBreakPoint, 100));
  // 初回のブレイクポイントのチェックを行う
  checkBreakPoint();
});
