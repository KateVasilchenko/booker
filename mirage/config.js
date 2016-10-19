export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'api';    // make this `api`, for example, if your API is namespaced
  this.timing = 0;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */
  this.get('/wallets', (schema, request) => {
    return schema.wallets.all();
  });
  this.get('/currencies', (schema, request) => {
    return schema.currencies.all();
  });
  this.get('/categories', (schema, request) => {
    return schema.categories.all();
  });
  this.get('/transactions', (schema, request) => {
    return schema.transactions.all();
  });
}
