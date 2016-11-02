import Ember from 'ember';

export function formatDate(params) {
  const today = new Date();
  const datetime = params[0];
  return moment(datetime).format('MM.DD.YYYY');
}

export default Ember.Helper.helper(formatDate);
