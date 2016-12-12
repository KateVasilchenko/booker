import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function(){
    this.render();
    var addMainClass = function(){
      Ember.$('nav').parent().addClass('main');
    };
    Ember.run.scheduleOnce('afterRender', addMainClass);
  },
  model() {
    return Ember.RSVP.hash({
      wallets: this.store.findAll('wallet'),
      currency: this.store.findAll('currency'),
      categories: this.store.findAll('category'),
      transaction: this.store.findAll('transaction')
    });
  },
  setupController(controller, model) {
    controller.set('hidden', true);
    this._super(...arguments);
  },
  actions: {
    resetDropdownModel(modelName) {
      this.get('controller').set(modelName, null);
    },
    transitionToDashboard() {
      this.transitionTo('dashboard');
    },
    toggleSidebar() {
      Ember.$('#wrapper').toggleClass('toggled');
      Ember.$('.navbar-default').toggleClass('navbar-closed');
    },
    addTransaction() {
      let controller = this.get('controller');

      if (!controller.get('disabledButtons')) {
        controller.set('disabledButtons', true);
        controller.setProperties({
          'transaction': this.store.createRecord('transaction'),
          'categories': this.store.peekAll('category'),
          'wallets': this.store.peekAll('wallet')
        });
        controller.set('hidden', false);
      }
    },
    addWallet() {
      let controller = this.get('controller');

      if (!controller.get('disabledButtons')) {
        controller.set('disabledButtons', true);
        controller.set('wallet', this.store.createRecord('wallet'));
        controller.set('hidden', false);
      }
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
