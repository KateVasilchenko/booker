import Ember from 'ember';

export function formatDate(params) {
  const today = new Date();
  const datetime = params[0];
  return datetime.toDateString() === today.toDateString() ?
    moment(datetime).format('LT') : moment(datetime).format('lll');
}

export default Ember.Helper.helper(formatDate);
