import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      transactions: this.store.findAll('transaction')
    });
  },
  setupController(controller, model) {
    this._super(controller, model);
    model.transactions.forEach((transaction, index) => {
      let wallet = this.store.peekRecord('wallet', index + 1);
      let category = this.store.peekRecord('category', index + 1);
      transaction.set('wallet', wallet);
      transaction.set('category', category);
      category.set('transactions', [transaction]);
      wallet.set('transactions', [transaction]);
    });
    let balance = null;
    let wallets = this.store.peekAll('wallet');
    for (let i = 0; i < wallets.get('length'); i++) {
      balance = balance === null ?
        parseFloat(wallets.objectAt(i).get('balance')) :
      balance + parseFloat(wallets.objectAt(i).get('balance'));
    }
    controller.set('wallets', wallets);
    controller.set('balance', balance.toFixed(2));
    controller.set('transactions', model.transactions);

    let categoriesEntities = this.store.peekAll('category');

    let chartsCategories = [];
    let incomesChartsDataset = {
      label: "Income",
      backgroundColor: "rgba(179,181,198,0.2)",
      borderColor: "rgba(179,181,198,1)",
      pointBackgroundColor: "rgba(179,181,198,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(179,181,198,1)",
      data: []
    };
    let outcomesChartsDataset = {
      label: "Outcome",
      backgroundColor: "rgba(179,181,198,0.2)",
      borderColor: "rgba(179,181,198,1)",
      pointBackgroundColor: "rgba(179,181,198,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(179,181,198,1)",
      data: []
    };
    let lineChartsDataset = {
      label: "Balance",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [],
      spanGaps: false,
    };

    let chartsLabels = [];
    this.store.peekAll('transaction').sortBy('createdAt').forEach(function (transaction) {
      const month = transaction.get('createdAt').getMonth();
      let monthName;
      switch (month) {
        case 0:
          monthName = 'January';
          break;
        case 1:
          monthName = 'February';
          break;
        case 2:
          monthName = 'March';
          break;
        case 3:
          monthName = 'April';
          break;
        case 4:
          monthName = 'May';
          break;
        case 5:
          monthName = 'June';
          break;
        case 6:
          monthName = 'July';
          break;
        case 7:
          monthName = 'August';
          break;
        case 8:
          monthName = 'September';
          break;
        case 9:
          monthName = 'October';
          break;
        case 10:
          monthName = 'November';
          break;
        case 11:
          monthName = 'December';
          break;
      }
      if (chartsLabels.indexOf(monthName) === -1) {
        chartsLabels.push(monthName);
      }
      let balance = 0;
      if (!transaction.get('isNegative')) {
          balance += parseFloat(transaction.get('amount'));
      } else {
          balance -= parseFloat(transaction.get('amount'));
      }
      lineChartsDataset.data.push(balance);
    });

    categoriesEntities.forEach(function (category) {
      chartsCategories.push(category.get('name'));
      let incomeBalance = null;
      let outcomeBalance = null;
      category.get('transactions').forEach(function (transaction) {

      });
      incomesChartsDataset.data.push(incomeBalance);
      outcomesChartsDataset.data.push(outcomeBalance);
    });

    controller.set('chartOptions', {responsive: false});

    controller.set('incomeChartData', {
      labels: chartsCategories,
      datasets: [incomesChartsDataset]
    });
    controller.set('outcomeChartData', {
      labels: chartsCategories,
      datasets: [outcomesChartsDataset]
    });
    controller.set('balanceChartData', {
      labels: chartsLabels,
      datasets: [lineChartsDataset]
    })
  }
});
