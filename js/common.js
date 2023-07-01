/**
 * 画面共通処理用javascript
 */
$(function(){

    // Ajax通信（物件一覧取得処理、メーター一覧取得処理）のヘッダ設定処理
    $(function(){
        var token = $('meta[name="_csrf"]').attr('content');
        var header = $('meta[name="_csrf_header"]').attr('content');
        $(document).ajaxSend(function(e, xhr, options) {
            xhr.setRequestHeader(header, token);
        });
    });

    // 基準日ラベル設定
    setBaseDayDisabled();

    // 前の期間ボタン押下
    $('#previousBtn').click(function() {

        // 複数送信制御
        $('#previousBtn').attr('disabled', true);

        $('#previousForm').submit();
    });

    // 次の期間ボタン押下
    $('#nextBtn').click(function() {

        // 複数送信制御
        $('#nextBtn').attr('disabled', true);

        $('#nextForm').submit();
    });

    // ログアウトリンク押下
    $('#logoutLink').click(function() {
        $('#logoutForm').submit();
    });

    // 集計期間（From）変更処理
    $('#aggregationPeriodFrom').change(function() {
        // 比較対象期間連動変更
        setCompareTargetPeriod();
        // 物件一覧取得
        getPropData();
        // グループ、メーター活性非活性制御
        setGroupAndMeterDisabled();
    });

    // 集計期間（To）変更処理
    $('#aggregationPeriodTo').change(function() {
        // 比較対象期間連動変更
        setCompareTargetPeriod();
        // 物件一覧取得
        getPropData();
        // グループ、メーター活性非活性制御
        setGroupAndMeterDisabled();
    });

    // 集計日変更処理
    $('#aggregationDate').change(function() {
        // 物件一覧取得
        getPropData();
    });

    // 対象年月(積算) 変更処理
    $('#aggregationPeriodAdditional').change(function() {
        // 物件一覧取得
        getPropData();
    });

    // 対象年月(日別) 変更処理
    $('#aggregationPeriodYYYYMM').change(function() {
        // 物件一覧取得
        getPropData();
    });

    // 集計期間 変更処理
    $('[id=aggregationPeriod]').change(function() {
        // 物件一覧取得
        getPropData();
    });

    // 集計期間 変更処理
    $('[id=aggregationPeriodDaily]').change(function() {
        // 物件一覧取得
        getPropData();
    });

    // 店舗種別変更処理
    $('[id=propType]').change(function() {
        // 物件一覧取得
        getPropData();
        // グループ、メーター活性非活性制御
        setGroupAndMeterDisabled();
    });

    // セクション変更処理
    $('[id=sectionId]').change(function() {
        // 物件一覧取得
        getPropData();
        // 物件活性非活性制御
        inputPropIdSetDisabled();
        // グループ、メーター活性非活性制御
        setGroupAndMeterDisabled();
    });

    // 店舗変更処理
    $('#propId').change(function() {
        // メーター一覧取得
        getMeterData();
        // グループ、メーター活性非活性制御
        setGroupAndMeterDisabled();
        // 基準日活性非活性制御
        setBaseDayDisabled();
    });

    // メーター変更処理
    $('#meterId').change(function() {
        // グループ、メーター活性非活性制御
        setGroupAndMeterDisabled();
    });

    // モード変更処理
    $('#mode').change(function() {
        inputPropIdSetDisabled();
        setBaseDayDisabled();
    });

    // 比較対象期間（From）変更処理
    $('#compareTargetPeriodFrom').change(function() {
        // 物件一覧取得
        getPropData();
        // グループ、メーター活性非活性制御
        setGroupAndMeterDisabled();
    });

    // 比較対象期間（To）変更処理
    $('#compareTargetPeriodTo').change(function() {
        // 物件一覧取得
        getPropData();
        // グループ、メーター活性非活性制御
        setGroupAndMeterDisabled();
    });

    // 店舗種別変更処理
    $('[name=aggregationMethod]').change(function() {
        // 比較対象日数チェック
        checkCompareTargetPeriodDays();
    });

    // 絞込みボタン押下処理
    $('#refine').click(function() {

        // 複数送信制御
        $('#refine').attr('disabled', true);

        $('#searchForm').submit();
    });

    // 前年比ラジオボタン押下処理
    $('input[name="yearOnYear"]').change(function() {
        // 物件一覧取得
        getPropData();
    });

    // 抽出方法ラジオボタン押下
    $('input[name="extractionUnit"]').change(function() {
        // 物件一覧取得
        getPropData();
    });

    // 抽出方法ラジオボタン押下
    $('input[name="extractionUnitAdditional"]').change(function() {
        // 物件一覧取得
        getPropData();
    });

    // 想定発電量 変更処理
    $('input[name="expectElectricityGenerationType"]').change(function() {
        // 物件一覧取得
        getPropData();
    });

    // 比較対象 変更処理
    $('input[name="compareTarget"]').change(function() {
        // 物件一覧取得
        getPropData();
    });

    //　印刷ボタン押下
    $("#btn_print").click(function() {
      // 印刷プレビュー表示
      printScreen();
    });

    /**
     * 物件項目活性・非活性設定
     */
    function inputPropIdSetDisabled() {
        if($('#isSolar').length == 0 || $('[id=isSolar]').val() =='0'){
            if ((!$('[id=sectionId]')[0].disabled && ($('[id=sectionId]')[0].value == '' || $('[id=sectionId]')[0].value== hyphen) )) {
                // 物件非活性
                $('#propId').val(hyphen);
                $('#propId').attr('disabled', true);
            } else {
                if ($('#mode').length) {
                    if ($('#mode').val() == singleMode) {
                        $('#propId').attr('disabled', false);
                    } else {
                        $('#propId').val(hyphen);
                        $('#propId').attr('disabled', true);
                    }
                } else {
                    // 物件活性
                    $('#propId').attr('disabled', false);
                }
            }
        }else if($('[id=isSolar]').val()=='1'){

            if ((!$('[id=sectionId]')[1].disabled && ($('[id=sectionId]')[1].value == '' || $('[id=sectionId]')[1].value== hyphen))) {
                // 物件非活性
                $('[id=propIdSolar]')[0].value = hyphen;
                $('[id=propIdSolar]')[0].disabled = true;
            } else {
                    // 物件活性
                $('[id=propIdSolar]')[0].disabled = false;
            }
        }else if($('[id=isSolar]').val()=='2'){
            if ((!$('[id=sectionId]')[2].disabled && ($('[id=sectionId]')[2].value == '' || $('[id=sectionId]')[2].value== hyphen))) {
                // 物件非活性
                $('[id=propIdSolar]')[1].value = hyphen;
                $('[id=propIdSolar]')[1].disabled = true;
            } else {
                    // 物件活性
                $('[id=propIdSolar]')[1].disabled = false;
            }
        }
    }

    /**
     * グループ、メーター項目活性・非活性設定
     */
    function setGroupAndMeterDisabled() {
        // 絞り込み条件にメーターがない場合、何もしない
        if (!$('#meterId').length) {
            return;
        }
        // セクション「指定なし」選択時、メーターを非活性、グループを活性
        if ($('#sectionId').val() == '' || $('#sectionId').val() == hyphen ) {
            $('#meterId').attr('disabled', true);
            $('#groupId').attr('disabled', false);
        }
        // 物件「指定なし」選択時、メーターを非活性、グループを活性
        if ($('#propId').val() == '' || $('#propId').val() == hyphen) {
            $('#meterId').attr('disabled', true);
            $('#groupId').attr('disabled', false);
        } else {
            // 物件「指定なし」以外を選択時、メーターを活性
            $('#meterId').attr('disabled', false);
        }
        // メーター「指定なし」を選択時、グループを活性
        if ($('#meterId').val() == '' || $('#meterId').val() == hyphen) {
            $('#groupId').attr('disabled', false);
        } else {
            // メーター「指定なし」以外を選択時、グループを非活性
            $('#groupId').attr('disabled', true);
            // グループに「指定なし」がある場合、「指定なし」を選択
            if($('#groupId').children('[value="' + hyphen + '"]').length) {
                $('#groupId').val(hyphen);
            }
        }
    }

    /**
     * 比較対象期間連動変更処理
     */
    function setCompareTargetPeriod() {
        // 比較対象期間がない場合、何もしない
        if (!$('#compareTargetPeriodFrom').length) {
            return;
        }
        // 集計期間のフォーマットチェック
        var monthFlg = $('#aggregationPeriodFrom').hasClass('month');
        var aggregationPeriodFrom = $('#aggregationPeriodFrom').val();
        var aggregationPeriodTo = $('#aggregationPeriodTo').val();
        if (!inputDtFormatCheck(aggregationPeriodTo, monthFlg) || !inputDtFormatCheck(aggregationPeriodFrom, monthFlg)) {
            return;
        }
        // 集計期間の存在チェック
        if (!existsDate(aggregationPeriodTo, monthFlg) || !existsDate(aggregationPeriodFrom, monthFlg)) {
            return;
        }
        // 日付型に変換し、集計期間妥当性チェック
        var days = dateDiff(new Date(aggregationPeriodFrom), new Date(aggregationPeriodTo));
        if (days < 0) {
            return;
        }
        // 比較対象期間に集計期間の1年前を設定
        if (monthFlg) {
            $('#compareTargetPeriodFrom').val((getInputYear(aggregationPeriodFrom) - 1) + '/' + getInputMonth(aggregationPeriodFrom));
            $('#compareTargetPeriodTo').val((getInputYear(aggregationPeriodTo) - 1) + '/' + getInputMonth(aggregationPeriodTo));
        } else {
            $('#compareTargetPeriodFrom').val((getInputYear(aggregationPeriodFrom) - 1) + '/' + getInputMonth(aggregationPeriodFrom) + '/'
                    + getInputDate(aggregationPeriodFrom));
            $('#compareTargetPeriodTo').val((getInputYear(aggregationPeriodTo) - 1) + '/' + getInputMonth(aggregationPeriodTo) + '/'
                    + getInputDate(aggregationPeriodTo));
        }
    }

    /**
     * 基準日活性非活性制御
     */
    function setBaseDayDisabled() {
        // 基準日ラジオボタンがない場合、何もしない
        if (!$('input[name="baseDay"]').length) {
            return;
        }
        // 選択した物件の基準月と基準日を取得
        var prop = propList.filter(function(p){return p.propId == $('#propId').val()})[0];
        // 検針日基準のラベル書き換え
        var baseDayText = '検針日基準';
        $('input[name="baseDay"]input[value="1"]').prop('disabled', true);
        if (prop && prop.propId != hyphen) {
            // 物件を選択した場合
            switch(prop.baseMonth) {
            case 0:
                baseDayText += '(当月';
                break;
            case 1:
                baseDayText += '(前月';
                break;
            case 2:
                baseDayText += '(2ヵ月前';
                break;
            case 3:
                baseDayText += '(3ヵ月前';
                break;
            }
            baseDayText += prop.baseDay + '日～)';
            $('input[name="baseDay"]input[value="1"]').prop('disabled', false);
        } else {
            // 物件を選択していない場合、1日基準を選択
            $('input[name="baseDay"]input[value="0"]').prop('checked', true);
        }
        $('input[name="baseDay"]input[value="1"]').next().text(baseDayText);
    }

    /**
     * 比較対象期間日数チェック.
     */
    function checkCompareTargetPeriodDays() {
        // 比較対象期間がない場合、何もしない
        if (!$('#compareTargetPeriodFrom').length) {
            return;
        }
        // 集計期間、比較対象期間のフォーマットチェック
        var monthFlg = $('#aggregationPeriodFrom').hasClass('month');
        var aggregationPeriodFrom = $('#aggregationPeriodFrom').val();
        var aggregationPeriodTo = $('#aggregationPeriodTo').val();
        var compareTargetPeriodFrom = $('#compareTargetPeriodFrom').val();
        var compareTargetPeriodTo = $('#compareTargetPeriodTo').val();
        if (!inputDtFormatCheck(aggregationPeriodFrom, monthFlg) || !inputDtFormatCheck(aggregationPeriodFrom, monthFlg)
            || !inputDtFormatCheck(compareTargetPeriodFrom, monthFlg) || !inputDtFormatCheck(compareTargetPeriodTo, monthFlg)) {
            return;
        }
        // 集計期間、比較対象期間の存在チェック
        if (!existsDate(aggregationPeriodFrom, monthFlg) || !existsDate(aggregationPeriodFrom, monthFlg)
                || !existsDate(compareTargetPeriodFrom, monthFlg) || !existsDate(compareTargetPeriodTo, monthFlg)) {
            return;
        }
        // 日付型に変換し、比較対象期間日数チェック
        var aggregationDiff, compareDiff;
        if (monthFlg) {
            aggregationDiff = monthDiff(new Date(aggregationPeriodFrom), new Date(aggregationPeriodTo));
            compareDiff = monthDiff(new Date(compareTargetPeriodFrom), new Date(compareTargetPeriodTo));
        } else {
            aggregationDiff = dateDiff(new Date(aggregationPeriodFrom), new Date(aggregationPeriodTo));
            compareDiff = dateDiff(new Date(compareTargetPeriodFrom), new Date(compareTargetPeriodTo));
        }
        // 比較対象期間日数チェック
        var warningMsgList = [];
        if ($('input[name="aggregationMethod"]:checked').val() == '0' && aggregationDiff != compareDiff) {
            // 集計方法＝「合計」かつ比較対象期間日数≠集計期間日数の場合、ワーニングメッセージを設定
            warningMsgList.push(MSG0050);
        }
        warningMessegeView(warningMsgList);
    }

    /**
     * 日付フォーマットチェック.
     *
     * @param date : 日付
     * @param monthFlg : 年月日区分（True:年月、False:年月日）
     * @return True：フォーマットOK, False:フォーマットNG
     */
    function inputDtFormatCheck(date, monthFlg) {

        var re = /^\d{4}\/\d{2}\/\d{2}$/;

        // フォーマットが年月か判定
        if (monthFlg) {
            re = /^\d{4}\/\d{2}$/;
        }

        // フォーマットチェック
        if (date.match(re) == null) {
            return false;
        }

        return true;
    }

    /**
     * 日付存在チェック.
     *
     * @param date : 日付
     * @param monthFlg : 年月日区分（True:年月、False:年月日）
     * @return True：存在チェックOK, False:存在チェックNG
     */
    function existsDate(date, monthFlg) {

        // フォーマットが年月の場合、月初で判定
        if (monthFlg) {
            date += '/01';
        }

        // 日付存在チェック
        var checkDate = new Date(date);
        return !isNaN(checkDate);
    }

    /**
     * 日付の年を取得.
     *
     * @param date : 日付
     * @return 年
     */
    function getInputYear(date) {
        return date.substr(0, 4);
    }

    /**
     * 日付の月を取得.
     *
     * @param date : 日付
     * @return 月
     */
    function getInputMonth(date) {
        return date.substr(5, 2);
    }

    /**
     * 日付の日にちを取得.
     *
     * @param date : 日付
     * @return 日にち
     */
    function getInputDate(date) {
        return date.substr(8, 2);
    }

    /**
     * 日付型に変換.
     *
     * @param y : 年
     * @param m : 月
     * @param d : 日
     * @return 日付型日付
     */
    function validDate(y,m,d) {
        var dt=new Date(y,m-1,d);
        return(dt.getFullYear()==y && dt.getMonth()==m-1 && dt.getDate()==d);
    }

    /**
     * 集計期間正当性チェック.
     *
     * @param from：集計期間（FROM）
     * @param to:集計期間（TO）
     * @param monthFlg : 年月日区分（True:年月、False:年月日）
     * @return True:正当性OK、False:正当性NG
     */
    function aggregationPeriodDiffCheck(from, to, monthFlg) {

        // フォーマット判別
        if (monthFlg) {
            if (monthDiff(from, to) >= 12) {
                return false;
            }
        } else {
            // 期間日数を取得
            var day = dateDiff(from, to);
            // 期間開始日が閏年の2月以前、または期間終了日が閏年の3月以降か判別
            if ((isLeapYear(from.getFullYear()) && from.getMonth() + 1 <= 2) || (isLeapYear(to.getFullYear()) && to.getMonth() + 1 >= 3)) {
                if (day >= 366) {
                    return false;
                }
            } else {
                if (day >= 365) {
                    return false;
                }
            }

        }
        return true;
    }

    /**
     * 月数取得.
     *
     * @param d1:開始日
     * @param d2:終了日
     * @return 月数
     */
    function monthDiff(d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth() + 1;
        return months <= 0 ? 0 : months;
    }

    /**
     * 日数取得.
     *
     * @param d1:開始日
     * @param d2:終了日
     * @return 日数
     */
    function dateDiff(d1, d2) {
        return (d2 - d1) / (1000 * 60 * 60 * 24);
    }

    /**
     * 閏年判定.
     *
     * @param year:年
     * @return True:閏年、False:閏年以外
     */
    function isLeapYear(year) {
        return (year%4 == 0) && (year%100 != 0) || (year%400 == 0);
    }

    /**
     * メッセージ表示処理.
     *
     * @param message : エラーメッセージリスト
     */
    function massegeView(message) {
        // エラーメッセージ表示
        $("#messageArea").html('');
        if (message != null && message.length > 0) {
            var outputMsg = '<div class="a-datapicker__error is-error mb-20">';
            outputMsg = outputMsg + '<strong class="mb-5"><img src="' + MSG_ICON + '">以下をご確認ください。</strong>';
            outputMsg = outputMsg + '<ul id="messageList" class="pl-26">';
            $.each(message, function(i, val) {
                outputMsg = outputMsg + '<li>・' + escapeHTML(val) + '</li>';
            });
            outputMsg = outputMsg + '</ul></div>';
            $("#messageArea").html(outputMsg);
        }
    }

    /**
     * ワーニングメッセージ表示処理.
     *
     * @param message : ワーニングメッセージリスト
     */
    function warningMessegeView(messageList) {
        // ワーニングメッセージ表示HTML生成
        var outputMsg = '';
        if (messageList != null && messageList.length > 0) {
            outputMsg = '<div class="a-datapicker__error is-warning mb-20">';
            outputMsg = outputMsg + '<strong class="mb-5"><img src="' + WARNING_MSG_ICON + '">以下をご確認ください。</strong>';
            outputMsg = outputMsg + '<ul id="messageList" class="pl-26">';
            $.each(messageList, function(i, val) {
                outputMsg = outputMsg + '<li>・' + escapeHTML(val) + '</li>';
            });
            outputMsg = outputMsg + '</ul></div>';
        }
        // ワーニングメッセージ設定
        $('#warningMessageArea').html(outputMsg);
    }

    /**
     * メッセージ表示処理.
     *
     * @param message : エラーメッセージリスト
     */
    function messegeViewDownload(message,isSolar) {
        // エラーメッセージ表示
        var target = $("[id=messageArea]").eq(isSolar);
        target.html('');
        if (message.length > 0) {
            var outputMsg = '<div class="a-datapicker__error is-error mb-20">';
            outputMsg = outputMsg + '<strong class="mb-5"><img src="' + MSG_ICON + '">以下をご確認ください。</strong>';
            outputMsg = outputMsg + '<ul id="messageList" class="pl-26">';
            $.each(message, function(i, val) {
                outputMsg = outputMsg + '<li>・' + escapeHTML(val) + '</li>';
            });
            outputMsg = outputMsg + '</ul></div>';
            target.html(outputMsg);
        }
    }

    /**
     * 物件一覧、メーター一覧取得処理.
     */
    function getPropData() {
        // パラメータ設定
        // 入力項目の書式を判別
        var monthDivision = '2';
        if ($('#aggregationPeriodFrom').hasClass('month')) {
            monthDivision = '1';
        }
        // 画面に店舗種別がある場合、画面入力値を設定、ない場合は全店舗
        var propType = '0';
        if ($('#propType').length) {
            propType = $('#propType').val();
        }

        var param;
        // 集計期間指定の場合
        if($('#aggregationPeriodFrom').length){
            param = {
                'aggregationPeriodFrom' : $('#aggregationPeriodFrom').val(),
                'aggregationPeriodTo' : $('#aggregationPeriodTo').val(),
                'aggregationDateFlag' : false,
                'propType' : propType,
                'sectionId' : $('#sectionId').val(),
                'propId' : $('#propId').val(),
                'compareTargetPeriodFrom': $('#compareTargetPeriodFrom').val(),
                'compareTargetPeriodTo': $('#compareTargetPeriodTo').val(),
                'monthDivision' : monthDivision,
                'aggregationPeriodType' : AGGREGATION_PERIOD_TYPE,
                'pvPropOnly' : $('#propId').hasClass('pv-prop'),
                'aggregationMethod' : $('input[name="aggregationMethod"]:checked').val(),
                'getMeterListFlag' : $('#meterId').length != 0
            };

        } else {
            // 集計日指定の場合
            // aggregationDateFlagがtrueの場合はCommonValidatorで集計日のチェックを行い、OKならFROMとTOにセットする
            param = {
                'aggregationDate' : $('#aggregationDate').val(),
                'aggregationDateFlag' : true,
                'propType' : propType,
                'sectionId' : $('#sectionId').val(),
                'monthDivision' : monthDivision,
                'aggregationPeriodType' : AGGREGATION_PERIOD_TYPE,
                'pvPropOnly' : $('#propId').hasClass('pv-prop')
            };
        }

        // ダウンロード画面は専用パラメータを設定
        if (GET_PROP_URL.match('/download/getPropData')) {

            //前年比有無 最新取得
            if ( $('input[name="yearOnYear"]:checked').val() == '0') {
                // 0:前年比あり→集計期間タイプ＝2:集計対象が対象年月と前年の場合
                AGGREGATION_PERIOD_TYPE = '2';
            } else {
                // 1:前年比なし→集計期間タイプ＝1:集計対象が対象年月のみの場合
                AGGREGATION_PERIOD_TYPE = '1';
            }
            if ($('[id=isSolar]').val()== '0') {
                param = {'aggregationPeriodFrom' : $('#aggregationPeriodFrom').val(),
                         'aggregationPeriodTo' : $('#aggregationPeriodTo').val(),
                         'aggregationDateFlag' : false,
                         'propType' : $('#propType').val(),
                         'sectionId' : $('#sectionId').val(),
                         'monthDivision' : monthDivision,
                         'aggregationPeriodType' : AGGREGATION_PERIOD_TYPE,
                         'extractionUnit' : $('input[name="extractionUnit"]:checked').val(),
                         'displayUnit' : $('input[name="displayUnit"]:checked').val(),
                         'yearOnYear' : $('input[name="yearOnYear"]:checked').val(),
                         'rowHeader' : $('input[name="rowHeader"]:checked').val(),
                         'isSolar' : $("[id=isSolar]").val()
                       };

            } else if($('[id=isSolar]').val()== '1') {

                var dtFrom = new Date($('#aggregationPeriodAdditional').val());
                var dtTo = new Date($('#aggregationPeriodAdditional').val());
                // 集計期間を含めた年月をToに設定する
                dtTo.setMonth(dtTo.getMonth() + (parseInt($('#aggregationPeriod').val())+1) );

                var formattedDtFrom =  dtFrom.getFullYear() + '/' + toDoubleDigits(dtFrom.getMonth()+1) + '/' + toDoubleDigits(dtFrom.getDate());
                var formattedDtTo =  dtTo.getFullYear() + '/' + toDoubleDigits(dtTo.getMonth()+1) + '/' + toDoubleDigits(dtTo.getDate());
                param = {'aggregationPeriodFrom' : formattedDtFrom,
                         'aggregationPeriodTo' : formattedDtTo,
                         'aggregationDateFlag' : false,
                         'aggregationPeriod' : $('[id=aggregationPeriod]').val(),
                         'propType' : $('[id=propType]')[1].value,
                         'sectionId' : $('[id=sectionId]')[1].value,
                         'monthDivision' : monthDivision,
                         'aggregationPeriodType' : 1, // 集計対象は対象年月のみ（前年有効物件含まず）
                         'extractionUnit' : $('input[name="extractionUnitAdditional"]:checked').val(),
                         'displayUnit' : null,
                         'yearOnYear' : null,
                         'isSolar' : $('[id=isSolar]').val()
                    };
            } else if($('[id=isSolar]').val()== '2') {

                var dtFrom = new Date($('#aggregationPeriodYYYYMM').val()+'/01');
                var dtTo = new Date($('#aggregationPeriodYYYYMM').val()+'/01');
                // 集計期間を含めた年月をToに設定する
                dtTo.setMonth(dtTo.getMonth() + (parseInt($('#aggregationPeriodDaily').val())+1) );

                var formattedDtFrom =  dtFrom.getFullYear() + '/' + toDoubleDigits(dtFrom.getMonth()+1) ;
                var formattedDtTo =  dtTo.getFullYear() + '/' + toDoubleDigits(dtTo.getMonth()+1);

                param = {'aggregationPeriodFrom' : formattedDtFrom,
                         'aggregationPeriodTo' : formattedDtTo,
                         'aggregationDateFlag' : false,
                         'aggregationPeriodDaily' : $('[id=aggregationPeriodDaily]').val(),
                         'propType' : $('[id=propType]')[2].value,
                         'sectionId' : $('[id=sectionId]')[2].value,
                         'monthDivision' : monthDivision,
                         'aggregationPeriodType' : 1, // 集計対象は対象年月のみ（前年有効物件含まず）
                         'extractionUnit' : null,
                         'displayUnit' : null,
                         'yearOnYear' : null,
                         'isSolar' : $('[id=isSolar]').val()
                    };
            }
        }

        // サーバー処理呼び出し
        $.ajax({
            type: 'POST',
            url: GET_PROP_URL,
            dataType: 'json',
            data: JSON.stringify(param),
            contentType: 'application/json',
            scriptCharset: 'utf-8',
        }).done(function(data1, textStatus, jqXHR) {
            // ダウンロード画面のみメッセージ表示タブが複数存在するため別処理
            if (GET_PROP_URL.match('/download/getPropData')) {
                if (data1.result == '0') {
                    if($('#isSolar').length == 0 || $('[id=isSolar]').val() == '0'){
                        // 物件一覧が取得できた場合は物件一覧設定
                        var propId = $('#propId').val();
                        var propIdFlg = false;
                        $('#propId').html('');
                        $('#propId').append('<option value="-">指定なし</option>');
                        $.each(data1.propList, function(i, val) {
                            $('#propId').append('<option value='+escapeHTML(val.propId)+'>'+escapeHTML(val.propNo) + ' ' + escapeHTML(val.propName)+'</option>');
                            if (val.propId == propId) {
                                propIdFlg = true;
                            }
                        });
                        if (propIdFlg) {
                            $('#propId').val(propId);
                        } else {
                            $('#propId').val(hyphen);
                        }
                    }else if($('[id=isSolar]').val() == '1') {
                        // 太陽光 物件一覧が取得できた場合は物件一覧設定
                        var propId = $('[id=propIdSolar]')[0].value;
                        if(propId == hyphen){
                            propId = USER_PROPID_SOLAR;
                        }
                        var propIdFlg = false;
                        $('[id=propIdSolar]').eq(0).html('');
                        $('[id=propIdSolar]').eq(0).append('<option value="-">指定なし</option>');
                        $.each(data1.propList, function(i, val) {
                            $('[id=propIdSolar]').eq(0).append('<option value='+escapeHTML(val.propId)+'>'+escapeHTML(val.propNo) + ' ' + escapeHTML(val.propName)+'</option>');
                            if (val.propId == propId) {
                                propIdFlg = true;
                            }
                        });
                        if (propIdFlg) {
                            $('[id=propIdSolar]')[0].value = propId;
                        } else {
                            $('[id=propIdSolar]')[0].value = hyphen;
                        }
                    }else if($('[id=isSolar]').val() == '2') {
                        // 太陽光 物件一覧が取得できた場合は物件一覧設定
                        var propId = $('[id=propIdSolar]')[1].value;
                        if(propId == hyphen){
                            propId = USER_PROPID_SOLAR;
                        }
                        var propIdFlg = false;
                        $('[id=propIdSolar]').eq(1).html('');
                        $('[id=propIdSolar]').eq(1).append('<option value="-">指定なし</option>');
                        $.each(data1.propList, function(i, val) {
                            $('[id=propIdSolar]').eq(1).append('<option value='+escapeHTML(val.propId)+'>'+escapeHTML(val.propNo) + ' ' + escapeHTML(val.propName)+'</option>');
                            if (val.propId == propId) {
                                propIdFlg = true;
                            }
                        });
                        if (propIdFlg) {
                            $('[id=propIdSolar]')[1].value = propId;
                        } else {
                            $('[id=propIdSolar]')[1].value = hyphen;
                        }
                    }
                    // セッションに物件取得後のデータを保存
                    window.globalFunction.saveFormSession();
                }
                // エラーメッセージ設定(ダウンロード画面用)
                messegeViewDownload(data1.errors,$('[id=isSolar]').val());
            }else {
                // ダウンロード画面以外の画面は共通処理
                if (data1.result == '0') {
                    // 物件一覧が取得できた場合は物件一覧設定
                    var propId = $('#propId').val();
                    var propIdFlg = false;
                    $('#propId').html('');
                    $('#propId').append('<option value="-">指定なし</option>');
                    $.each(data1.propList, function(i, val) {
                        $('#propId').append('<option value='+escapeHTML(val.propId)+'>'+escapeHTML(val.propNo) + ' ' + escapeHTML(val.propName)+'</option>');
                        if (val.propId == propId) {
                            propIdFlg = true;
                        }
                    });
                    if (propIdFlg) {
                        $('#propId').val(propId);
                    } else {
                        $('#propId').val(hyphen);
                    }
                    // メンテナンス画面では「指定なし」要素を削除し最初の要素を選択
                    if ($('#propId').hasClass('no-hyphen')) {
                        $('#propId').children('option[value="-"]').remove();
                        $('#propId').prop('selectedIndex', 0);
                    }
                    // 物件一覧取得後の物件選択情報でメーター一覧取得
                    getMeterData();
                    // 物件一覧取得後の物件選択情報で基準日活性非活性制御
                    setBaseDayDisabled();
                    // 物件一覧変数が存在する場合、上書きする
                    if (typeof(propList) != 'undefined') {
                        propList = data1.propList;
                    }
                }
                // エラーメッセージ設定
                massegeView(data1.errors);
                // ワーニングメッセージ設定
                warningMessegeView(data1.warnings);
            }
        }).fail(function(jqXHR, textStatus, errorThrown){
            // エラー画面へ遷移
            location.href = ERROR_URL;
        });
    }

    /**
     * メーター一覧取得処理.
     */
    function getMeterData() {
        // 絞り込み条件にメーターがない場合、何もしない
        if (!$('#meterId').length) {
            return;
        }

        // パラメータ設定
        // 集計期間の年月、年月日指定判定
        var monthDivision = '2';
        if ($('#aggregationPeriodFrom').hasClass('month')) {
            monthDivision = '1';
        }
        // 画面に店舗種別がある場合、画面入力値を設定
        var propType = '0';
        if ($('#propType').length) {
            propType = $('#propType').val();
        }
        var param = {
            'aggregationPeriodFrom' : $('#aggregationPeriodFrom').val(),
            'aggregationPeriodTo' : $('#aggregationPeriodTo').val(),
            'aggregationDate' : $('#aggregationDate').val(),
            'aggregationDateFlag' : $('#aggregationDate').length != 0,
            'propType' : propType,
            'sectionId' : $('#sectionId').val(),
            'propId' : $('#propId').val(),
            'monthDivision' : monthDivision,
            'aggregationPeriodType' : AGGREGATION_PERIOD_TYPE,
            'compareTargetPeriodFrom' : $('#compareTargetPeriodFrom').val(),
            'compareTargetPeriodTo' : $('#compareTargetPeriodTo').val(),
            'aggregationMethod' : $('input[name="aggregationMethod"]:checked').val()
        };

        // サーバー処理呼び出し
        $.ajax({
            type : 'POST',
            url : GET_METER_URL,
            dataType : 'json',
            data : JSON.stringify(param),
            contentType : 'application/json',
            scriptCharset : 'utf-8',
        }).done(function(data1, textStatus, jqXHR) {
            // メーター一覧が取得できた場合
            if (data1.result == '0') {
                // 前回選択値を保持
                var meterId = $('#meterId').val();
                var meterIdFlg = false;
                // メータープルダウン初期化
                $('#meterId').html('');
                $('#meterId').append('<option value="-">指定なし</option>');
                $.each(data1.meterList, function(i, val) {
                    $('#meterId').append('<option value=' + escapeHTML(val.meterId) + '>' + escapeHTML(val.meterName) + '</option>');
                    if (val.meterId == meterId) {
                        meterIdFlg = true;
                    }
                });
                // メーター一覧に前回選択値がある場合は前回選択値、ない場合は指定なし
                if (meterIdFlg) {
                     $('#meterId').val(meterId);
                } else {
                    // メーターを「指定なし」に変更し、グループを活性
                     $('#meterId').val(hyphen);
                     $('#groupId').attr('disabled', false);
                }
            }
            // エラーメッセージ設定
            massegeView(data1.errors);
            // ワーニングメッセージ設定
            warningMessegeView(data1.warnings);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            // エラー画面へ遷移
            location.href = ERROR_URL;
        });
    }

    // 数値０埋め
    var toDoubleDigits = function(num) {
        num += '';
        if (num.length === 1) {
            num = '0' + num;
        }
        return num;
    };

});

function escapeHTML(str) {
    return str.replace(/[&"<>]/g, function(c) {
        return {
          '&': '&amp;',
          '"': '&quot;',
          '<': '&lt;',
          '>': '&gt;'
        }[c];
    });
}

// ナビゲーション用送信処理
function navigationSubmit(url) {

    // 複数送信制御
    $('.navi').removeAttr('onclick');

    $('#navigationForm').attr('action', url);
    $('#navigationForm').submit();
}

//印刷ボタン押下処理
function printScreen(){
    // ブラウザの印刷プレビューを表示する
    window.print();
}