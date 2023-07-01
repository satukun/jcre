/**
 * 分析サマリ画面処理用JavaScript
 */
$(function() {

  // 単価設定モーダル表示時処理
  $('#unit-price-modal').on('show.bs.modal', function(event) {
      // 入力した単価をモーダルに設定
      var inputUnitPrice = $('#unitPrice').val();
      $('#unit-price-display').text(inputUnitPrice + ' 円/kWh');
  });

  // 単価設定モーダルOKボタン押下処理
  $('#change-unit-price-submit').click(function() {
      // 複数送信制御
      $('#change-unit-price-submit').attr('disabled', true);
      // 単価変更form実行
      $('#price').submit();
  });

  // 絞込みボタン押下処理
  $('#refine').click(function() {

      // 複数送信制御
      $('#refine').attr('disabled', true);

      $('#summaryForm').submit();
  });

  // 前の期間ボタン押下
  $('#summary-previousBtn').on('click', function() {
    // 複数送信制御
    $('#summary-previousBtn').attr('disabled', true);
    $('#isNext').val(false);
    $('#isPrev').val(true);
    $('#summaryForm').submit();
  });

    // 次の期間ボタン押下
  $('#summary-nextBtn').on('click', function() {

    // 複数送信制御
    $('#summary-nextBtn').attr('disabled', true);
    $('#isNext').val(true);
    $('#isPrev').val(false);
    $('#summaryForm').submit();
  });
});
