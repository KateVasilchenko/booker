import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  classNameBindings: [':add-transaction', 'isHidden::open'],

  wallets: null, //pass
  categories: null, //pass
  model: null, //pass

  afterSave() {
    console.log('Saved');
    this.set('isHidden', true);
    Ember.get(this, 'flashMessages').success('Transaction has been successfully added!');
  },

  actions: {
    selectCategory(category) {
      this.get('model').set('category', category);
    },
    selectWallet(wallet) {
      this.get('model').set('wallet', wallet);
    },
    save: function () {
      let model = this.get("model");
      console.log(model);
      model.validate().then(() => {
        console.log(model.get('errors'));
        console.log(model.get('isValid'));
        if(model.get('isValid')) {
          model.save().then(this.afterSave(model));
        }
      }).catch(function () {
        console.log(model.get('isValid'));
        console.log(model.get('errors'));
        Ember.get(this, 'flashMessages').danger('Fill out the required fields!');
      });
    }
  }
});
