import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    editEntity(entity) {
      this.send('edit', entity);
    },
    deleteEntity(entity) {
      this.send('delete', entity);
    }
  }
});
