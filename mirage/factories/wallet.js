import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) {
    return faker.finance.accountName();
  },
  createdAt() {
    return faker.date.past();
  },
  updatedAt() {
    return faker.date.recent();
  }
});
