import Ember from 'ember';

export default Ember.Service.extend({
  filterByCategoryId(transactions, categoryId) {
    return transactions.filter(transaction => {
      return transaction.get('category.id') === categoryId;
    });
  },
  filterByIsIncome(transactionsList, value) {
    let transactions;

    switch (value) {
      case 'expenses':
        transactions = transactionsList.filterBy('isIncome', false);
        break;
      case 'income':
        transactions = transactionsList.filterBy('isIncome', true);
        break;
      case 'all':
      default:
        transactions = transactionsList;
    }
    return transactions;
  },
  filterByTime(transactions, value, periodChosen) {
    let filter;
    const now = new Date();
    switch (value) {
      case 'week':
        periodChosen = !periodChosen ? moment(now).week() : periodChosen;
        filter = function (transaction) {
          return moment(transaction.get('createdAt')).week() === periodChosen;
        };
        break;
      case 'month':
        periodChosen = !periodChosen ? moment(now).month() : periodChosen;
        filter = function (transaction) {
          return moment(transaction.get('createdAt')).month() === periodChosen;
        };
        break;
      case 'year':
        periodChosen = !periodChosen ? moment(now).year() : periodChosen;
        filter = function (transaction) {
          return moment(transaction.get('createdAt')).year() === periodChosen;
        };
        break;
      default:
        filter = function () {
          return true;
        };
    }

    return transactions.filter(filter);
  },
  filterTransactions(transactions, filterOptions) {
    if (filterOptions['filterCategoryId']) {
      transactions = this.filterByCategoryId(
        transactions,
        filterOptions['filterCategoryId']
      );
    }
    if (filterOptions['filterIsIncome']) {
      transactions = this.filterByIsIncome(
        transactions,
        filterOptions['filterIsIncome']
      );
    }
    if (filterOptions['filterIsTime'] !== null) {
      transactions = this.filterByTime(
        transactions,
        filterOptions['filterIsTime'],
        filterOptions['periodChosen']
      );
    }

    return transactions;
  }
});
