function _chart(data) {
  let datasets = [];
  let datasetsLegendName = "";
  let datasetsColorName = "";
  let datasetsCompositionName = "";

  let verticalAxisLabel = [];
  let targetDataListBox = [];
  let lastYearDataListBox = [];
  let diffDataListBox = [];

  let $graphTitle = $("#graphTitle");
  let $legendBox = $(".a-legend__Inner");
  let $priceLabel = $(".a-amount__notice");

  let amountTargetDataMax = 0;
  let amountlastYearDataMax = 0;

  let colors = ['#FF0000', '#0000FF', '#008000'];
  let colorsClass = ['red', 'blue', 'green'];

  var unitPrice = data.unitPrice;
  var displayUnitVal = data.displayUnitVal;

  // ------------------------------
  // X軸メモリ
  // ------------------------------
  let Maximumvalue = 0;
  let MaximumvalueRate = 1.05;
  let stepSize = 4;
  let digitCount;
  let digits;
  let multiple = 20;

  // ------------------------------
  // dataをチャートオプション用に整形
  // ------------------------------

  data.dataset.targetDataList.forEach(function (val) {
    verticalAxisLabel.push(val.axisLabel);
  });

  function composition(type) {
    if (type == "対象年月") {
      data.dataset.targetDataList.forEach(function (val) {
        targetDataListBox.push(val.useAmount);
        if (amountTargetDataMax <= val.useAmount) {
          amountTargetDataMax = val.useAmount;
        }
      });
      datasetsCompositionName = targetDataListBox;

    } else if (type == "前年同月") {
      data.dataset.lastYearDataList.forEach(function (val) {
        lastYearDataListBox.push(val.useAmount);
        if (amountlastYearDataMax <= val.useAmount) {
          amountlastYearDataMax = val.useAmount;
        }
      });
      datasetsCompositionName = lastYearDataListBox;

    } else {
      data.dataset.diffDataList.forEach(function (val) {
        diffDataListBox.push(val.useAmount);
      });
      datasetsCompositionName = diffDataListBox;
    }

    if (amountTargetDataMax >= amountlastYearDataMax) {
      Maximumvalue = amountTargetDataMax;
    } else {
      Maximumvalue = amountlastYearDataMax;
    }

    return datasetsCompositionName;
  }

  Object.keys(data.legendLabel).forEach(function (key, num) {
    datasetsColorName = colors[num];
    $legendBox.append('<li class="a-legend__Box a-legend__Box--' + colorsClass[num] + '"><span>' + data.legendLabel[key] + '</span></li>');
    datasets.push({
      label: data.legendLabel[key],
      data: composition(data.legendLabel[key]),
      backgroundColor: datasetsColorName,
      borderWidth: 0
    });
  });


  digitCount = "1";
  for (i = 1; i < String(Maximumvalue).length; i++) {
    digitCount += "0";
  }
  digits = digitCount;

  // グラフタイトル
  $graphTitle.text(data.graphTitle);

  // ------------------------------
  // 整形したdataをobjに格納
  // ------------------------------
  let obj = {
    labels: verticalAxisLabel,
    datasets: datasets
  }

  // ------------------------------------------------------------
  // 3桁区切り（小数第一位表示）数値変換処理
  // ------------------------------------------------------------
  const getCommaSeparatedValue = function (value, digits) {
    const num = Number(value);
    return num.toLocaleString('ja-JP', { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }

  // ------------------------------
  // チャート描画実行エリア（オプションにobjをセット）
  // ------------------------------

  let myChart = null; 

  const createChart = () => {
    var ctx = document.getElementById("myChart").getContext('2d');

    if (myChart) {
      myChart.destroy();
  }

    myChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: obj,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          mode: 'point',
          intersect: true,
          callbacks: {
            title: function (tooltipItem, chart) {
              return "";
            },
            label: function (tooltipItem, data) {
              var unit;
              var value = tooltipItem.value;
              var digit = 0;
              if (displayUnitVal == '2') {
                digit = 4;
              }
              value = getCommaSeparatedValue(value, digit);
              if (unitPrice == null) {
                unit = 'kWh';
              } else {
                unit = '円';
              }
              if (displayUnitVal == "2") {
                unit = 't-CO2';
              }
              return data.datasets[tooltipItem.datasetIndex].label + ': ' + value + unit;
            }
          }
        },
        scales: {
          yAxes: [
            {
              display: true,
              barPercentage: 0.65,
              maxBarThickness: 10,
              categoryPercentage: 0.5,
              ticks: {
                fontColor: '#333',
                fontSize: 14,
                padding: 20
              },
              gridLines: {
                drawBorder: false,
                display: false
              }
            }
          ],
          xAxes: [
            {
              display: true,
              barPercentage: 0.65,
              ticks: {
                suggestedMax: Maximumvalue * MaximumvalueRate,
                suggestedMin: 0,
                stepSize: Math.round(((Maximumvalue * MaximumvalueRate) / stepSize) / digits) * digits,
                callback: function (value, index, values) {
                  let digits = 0;
                  if (displayUnitVal === '2') {
                    digits = 4;
                  }
                  return getCommaSeparatedValue(value, digits);
                },
                fontColor: '#333',
                fontSize: 14,
                padding: 20
              },
              gridLines: {
                drawBorder: false
              }
            }
          ]
        }
      },
      plugins: [{
        beforeInit: function (chart) {
          let wordbox = "";
          chart.data.labels.forEach(function (e, i, a) {
            e.split('').forEach(function (p, v) {
              if ((v % multiple) == 0 && v != 0) {
                wordbox += "\n";
              }
              wordbox += p;
            });
            if (/\n/.test(wordbox)) {
              a[i] = wordbox.split(/\n/)
            }
            wordbox = "";
          })
        }
      }]
    }); 

};


  const resize = ()=>{
 
    let timeoutID = 0;
    let delay = 0;
 
    window.addEventListener("resize", ()=>{
        clearTimeout(timeoutID);
        timeoutID = setTimeout(()=>{
          createChart();
        }, delay);
    }, false);
};
 
createChart();

resize();

  return myChart;
};
