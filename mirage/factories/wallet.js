import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  walletId(i) {
    return i + 1;
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
