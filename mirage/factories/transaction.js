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
  createdAt(i) {
    if (i % 2 === 0) {
      return faker.date.recent();
    } else {
      return faker.date.past();
    }
  },
  updatedAt() {
    return faker.date.recent();
  },
});
