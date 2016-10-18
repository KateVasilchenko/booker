import Ember from 'ember';
import PresenceValidator from 'ember-validations/validators/local/presence';

export default PresenceValidator.extend({
  call: function() {
    if (Ember.isEmpty(this.model.get(this.property + '.content'))) {
      this.errors.pushObject(this.options.message);
    }
  }
});