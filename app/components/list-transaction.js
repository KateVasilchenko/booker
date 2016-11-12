import Ember from 'ember';

export default Ember.Component.extend({
  transactionsFilter: Ember.inject.service(),

  transactionsRaw: null, //pass
  filterCategoryId: null,
  filterIsNegative: 'all',
  filterIsTime: 'month',
  periodName: null,
  monthChosen: null,
  yearChosen: null,
  weekChosen: null,

  weekChosenObserver: Ember.on('init', Ember.observer('filterIsTime', 'weekChosen', function () {
    if (this.get('filterIsTime') === 'week') {
      let from, to, now, periodChosen;
      now = new Date();

      periodChosen = this.get('weekChosen');

      if (!periodChosen) {
        periodChosen = moment(now).week() - 1;
        this.set('weekChosen', periodChosen);
      }

      from = moment(now);
      from.week(periodChosen);
      to = moment(now);
      to.week(periodChosen + 1);

      this.set(
        'periodName',
        from.format('DD.MM.YY') + ' - ' + to.format('DD.MM.YY')
      );
    }
  })),

  monthChosenObserver: Ember.on('init', Ember.observer('filterIsTime', 'monthChosen', function () {
    if (this.get('filterIsTime') === 'month') {
      const now = new Date();
      let periodChosen = this.get('monthChosen') ? this.get('monthChosen') : moment(now).month();
      let period = moment(new Date());
      period.month(periodChosen);

      this.set('periodName', period.format('MMMM'));
    }
  })),

  yearChosenObserver: Ember.on('init', Ember.observer('filterIsTime', 'yearChosen', function () {
    if (this.get('filterIsTime') === 'year') {
      const now = new Date();
      let periodChosen = this.get('yearChosen') ? this.get('yearChosen') : moment(now).year();
      let period = moment(new Date());
      period.year(periodChosen);

      this.set('periodName', period.format('YYYY'));
    }
  })),

  periodChosen: Ember.computed('weekChosen', 'monthChosen', 'yearChosen', function () {
    if (!this.get('weekChosen') && !this.get('monthChosen') && !this.get('yearChosen')) {
      const now = new Date();
      switch (this.get('filterIsTime')) {
        case 'week':
          this.set('weekChosen', moment(now).week() - 1);
          break;
        case 'month':
          this.set('monthChosen', moment(now).month());
          break;
        case 'year':
          this.set('yearChosen', moment(now).year());
          break;
        default: break;
      }
    }

    return this.get('yearChosen') || this.get('monthChosen') || this.get('weekChosen');
  }),

  filterActive: Ember.observer('filterIsNegative', function () {
      this._setActive(this.get('filterIsTime'), {
        week: Ember.$('#week'),
        month: Ember.$('#month'),
        year: Ember.$('#year')
      });
      this._setActive(this.get('filterIsNegative'), {
        all: Ember.$('#all'),
        income: Ember.$('#income'),
        expenses: Ember.$('#expenses')
      });
  }),

  transactions: Ember.computed('transactionsRaw.[]', function () {
    return this.get('transactionsRaw');
  }),

  actions: {
    filterByCategory(value) {
      this.get('filterCategoryId') === null ?
        this.set('filterCategoryId', value) : this.set('filterCategoryId', null);

      this.send('filterTransactions');
    },
    filterByTime(value) {
      if (value !== this.get('filterIsTime')) {
        this.set('filterIsTime', null);
        if (this.get('filterIsTime') === null || value === this.get('filterIsTime')) {
          if (value === this.get('filterIsTime')) {
            this.set('filterIsTime', null);
            this.set('periodName', null);
          } else {
            this.set('filterIsTime', value);
          }
        } else {
          this.set('filterIsTime', 'month');
          this.set('periodName', null);
          this.set('weekChosen', null);
          this.set('monthChosen', null);
          this.set('yearChosen', null);
        }
      }
      this.send('filterTransactions', this.get('periodChosen'));
    },
    filterByIsNegative(value) {
      this.set('filterIsNegative', value);
      this.send('filterTransactions');
    },
    changePeriod(direction) {
      let periodChosen;

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
      this.notifyPropertyChange(periodChosen);

      this.send('filterTransactions', this.get(periodChosen));
    },
    filterTransactions(periodChosen) {
      periodChosen = periodChosen ? periodChosen : this.get('periodChosen');

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
          if (!Ember.$(allElements[activeElementKey]).hasClass('active')) {
            Ember.$(allElements[activeElementKey]).addClass('active');
          }
        } else {
          Ember.$(allElements[key]).removeClass('active');
        }
      }
    }
  },
  didRender() {
    this.filterActive();
    this._super(...arguments);
  },
  init() {
    this._super(...arguments);
    this.send('filterTransactions');
  }
});
