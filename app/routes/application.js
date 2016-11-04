import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function(){
    this.render();
    var myjquery = function(){
      Ember.$('nav').parent().addClass('main');
    };
    Ember.run.scheduleOnce('afterRender', myjquery);
  },
  model() {
    return Ember.RSVP.hash({
      wallet: this.store.findAll('wallet'),
      currency: this.store.findAll('currency'),
      category: this.store.findAll('category'),
      transaction: this.store.findAll('transaction')
    });
  },
  setupController(controller, model) {
    this._super(controller, model);
    let wallets = this.store.peekAll('wallet');
    wallets.forEach(wallet => {
      wallet.set('currency', this.store.peekAll('currency').get('firstObject'));
    });
    let transactions = this.store.peekAll('transaction');
    transactions.forEach((transaction, index) => {
      let wallet = index % 2 === 0 ? wallets.get('firstObject') : wallets.get('lastObject');
      let category = this.store.peekRecord('category', index + 1);
      transaction.set('wallet', wallet);
      transaction.set('category', category);
      category.set('transactions', [transaction]);
      wallet.get('transactions').pushObject(transaction);
    });
  },
  actions: {
    toggleSidebar() {
      Ember.$("#wrapper").toggleClass("toggled");
      Ember.$(".navbar-default").toggleClass('navbar-closed');
    }
  },
  init() {
    Ember.$(window).resize(function() {
      let wrapper = Ember.$('#wrapper');
      let navbar = Ember.$('.navbar-default');
      if (window.innerWidth < 767 &&
        !Ember.$(wrapper).hasClass('toggled') &&
        !Ember.$(navbar).hasClass('navbar-closed')) {
        Ember.$(wrapper).addClass('toggled');
        Ember.$(navbar).addClass('navbar-closed')
      } else if (window.innerWidth >= 767 &&
        Ember.$(wrapper).hasClass('toggled') &&
        Ember.$(navbar).hasClass('navbar-closed')) {
        Ember.$(wrapper).removeClass("toggled");
        Ember.$(navbar).removeClass('navbar-closed')
      }
    });
  }
});
