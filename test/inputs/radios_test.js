import React from 'react';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import { Radios } from '../../src';

describe('<Radios />', () => {
  const options = [
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' }
  ];

  it('renders correctly', () => {
    const render = mount(<Radios layout={null} options={options} />);
    expect(render.html()).to.eql(
      '<div>' +
        '<label><input type="radio" value="one"><span>One</span></label>' +
        '<label><input type="radio" value="two"><span>Two</span></label>' +
      '</div>'
    );
  });

  it('doesnt explode without options', () => {
    const render = mount(<Radios layout={null} />);
    expect(render.html()).to.eql('<div></div>');
  });

  it('shows correct selected value', () => {
    const render = mount(<Radios layout={null} options={options} value="one" />);
    expect(render.find('input[type="radio"]').at(0).props()).to.include({ checked: true });
  });

  it('tracks change events', () => {
    const onChange = spy();
    const render = mount(<Radios options={options} onChange={onChange} />);
    render.find('input[type="radio"]').at(0).simulate('change');

    expect(onChange).to.have.been.calledWith('one');
  });
});
