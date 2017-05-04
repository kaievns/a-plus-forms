import Validator from '../../src/validator';

describe('Validator', () => {
  const schema = {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' }
    },
    required: ['email', 'password']
  };

  const validator = new Validator(schema);

  describe('#validate(data)', () => {
    it('returns undefined if there is no errors', () => {
      const goodData = { email: 'nikolay@rocks.com', password: 'Ba(k0n!' };
      expect(validator.errorsFor(goodData)).to.equal(null);
    });

    it('returns some errors if the data is borked', () => {
      const badData = { email: 'blah!' };
      expect(validator.errorsFor(badData)).to.eql({
        email: 'should match format "email"',
        password: `should have required property 'password'`
      });
    });

    it('allows to extend the validator with a custom validation function', () => {
      const validator = new Validator(schema);
      validator.update({ validate: data => data.email !== 'nikolay@rocks.com' && { email: 'must be nikolay' } });

      const goodData = { email: 'nikolay@rocks.com', password: 'Ba(k0n!' };
      expect(validator.errorsFor(goodData)).to.equal(null);

      const badData = { email: 'drew@rocks.com', password: 'Ba(k0n!' };
      expect(validator.errorsFor(badData)).to.eql({ email: 'must be nikolay' });
    });
  });
});
