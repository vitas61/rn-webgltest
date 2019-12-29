import { HumanStore } from "../core/store/human.store";
import { Human } from '../index';
test('My Greeter', () => {
  expect(new Human({})).toBeInstanceOf(Human);
});
