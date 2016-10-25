import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  walletId(i) {
    return i;
  },
  categoryId(i) {
    return i;
  },
  name(i) {
    return `Category ${i}`;
  },
  description() {
    return faker.commerce.productName();
  },
  amount() {
    return faker.commerce.price();
  },
  isNegative() {
    return false;
  },
  createdAt() {
    return faker.date.past();
  },
  updatedAt() {
    return faker.date.recent();
  },
});
