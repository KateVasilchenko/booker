import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login', {});
  this.route('register', {});
  this.route('logout', {});
  this.route('incomes', {}, function() {
    this.route('new', {});
    this.route('edit', { path: '/edit/:id' });
  });
  this.route('wallets', function() {
    this.route('edit', { path: '/edit/:id' });
    this.route('new', {});
  });
  this.route('categories', function() {
    this.route('edit', { path: '/edit/:id' });
    this.route('new', {});
  });
  this.route('currencies', {}, function() {
    this.route('new', {});
    this.route('edit', { path: '/edit/:id' });
  });
  this.route('outcomes', {}, function() {
    this.route('new', {});
    this.route('edit', { path: '/edit/:id' });
  });
});

export default Router;
