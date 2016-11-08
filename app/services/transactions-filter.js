import Ember from 'ember';

export default Ember.Service.extend({
  filterByCategoryId(transactions, categoryId) {
    return transactions.filter(transaction => {
      return transaction.get('category.id') === categoryId;
    });
  },
  filterByIsNegative(transactionsList, value) {
    let transactions;
    switch (value) {
      case 'expenses':
        transactions = transactionsList.filterBy('isNegative', true);
        break;
      case 'income':
        transactions = transactionsList.filterBy('isNegative', false);
        break;
      case 'all':
      default:
        transactions = transactionsList;
    }
    return transactions;
  },
  filterByTime(transactions, value) {
    let filter;
    const today = new Date();
    switch (value) {
      case 'week':
        filter = function (transaction) {
          return moment(transaction.get('createdAt')).week() === moment(today).week();
        };
        break;
      case 'month':
        filter = function (transaction) {
          return moment(transaction.get('createdAt')).month() === moment(today).month();
        };
        break;
      case 'year':
        filter = function (transaction) {
          return moment(transaction.get('createdAt')).year() === moment(today).year();
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
    if (filterOptions['filterCategoryId'] !== null) {
      transactions = this.filterByCategoryId(
        transactions,
        filterOptions['filterCategoryId']
      );
    }
    if (filterOptions['filterIsNegative'] !== null) {
      transactions = this.filterByIsNegative(
        transactions,
        filterOptions['filterIsNegative']
      );
    }
    if (filterOptions['filterIsTime'] !== null) {
      transactions = this.filterByTime(
        transactions,
        filterOptions['filterIsTime']
      );
    }

    return transactions;
  }
});
