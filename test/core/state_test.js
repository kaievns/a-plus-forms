import React from 'react';
import { mount } from 'enzyme';
import { StateProvider, TextInput, PasswordInput } from '../../src';

describe('<StateProvider />', () => {
  it.skip('allows to access the fields values', () => {
    const render = mount(
      <StateProvider>
        <div>
          <TextInput name="username" value="nikolay" />
          <PasswordInput name="password" value="Ba(k0n!" />
        </div>
      </StateProvider>
    );

    expect(render.nodes[0].value).to.eql({
      username: 'nikolay',
      password: 'Ba(k0n!'
    });
  });
});
