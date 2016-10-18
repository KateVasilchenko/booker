import Ember from 'ember';
import Table from 'ember-light-table';

const { computed } = Ember;

export default Ember.Component.extend({
  page: 1,
  limit: 20,
  dir: 'asc',
  sort: null,
  model: null,
  isLoading: false,
  canLoadMore: true,
  columns: null,
  tableActions: null,
  modelName: null,
  table: computed('model', function() {
    return new Table(this.get('columns'), this.get('model'), { enableSync: true });
  }),
  row: computed,
  actions: {
    edit(entity) {
      this.sendAction('editEntity', entity);
    },
    delete(entity) {
      this.sendAction('deleteEntity', entity);
    }
  }
});