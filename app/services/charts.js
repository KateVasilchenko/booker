import Ember from 'ember';

export default Ember.Service.extend({
  radarDefaultDataset: {
    backgroundColor: [],
    hoverBackgroundColor: [],
    data: []
  },
  lineDefaultDataset: {
    fill: true,
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: [],
    spanGaps: false
  },
  prepareData(entities) {
    let incomeDataset = Ember.copy(this.get('radarDefaultDataset'), true);
    incomeDataset.label = 'Income';
    let outcomeDataset = Ember.copy(this.get('radarDefaultDataset'), true);
    outcomeDataset.label = 'Outcome';
    let lineDataset = this.get('lineDefaultDataset');
    lineDataset.label = 'Balance';
    let categoriesNames = [];
    let monthsNames = [];
    entities.transactions.sortBy('createdAt').forEach(function (transaction) {
      const monthName = moment(transaction.get('createdAt')).format('MMMM');
      if (monthsNames.indexOf(monthName) === -1) {
        monthsNames.push(monthName);
      }
      let balance = 0;
      if (!transaction.get('isNegative')) {
        balance += parseFloat(transaction.get('amount'));
      } else {
        balance -= parseFloat(transaction.get('amount'));
      }
      lineDataset.data.push(balance);
    });

    entities.categories.forEach(function (category) {
      if (category.get('transactions.length')) {
        categoriesNames.push(category.get('name'));
        let incomeBalance = 0;
        let outcomeBalance = 0;
        category.get('transactions').forEach(function (transaction) {
          if (transaction.get('isNegative')) {
            outcomeBalance += parseFloat(transaction.get('amount'));
          } else {
            incomeBalance += parseFloat(transaction.get('amount'));
          }
        });
        incomeDataset.data.push(incomeBalance);
        incomeDataset.backgroundColor.push(category.get('color'));
        incomeDataset.hoverBackgroundColor.push(category.get('color'));
        outcomeDataset.data.push(outcomeBalance);
        outcomeDataset.backgroundColor.push(category.get('color'));
        outcomeDataset.hoverBackgroundColor.push(category.get('color'));
      }
    });

    return {
      options: { responsive: false },
      incomeData: {
        labels: categoriesNames,
        datasets: [incomeDataset]
      } ,
      outcomeData: {
        labels: categoriesNames,
        datasets: [outcomeDataset]
      },
      balanceData: {
        labels: monthsNames,
        datasets: [lineDataset]
      }
    }
  }
});
