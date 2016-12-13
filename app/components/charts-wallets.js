import Ember from 'ember';

export default Ember.Component.extend({
  chartCategories: null, // pass
  chartIncomeData: null, // pass
  chartOutcomeData: null, // pass

  tagName: '',

  chartOptions: {
    chart: {
      // width: 550,
      height: 200,
      type: 'column'
    },
    title: {
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
      shared: false,
      formatter: function() {
        return this.series.name === 'back' ? false : this.y.toString();
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

    let incomeChart = this.get('charts.income');
    let totalIncome = 0;
    this.get('chartIncomeData').forEach(function (income) {
      totalIncome += income;
    });
    incomeChart.chartOptions.title.text = 'Income ' + totalIncome.toString() + ' USD';
    incomeChart.chartOptions.title.style.color = '#63A9A9';
    incomeChart.chartOptions.tooltip.backgroundColor = '#63A9A9';
    incomeChart.chartTheme.plotOptions.series.color = '#63A9A9';
    incomeChart.chartOptions.xAxis.categories = this.get('chartCategories');
    incomeChart.chartData[1].data = this.get('chartIncomeData');
    incomeChart.chartData[0].data = this.get('chartMonthIncomeData');

    let outcomeChart = this.get('charts.outcome');
    let totalOutcome = 0;
    this.get('chartOutcomeData').forEach(function (outcome) {
      totalOutcome += outcome;
    });
    outcomeChart.chartOptions.title.text = 'Expenses ' + totalOutcome.toString() + ' USD';
    outcomeChart.chartOptions.title.style.color = '#ae84c6';
    outcomeChart.chartOptions.tooltip.backgroundColor = '#ae84c6';
    outcomeChart.chartTheme.plotOptions.series.color = '#ae84c6';
    outcomeChart.chartOptions.xAxis.categories = this.get('chartCategories');
    outcomeChart.chartData[1].data = this.get('chartOutcomeData');
    outcomeChart.chartData[0].data = this.get('chartMonthOutcomeData');
  }
});
