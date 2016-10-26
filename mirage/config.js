export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'api';    // make this `api`, for example, if your API is namespaced
  this.timing = 500;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */
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

export function testConfig() {
  this.namespace = 'api';    // make this `api`, for example, if your API is namespaced
  this.timing = 0;      // delay for each request, automatically set to 0 during testing
  this.get('/wallets');
  this.get('/currencies');
  this.get('/categories');
  this.get('/transactions');
}