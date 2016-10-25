import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createdAtSelected(value) {
      this.send('createdAtChanged', value);
    },
    selectCategory(category) {
      this.get('model').set('category', category);
    },
    selectWallet(wallet) {
      this.get('model').set('wallet', wallet);
    }
  }
});
