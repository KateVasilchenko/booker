export default function() {
  this.namespace = 'api';
  this.timing = 500;

  this.get('/wallets');
  this.get('/currencies');
  this.get('/categories');
  this.get('/transactions');
  this.get('/transactions/:id', (schema, request) => {
    var id = request.params.id;

    return schema.transactions.find(id);
  });
  this.get('/categories/:id', (schema, request) => {
    var id = request.params.id;

    return schema.categories.find(id);
  });
  this.get('/currencies/:id', (schema, request) => {
    var id = request.params.id;

    return schema.currencies.find(id);
  });
  this.get('/wallets/:id', (schema, request) => {
    var id = request.params.id;

    return schema.wallets.find(id);
  });

  this.post('/transactions', (schema, request) => {
    const attrs = JSON.parse(request.requestBody).transaction;

    attrs.walletId = attrs.wallet;
    attrs.categoryId = attrs.category;

    delete attrs.wallet;
    delete attrs.category;

    return schema.transactions.create(attrs);
  });

  this.del('/transactions/:id', (schema, request) => {
    let transaction = schema.transactions.find(request.params.id);
    transaction.destroy();
  });
}

export function testConfig() {
  this.namespace = 'api';    // make this `api`, for example, if your API is namespaced
  this.timing = 0;      // delay for each request, automatically set to 0 during testing
  this.get('/wallets');
  this.get('/currencies');
  this.get('/categories');
  this.get('/transactions');
  this.get('/transactions/:id', (schema, request) => {
    var id = request.params.id;

    return schema.transactions.find(id);
  });
  this.get('/categories/:id', (schema, request) => {
    var id = request.params.id;

    return schema.categories.find(id);
  });
  this.get('/currencies/:id', (schema, request) => {
    var id = request.params.id;

    return schema.currencies.find(id);
  });
  this.get('/wallets/:id', (schema, request) => {
    var id = request.params.id;

    return schema.wallets.find(id);
  });
}