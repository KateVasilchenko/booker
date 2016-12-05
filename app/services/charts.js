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
          } else {
            outcomeBalance += parseFloat(transaction.get('amount'));
          }
        });
        incomeDataset.data.push(incomeBalance);
        incomeDataset.backgroundColor = 'rgba(59, 103, 208, 0.61)';
        incomeDataset.pointBackgroundColor = '#4e6cb3';
        incomeDataset.pointBorderColor = 'rgba(59, 103, 208, 0.61)';
        incomeDataset.borderColor = '#4e6cb3';
        outcomeDataset.data.push(outcomeBalance);
        outcomeDataset.backgroundColor = 'rgba(200, 116, 200, 0.48)';
        outcomeDataset.pointBackgroundColor = '#ca70c5';
        outcomeDataset.pointBorderColor = 'rgba(200, 116, 200, 0.48)';
        outcomeDataset.borderColor = '#ca70c5';
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
      }
    }
  }
});
