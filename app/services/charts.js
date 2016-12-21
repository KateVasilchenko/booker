import Ember from 'ember';

export default Ember.Service.extend({
  radarDefaultDataset: {
    label: null,
    backgroundColor: null,
    borderColor: null,
    pointBackgroundColor: null,
    pointBorderColor: null,
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: "rgba(179,181,198,1)",
    pointBorderWidth: 4,
    borderWidth: 1,
    data: [] //pass
  },
  prepareData(entities) {
    let incomeDataset = Ember.copy(this.get('radarDefaultDataset'), true);
    incomeDataset.label = 'Income';
    let outcomeDataset = Ember.copy(this.get('radarDefaultDataset'), true);
    outcomeDataset.label = 'Outcome';
    let categoriesNames = [];

    let totalIncome = 0;
    let totalOutcome = 0;

    entities.categories.forEach(function (category) {
      if (category.get('transactions.length')) {
        categoriesNames.push(category.get('name'));
        let incomeBalance = 0;
        let outcomeBalance = 0;
        entities.transactions.filter((trans) => {
          return trans.get('category.id') === category.get('id');
        }).forEach(function (transaction) {
          if (transaction.get('isIncome')) {
            incomeBalance += parseFloat(transaction.get('amount'));
            totalIncome += parseFloat(transaction.get('amount'));
          } else {
            outcomeBalance += parseFloat(transaction.get('amount'));
            totalOutcome += parseFloat(transaction.get('amount'));
          }
        });
        incomeDataset.data.push(incomeBalance);
        incomeDataset.backgroundColor = 'rgba(99, 168, 168, 0.61)';
        incomeDataset.pointBackgroundColor = '#63A8A8';
        incomeDataset.pointBorderColor = 'rgba(99, 168, 168, 0.61)';
        incomeDataset.borderColor = '#63A8A8';
        outcomeDataset.data.push(outcomeBalance);
        outcomeDataset.backgroundColor = 'rgba(200, 116, 200, 0.48)';
        outcomeDataset.pointBackgroundColor = '#ca70c5';
        outcomeDataset.pointBorderColor = 'rgba(200, 116, 200, 0.48)';
        outcomeDataset.borderColor = '#ca70c5';
      }
    });

    let options = {
      legend: {
        display: false
      },
      title: {
        display: true,
        position: 'top',
        fontColor: '',
        fontStyle: 'normal',
        fontSize: 20,
        text: ''
      },
      responsive: false
    };

    let optionsIncome = Ember.copy(options, true);
    optionsIncome.title.fontColor = '#63A9A9';
    optionsIncome.title.text = 'Income ' + totalIncome.toFixed(2).toString() + ' USD';


    let optionsOutcome = Ember.copy(options, true);
    optionsOutcome.title.fontColor = '#ae84c6';
    optionsOutcome.title.text = 'Expenses ' + totalOutcome.toFixed(2).toString() + ' USD';

    return {
      optionsIncome: optionsIncome,
      optionsOutcome: optionsOutcome,
      incomeData: {
        labels: categoriesNames,
        datasets: [incomeDataset]
      } ,
      outcomeData: {
        labels: categoriesNames,
        datasets: [outcomeDataset]
      }
    }
  }
});
