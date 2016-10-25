import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createdAtSelected(value) {
      this.send('createdAtChanged', value);
    },
    selectCategory(category) {
      console.log('SELECT CATEGORY');
      this.get('model').set('category', category);

    },
    selectWallet(wallet) {
      console.log('SELECT WALLET');
      this.get('model').set('wallet', wallet);
    }
  }
});
