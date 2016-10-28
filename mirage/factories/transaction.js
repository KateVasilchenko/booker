import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
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
    return faker.random.boolean();
  },
  createdAt() {
    return faker.date.past();
  },
  updatedAt() {
    return faker.date.recent();
  },
});
