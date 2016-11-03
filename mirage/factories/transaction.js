import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
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
