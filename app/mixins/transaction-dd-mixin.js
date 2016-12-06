import Ember from 'ember';

export default Ember.Mixin.create({
  wallets: null, //pass
  categories: null, //pass

  actions: {
    selectCategory(category) {
      this.get('model').set('category', category);
    },
    selectWallet(wallet) {
      this.get('model').set('wallet', wallet);
    }
  }
});
