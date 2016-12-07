import Ember from 'ember';
import WalletDDMixin from '../mixins/wallet-dd-mixin';
import TransactionDDMixin from '../mixins/transaction-dd-mixin';


export default Ember.Component.extend(WalletDDMixin, TransactionDDMixin, {
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  tagName: '',
  model: null,
  modelName: 'transaction',
  isHidden: true, // pass
  form: null, // pass
  transaction: null, // pass
  wallet: null, // pass

  afterSave() {
    console.log('Saved');
    this.set(this.get('model.constructor.modelName'), null);
    this.set('isHidden', true);
    this.set('disabledButtons', false);
    Ember.get(this, 'flashMessages')
      .success(this.get('model.constructor.modelName').capitalize() + ' has been successfully added!');
    const owner = Ember.getOwner(this);
    const currentRoute = owner.lookup('router:main').currentRouteName;
    if (currentRoute === 'dashboard') {
      console.log('SENDING ACTION');
      this.sendAction('updateDashboard');
    }
  },

  actions: {
    save() {
      let model = this.get("model");
      model.validate().then(() => {
        if(model.get('validations.isValid')) {
          model.save().then(this.afterSave(model));
        } else {
          Ember.get(this, 'flashMessages').danger('Fill out the required fields!');
        }
        this.sendAction('resetDropdownModel', this.get('modelName'));
      });
    },
    close() {
      this.set('isHidden', true);
      this.set('disabledButtons', false);
      if (this.get('model') && this.get('model.isNew')) {
        this.get('model').destroyRecord();
      }
      this.sendAction('resetDropdownModel', this.get('modelName'));
    }
  },

  modelObserver: Ember.on('init', Ember.observer(
    'transaction.isNew', 'transaction.isDeleted',
    'wallet.isNew', 'wallet.isDeleted', function () {
    if (this.get('transaction') && (!this.get('wallet') || this.get('wallet.isDeleted'))) {
      this.set('model', this.get('transaction'));
    } else if (this.get('wallet.isNew') && (!this.get('transaction') || this.get('transaction.isDeleted'))) {
      this.set('model', this.get('wallet'));
    }
    if (this.get('model')) {
      this.set('modelName', this.get('model.constructor.modelName'));
    }
  }))
});
