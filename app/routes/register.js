import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    register: function (nickName, email, password, repeatedPassword) {
      if (nickName && email && password && repeatedPassword) {
        if (password === repeatedPassword) {
          return alert("Password repeated correctly.");
        } else {
            return alert("Wrong password!");
        }
      }
      return alert("All fields are blank.");
    }
  }
});
