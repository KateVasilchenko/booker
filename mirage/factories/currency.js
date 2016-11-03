import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  name() {
    return `USD`;
  },
  sign() {
    return '$';
  },
  createdAt() {
    return faker.date.past();
  },
  updatedAt() {
    return faker.date.recent();
  },
});
