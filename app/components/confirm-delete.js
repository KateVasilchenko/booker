import Ember from 'ember';


export default Ember.Component.extend({
  model: null, //pass
  modelType: Ember.computed('model', function() {
    return this.get('model.constructor.modelName');
  }),
  hidden: true, //pass
  actions: {
    close: function () {
      return this.sendAction('close');
    },
    delete: function () {
      return this.sendAction('delete', this.get('model'));
    }
  }
});
