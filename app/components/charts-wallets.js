import Ember from 'ember';
// import Highcharts from 'ember-highcharts'; TODO: check if it works without it.

export default Ember.Component.extend({
  chartCategories: null, // pass
  chartIncomeData: null, // pass
  chartOutcomeData: null, // pass

  tagName: '',

  mobileChartOptions: {
    chart: {
      height: 200,
      type: 'line'
    },
    title: {
      align: 'left',
      x: 24,
      style: {
        color: '' // pass
      },
      text: '', // pass
    },
    tooltip: {
      backgroundColor: '', // pass
      style: {
        color: 'white'
      },
      headerFormat: '',
      useHTML: true,
      shared: false,
      formatter: function() {
        return '<span style="font-size: 10px; text-align: center">' +
          this.point.name +
          '</span></br><b style="font-size: 16px; text-align: center;">' +
          this.y.toString() +
          '</b>';
      }
    },
    xAxis: {
      categories: [], // pass
      tickLength: 0,
      // labels: {
      //   enabled: false
      // }
    },
    yAxis: [{
      endOnTick: false,
      gridLineWidth: 0,
      lineWidth: 1,
      title: {
        text: ''
      },
      labels: {
        enabled: false
      }
    }],
  },
  mobileChartData: [{
    data: []
  }],
  mobileChartTheme: {
    legend: false,
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        },
        marker: {
          radius: 2
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      },
      series: {
        borderRadius: 5,
        pointWidth: 8,
        color: '', // pass
      }
    }
  },

  chartOptions: {
    chart: {
      height: 200,
      type: 'column'
    },
    title: {
      align: 'left',
      x: 24,
      style: {
        color: '' // pass
      },
      text: '', // pass
    },
    tooltip: {
      backgroundColor: '', // pass
      style: {
        color: 'white'
      },
      headerFormat: '',
      useHTML: true,
      shared: false,
      formatter: function() {
        return this.series.name === 'back' ?
          false :
          '<span style="font-size: 10px; text-align: center">' +
            this.point.name +
          '</span></br><b style="font-size: 16px; text-align: center;">' +
            this.y.toString() +
          '</b>';
      }
    },
    xAxis: {
      categories: [], // pass
      tickLength: 0,
      labels: {
        enabled: false
      }
    },
    yAxis: [{
      endOnTick: false,
      gridLineWidth: 0,
      lineWidth: 1,
      title: {
        text: ''
      },
      labels: {
        enabled: false
      }
    }, {
      endOnTick: false,
      gridLineWidth: 0,
      title: {
        text: 'USD'
      },
      labels: {
        enabled: false
      }
    }],
  },

  chartData: [{
    name: 'back',
    color: 'rgba(0, 0, 0, 0.20)',
    data: []
   }, {
    name: 'front',
    data: [] // pass
  }],

  chartTheme: {
    legend: false,
    plotOptions: {
      column: {
        grouping: false,
        shadow: false,
        borderWidth: 0
      },
      series: {
        borderRadius: 5,
        pointWidth: 8,
        color: '', // pass
      }
    }
  },

  charts: {
    income: null,
    outcome: null
  },

  mobileCharts: {
    income: null,
    outcome: null
  },

  mobileView: false,

  init() {
    this._super(...arguments);
    this.set('charts', {
      income: {
        chartOptions: Ember.copy(this.get('chartOptions'), true),
        chartData: Ember.copy(this.get('chartData'), true),
        chartTheme: Ember.copy(this.get('chartTheme'), true)
      },
      outcome: {
        chartOptions: Ember.copy(this.get('chartOptions'), true),
        chartData: Ember.copy(this.get('chartData'), true),
        chartTheme: Ember.copy(this.get('chartTheme'), true)
      }
    });

    this.set('mobileCharts', {
      income: {
        chartOptions: Ember.copy(this.get('mobileChartOptions'), true),
        chartData: Ember.copy(this.get('mobileChartData'), true),
        chartTheme: Ember.copy(this.get('mobileChartTheme'), true)
      },
      outcome: {
        chartOptions: Ember.copy(this.get('mobileChartOptions'), true),
        chartData: Ember.copy(this.get('mobileChartData'), true),
        chartTheme: Ember.copy(this.get('mobileChartTheme'), true)
      }
    });

    let incomeChart = this.get('charts.income');
    let totalIncome = 0;
    this.get('chartIncomeData').forEach(function (income) {
      totalIncome += income[1];
    });
    incomeChart.chartOptions.title.text = 'Income ' + totalIncome.toFixed(2).toString() + ' USD';
    incomeChart.chartOptions.title.style.color = '#63A9A9';
    incomeChart.chartOptions.tooltip.backgroundColor = '#63A9A9';
    incomeChart.chartTheme.plotOptions.series.color = '#63A9A9';
    incomeChart.chartOptions.xAxis.categories = this.get('chartCategories');
    incomeChart.chartData[1].data = this.get('chartIncomeData');
    incomeChart.chartData[0].data = this.get('chartMonthIncomeData');

    let outcomeChart = this.get('charts.outcome');
    let totalOutcome = 0;
    this.get('chartOutcomeData').forEach(function (outcome) {
      totalOutcome += outcome[1];
    });
    outcomeChart.chartOptions.title.text = 'Expenses ' + totalOutcome.toFixed(2).toString() + ' USD';
    outcomeChart.chartOptions.title.style.color = '#ae84c6';
    outcomeChart.chartOptions.tooltip.backgroundColor = '#ae84c6';
    outcomeChart.chartTheme.plotOptions.series.color = '#ae84c6';
    outcomeChart.chartOptions.xAxis.categories = this.get('chartCategories');
    outcomeChart.chartData[1].data = this.get('chartOutcomeData');
    outcomeChart.chartData[0].data = this.get('chartMonthOutcomeData');

    let mobileIncomeChart = this.get('mobileCharts.income');
    mobileIncomeChart.chartOptions.title.text = 'Income ' + totalIncome.toFixed(2).toString() + ' USD';
    mobileIncomeChart.chartOptions.title.style.color = '#63A9A9';
    mobileIncomeChart.chartOptions.tooltip.backgroundColor = '#63A9A9';
    mobileIncomeChart.chartTheme.plotOptions.series.color = '#63A9A9';
    mobileIncomeChart.chartOptions.xAxis.categories = this.get('chartCategories');
    mobileIncomeChart.chartData[0].data = this.get('chartIncomeData');

    let mobileOutcomeChart = this.get('mobileCharts.outcome');
    mobileOutcomeChart.chartOptions.title.text = 'Expenses ' + totalOutcome.toFixed(2).toString() + ' USD';
    mobileOutcomeChart.chartOptions.title.style.color = '#ae84c6';
    mobileOutcomeChart.chartOptions.tooltip.backgroundColor = '#ae84c6';
    mobileOutcomeChart.chartTheme.plotOptions.series.color = '#ae84c6';
    mobileOutcomeChart.chartOptions.xAxis.categories = this.get('chartCategories');
    mobileOutcomeChart.chartData[0].data = this.get('chartOutcomeData');

    if (window.innerWidth < 767) {
      this.set('mobileView', true);
    } else if (window.innerWidth >= 767) {
      this.set('mobileView', false);
    }

    Ember.$(window).resize(() => {
      if (window.innerWidth < 767) {
        this.set('mobileView', true);
      } else if (window.innerWidth >= 767) {
        this.set('mobileView', false);
      }
    });
  }
});
