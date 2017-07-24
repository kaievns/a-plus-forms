import React from 'react';
import { mount } from 'enzyme';
import { field, TextInput, PasswordInput } from '../../src';

describe('state provider', () => {
  let input;
  before(() => {
    input = mount(<TextInput />).nodes[0];
  });

  describe('scalar value inputs', () => {
    it('does not have any value out of the box', () => {
      expect(input.value).to.equal(undefined);
    });

    it('allows to set the input value', () => {
      input.value = 'new value';
      expect(input.value).to.eql('new value');
    });
  });

  describe('nested values', () => {
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
    let input;
    let render;

    before(() => {
      render = mount(<CompoundInput />);
      input = render.nodes[0];
    });

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
