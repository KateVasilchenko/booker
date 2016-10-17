import Ember from 'ember';

export default Ember.Component.extend({
  content: null, //pass array of objects
  actions: {
    deleteEntity: function (contentDeleted) {
      this.sendAction("deleteEntity", contentDeleted); //pass content
    },
    loadMore: function () {
      console.log('To be done.');
      //TODO: send action to table-grid
    }
  }
});
