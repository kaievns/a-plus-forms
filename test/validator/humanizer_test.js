import Ajv from 'ajv';
import humanize from '../../src/validator/humanizer';

describe('Ajv errors humanizer', () => {
  const schema = {
    properties: {
      name: { type: 'string', maxLength: 8 },
      info: {
        type: 'object',
        properties: {
          age: { type: 'integer', maximum: 100 },
          name: {
            type: 'object',
            properties: {
              first: { type: 'string' },
              last: { type: 'string' }
            },
            required: ['first', 'last']
          }
        },
        required: ['age']
      },
      email: { type: 'string', format: 'email' }
    },
    required: ['name']
  };

  const badData = { name: 'Super Nikolay', info: { age: 666, name: { last: false } }, email: 'blah!' };

  it('converst the errors alright', () => {
    const validator = new Ajv({ allErrors: true }).compile(schema);
    validator(badData);
    expect(humanize(validator.errors)).to.eql({
      name: 'must be less than 8 characters long',
      email: 'must be a valid email',
      'info.age': 'must be less than or equal to 100',
      'info.name.first': 'is required',
      'info.name.last': 'must be a string'
    });
  });
});
