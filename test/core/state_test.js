import React from 'react';
import { mount } from 'enzyme';
import { field, TextInput, PasswordInput } from '../../src';

describe.only('state provider', () => {
  describe('regular value inputs', () => {
    const [input] = mount(<TextInput />).nodes;

    it('does not have any value out of the box', () => {
      expect(input.value).to.equal(undefined);
    });

    it('allows to set the input value', () => {
      input.value = 'new value';
      expect(input.value).to.eql('new value');
    });
  });

  describe('compount value inputs', () => {
    @field()
    class CompoundInput extends React.Component {
      render() {
        return (
          <div>
            <TextInput name="username" />
            <PasswordInput name="password" />
          </div>
        );
      }
    }

    const render = mount(<CompoundInput />);
    const [input] = render.nodes;

    it('has empty values by default', () => {
      expect(input.value).to.eql({
        username: undefined,
        password: undefined
      });
    });

    it('picks up changes in the sub-fields', () => {
      render.find('input[name="username"]').simulate('change', {
        target: { value: 'nikolay' }
      });

      expect(input.value).to.eql({
        username: 'nikolay',
        password: undefined
      });

      render.find('input[name="password"]').simulate('change', {
        target: { value: 'Ba(k0n!' }
      });

      expect(input.value).to.eql({
        username: 'nikolay',
        password: 'Ba(k0n!'
      });
    });
  });
});
