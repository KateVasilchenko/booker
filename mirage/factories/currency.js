import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) {
    return `Currency ${i}`;
  },
  sign(i) {
    return faker.finance.currencySymbol();
  },
  createdAt() {
    return faker.date.past();
  },
  updatedAt() {
    return faker.date.recent();
  },
});
