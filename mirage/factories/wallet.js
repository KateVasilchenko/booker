import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  currencyId(i) {
    return i;
  },
  name(i) {
    return `Wallet ${i}`;
  },
  createdAt() {
    return faker.date.past();
  },
  updatedAt() {
    return faker.date.recent();
  }
});
