import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'booker/tests/helpers/start-app';

module('Acceptance | transactions/edit', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

const TRANSACTIONS_MOCK = '{"transactions":[{"id":1,"description":"Groceries","createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","amount":100.95,"isNegative":false,"links":{"category":"/api/categories/1","wallet":"/api/wallets/1"}},{"id":2,"description":"Gasoline","createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","amount":120.3,"isNegative":false,"links":{"category":"/api/categories/6","wallet":"/api/wallets/2"}},{"id":3,"description":"Beer","createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","amount":5,"isNegative":false,"links":{"category":"/api/categories/2","wallet":"/api/wallets/1"}},{"id":4,"description":"Witcher 3","createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","amount":35.35,"isNegative":false,"links":{"category":"/api/categories/2","wallet":"/api/wallets/2"}},{"id":5,"description":"Son\'s birthday gift","createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","amount":80.99,"isNegative":false,"links":{"category":"/api/categories/8","wallet":"/api/wallets/1"}},{"id":6,"description":"Bananas","amount":5.66,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/1","wallet":"/api/wallets/2"}},{"id":7,"description":"Rice","amount":3.44,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/1","wallet":"/api/wallets/1"}},{"id":8,"description":"Landlord","amount":1500,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/7","wallet":"/api/wallets/2"}},{"id":9,"description":"Basketball tickets","amount":300.5,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/3","wallet":"/api/wallets/1"}},{"id":10,"description":"Food","amount":20.46,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/1","wallet":"/api/wallets/2"}},{"id":11,"description":"Gas and tires","amount":500.33,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/6","wallet":"/api/wallets/1"}},{"id":12,"description":"Gasoline","amount":120.66,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/6","wallet":"/api/wallets/2"}},{"id":13,"description":"Coca-cola","amount":3.33,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/2","wallet":"/api/wallets/1"}},{"id":14,"description":"Counter Strike: Global Offensive","createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","amount":20,"isNegative":false,"links":{"category":"/api/categories/8","wallet":"/api/wallets/2"}},{"id":15,"description":"Son\'s new sneakers","amount":100.22,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/8","wallet":"/api/wallets/1"}},{"id":16,"description":"Potatoes","amount":10.56,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/1","wallet":"/api/wallets/2"}},{"id":17,"description":"Rice","amount":5.55,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/1","wallet":"/api/wallets/1"}},{"id":18,"description":"Landlord","amount":1500,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/7","wallet":"/api/wallets/2"}},{"id":19,"description":"Taxes","amount":2231.95,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/7","wallet":"/api/wallets/1"}},{"id":20,"description":"Parking tickets","amount":40.5,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/3","wallet":"/api/wallets/2"}},{"id":21,"description":"Groceries","amount":60.56,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/1","wallet":"/api/wallets/1"}},{"id":22,"description":"Gasoline","amount":110.57,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/6","wallet":"/api/wallets/2"}},{"id":23,"description":"Beer","amount":10.98,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/2","wallet":"/api/wallets/1"}},{"id":24,"description":"Clothes","amount":100.99,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/11","wallet":"/api/wallets/2"}},{"id":25,"description":"Wife\'s anniversary","createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","amount":300.31,"isNegative":false,"links":{"category":"/api/categories/9","wallet":"/api/wallets/1"}},{"id":26,"description":"Bananas","amount":10.41,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/1","wallet":"/api/wallets/2"}},{"id":27,"description":"Rice","amount":10.69,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/1","wallet":"/api/wallets/1"}},{"id":28,"description":"Landlord","amount":1500,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/7","wallet":"/api/wallets/2"}},{"id":29,"description":"Beer","amount":10.5,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/2","wallet":"/api/wallets/1"}},{"id":30,"description":"Clothes","amount":200.5,"createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","isNegative":false,"links":{"category":"/api/categories/8","wallet":"/api/wallets/2"}}]}';
const TRANSACTION_MOCK = '{"transactions":[{"id":1,"description":"Groceries","createdAt":"2016-10-18T08:34:51.498Z","updatedAt":"2016-10-18T08:34:51.498Z","amount":100.95,"isNegative":false,"links":{"category":"/api/categories/1","wallet":"/api/wallets/1"}]}';

test('visiting /transactions/edit/:id', function(assert) {
  Ember.$.mockjax({
    url: '/api/transactions',
    type: 'GET',
    status: 200,
    responseText: TRANSACTIONS_MOCK,
    responseTime: 0
  });

  Ember.$.mockjax({
    url: '/api/transactions/1',
    type: 'GET',
    status: 200,
    responseText: TRANSACTION_MOCK,
    responseTime: 0
  });

  visit('/transactions/edit/1');

  andThen(function() {
    assert.equal(currentURL(), '/transactions/edit/1');
  });
});
