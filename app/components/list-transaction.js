import Ember from 'ember';

export default Ember.Component.extend({
  transactionsFilter: Ember.inject.service(),

  transactionsRaw: null, //pass
  filterCategoryId: null,
  filterIsNegative: null,
  filterIsTime: null,
  periodName: null,
  monthChosen: null,
  yearChosen: null,
  weekChosen: null,

  transactions: Ember.computed('transactionsRaw.[]', function () {
    return this.get('transactionsRaw');
  }),

  filterObserver: Ember.observer('filter', 'transactions.[]', function () {
    switch(this.get('filter')) {
      case 'expenses':
        this.set('transactions', this.get('transactions').filterBy('isNegative', true));
        break;
      case 'income':
        this.set('transactions', this.get('transactions').filterBy('isNegative', false));
        break;
      case 'all':
      default: break;
    }
  }),

  actions: {
    filterByCategory(value) {
      this.get('filterCategoryId') === null ?
        this.set('filterCategoryId', value) : this.set('filterCategoryId', null);

      this.send('filterTransactions');
    },
    filterByTime(value) {
      let periodChosen;

      if (value !== this.get('filterIsTime')) {
        this.set('filterIsTime', null);
      }

      if (this.get('filterIsTime') === null) {
        let periodName;
        const now = new Date();

        switch (value) {
          case 'week':
            this.set(
              'periodName',
              moment(now - 7).format('DD.MM.YY') + ' - ' + moment(now).format('DD.MM.YY')
            );
            if (this.get('weekChosen') === null) {
              periodChosen = moment(now - 7).week();
              this.set('weekChosen', periodChosen);
            } else {
              periodChosen = this.get('weekChosen');
            }
            break;
          case 'month':
            this.set('periodName', moment(now).format('MMMM'));
            if (this.get('monthChosen') === null) {
              periodChosen = moment(now).month();
              this.set('monthChosen', periodChosen);
            } else {
              periodChosen = this.get('monthChosen');
            }
            break;
          case 'year':
            this.set('periodName', moment(now).format('YYYY'));
            if (this.get('yearChosen') === null) {
              periodChosen = moment(now).year();
              this.set('yearChosen', periodChosen);
            } else {
              periodChosen = this.get('yearChosen');
            }
            break;
          default: break;
        }
        this.set('filterIsTime', value);
      } else {
        this.set('filterIsTime', null);
        this.set('periodName', null);
        this.set('weekChosen', null);
        this.set('monthChosen', null);
        this.set('yearChosen', null);
      }
      this._setActive(value, {
        week: Ember.$('#week'),
        month: Ember.$('#month'),
        year: Ember.$('#year')
      });
      this.send('filterTransactions', periodChosen ? periodChosen : null);
    },
    filterByIsNegative(value) {
      this.get('filterIsNegative') === null ?
        this.set('filterIsNegative', value) : this.set('filterIsNegative', null);
      this._setActive(value, {
        all: Ember.$('#all'),
        income: Ember.$('#income'),
        expenses: Ember.$('#expenses')
      });
      this.send('filterTransactions');
    },
    changePeriod(direction) {
      let periodChosen;
      if (this.get('yearChosen') !== null) {
        periodChosen = this.get('yearChosen');
      } else if (this.get('monthChosen') !== null) {
        periodChosen = this.get('monthChosen');

      } else if (this.get('weekChosen') !== null) {
        periodChosen = this.get('weekChosen');

      }

      if (direction === 'left') {
        periodChosen--;
      } else if (direction === 'right') {
        periodChosen++;
      }

      this.send('filterTransactions', periodChosen);
    },
    filterTransactions(periodChosen) {
      this.set('transactions', this.get('transactionsFilter').filterTransactions(
        this.get('transactionsRaw'),
        {
          filterCategoryId: this.get('filterCategoryId'),
          filterIsNegative: this.get('filterIsNegative'),
          filterIsTime: this.get('filterIsTime'),
          periodChosen: periodChosen
        }
      ));
      this.notifyPropertyChange('transactions');
    }
  },
  _setActive(activeElementKey, allElements) {
    for (var key in allElements) {
      if (allElements.hasOwnProperty(key)) {
        if (key === activeElementKey) {
          if (Ember.$(allElements[activeElementKey]).hasClass('active')) {
            Ember.$(allElements[activeElementKey]).removeClass('active');
          } else {
            Ember.$(allElements[activeElementKey]).addClass('active');
          }
        } else {
          Ember.$(allElements[key]).removeClass('active');
        }
      }
    }
  }
});
