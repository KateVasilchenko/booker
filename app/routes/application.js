import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function(){
    this.render();
    var myjquery = function(){
      console.log(Ember.$('nav'));
      Ember.$('nav').parent().addClass('main');
    };
    Ember.run.scheduleOnce('afterRender', myjquery);
  },
  model() {
    return Ember.RSVP.hash({
      wallet: this.store.findAll('wallet'),
      category: this.store.findAll('category'),
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
