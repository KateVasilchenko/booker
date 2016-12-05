import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  description() {
    return faker.commerce.productName();
  },
  amount() {
    return faker.commerce.price();
  },
  isIncome() {
    return faker.random.boolean();
  },
  createdAt() {
    return faker.date.past();
  },
  updatedAt() {
    return faker.date.recent();
  },
});
