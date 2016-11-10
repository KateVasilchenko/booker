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
    filterByTime(value, periodChosen) {
      if (value !== this.get('filterIsTime')) {
        this.set('filterIsTime', null);
      }

      if (this.get('filterIsTime') === null || value === this.get('filterIsTime')) {
        let periodName;
        const now = new Date();

        switch (value) {
          case 'week':
            let from, to;

            if (!periodChosen) {
              if (!this.get('weekChosen')) {
                periodChosen = moment(now).week() - 1;
                this.set('weekChosen', periodChosen);
              } else {
                periodChosen = this.get('weekChosen');
              }
            }

            from = moment(now);
            from.week(periodChosen);
            to = moment(now);
            to.week(periodChosen + 1);

            this.set(
              'periodName',
              from.format('DD.MM.YY') + ' - ' + to.format('DD.MM.YY')
            );
            break;
          case 'month':
            this.set('periodName', moment(now).format('MMMM'));
            if (periodChosen === undefined) {
              if (this.get('monthChosen') === null) {
                periodChosen = moment(now).month();
                this.set('monthChosen', periodChosen);
              } else {
                periodChosen = this.get('monthChosen');
              }
            }
            break;
          case 'year':
            this.set('periodName', moment(now).format('YYYY'));
            if (periodChosen === undefined) {
              if (this.get('yearChosen') === null) {
                periodChosen = moment(now).year();
                this.set('yearChosen', periodChosen);
              } else {
                periodChosen = this.get('yearChosen');
              }
            }
            break;
          default: break;
        }
        if (value === this.get('filterIsTime')) {
          this.set('filterIsTime', null);
          this.set('periodName', null);
        } else {
          this.set('filterIsTime', value);
        }
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
      let periodChosen, date;

      if (this.get('yearChosen') !== null) {
        periodChosen = 'yearChosen';
      } else if (this.get('monthChosen') !== null) {
        periodChosen = 'monthChosen';
      } else if (this.get('weekChosen') !== null) {
        periodChosen = 'weekChosen';
      }

      if (direction === 'left') {
        this.set(periodChosen, this.get(periodChosen) - 1);
      } else if (direction === 'right') {
        this.set(periodChosen, this.get(periodChosen) + 1);
      }

      const now = new Date();
      switch (periodChosen.replace('Chosen', '')) {
        case 'week':
          let from, to;
          from = moment(now);
          from.week(this.get(periodChosen));
          to = moment(now);
          to.week(this.get(periodChosen) + 1);
          this.set(
            'periodName',
            from.format('DD.MM.YY') + ' - ' + to.format('DD.MM.YY')
          );
          break;
        case 'month':
          date = moment(now);
          date.month(this.get(periodChosen));
          this.set('periodName', date.format('MMMM'));
          break;
        case 'year':
          date = moment(now);
          date.year(this.get(periodChosen));
          this.set('periodName', date.format('YYYY'));
          break;
        default: break;
      }

      this.send('filterTransactions', this.get(periodChosen) ? this.get(periodChosen) : null);
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
