import Ember from 'ember';

export function formatDate(params/*, hash*/) {
  return moment().format('LL');
}

export default Ember.Helper.helper(formatDate);
