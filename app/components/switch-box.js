import Ember from 'ember';

export default Ember.Component.extend({
  model: null, // pass
  firstValueText: null, // pass
  secondValueText: null, // pass
  checkedProperty: null, // pass

  clickAction() {
    Ember.$('div.switch').on('click', event => {
      if ($(event.target).text() === this.get('firstValueText')) {
        this.get('model').set(this.get('checkedProperty'), false);
      } else if ($(event.target).text() === this.get('secondValueText')) {
        this.get('model').set(this.get('checkedProperty'), true);
      }
    });
  },

  init() {
    this._super(...arguments);
    Ember.run.scheduleOnce('afterRender', this, this.clickAction);
  }
});
