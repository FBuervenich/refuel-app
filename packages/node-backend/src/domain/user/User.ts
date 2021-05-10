import { attributes } from 'structure';

const User = attributes({
  id: Number,
  name: {
    type: String,
    required: true,
  },
  age: Number,
})(
  class User {
    age: number;
    isLegal() {
      return this.age >= MIN_LEGAL_AGE;
    }
  }
);

const MIN_LEGAL_AGE = 21;

export default User;
