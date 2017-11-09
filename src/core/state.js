/* @flow */
/* eslint no-use-before-define: off */

type Element = {
  forceUpdate: Function,
  context: Object,
  props: Object,
  name: ?string,
  value: ?any
};

export default class StateManager {
  element: Element;
  currentValue: any;

  constructor(element: Element) {
    this.element = element;
  }

  // actual set value that allows to swtich off onChange data propagation
  setValue(value: any, propagate: boolean = true) {
    const { name, onChange } = this.element.props;
    const { APFState: parent } = this.element.context;

    if (parent !== undefined && name !== undefined) {
      const parentValue = parent.getValue() || {};
      if (parentValue[name] !== value) {
        const newValue = Object.freeze({ ...parentValue, [name]: value });
        if (propagate) onChange(newValue);
        parent.setValue(newValue, propagate);
      }
    } else if (this.currentValue !== value) {
      this.currentValue = value;
      if (propagate) onChange(value);
      this.element.forceUpdate(); // re-render with the new value
    }
  }

  getValue(): any {
    const { name } = this.element.props;
    const { APFState: parent } = this.element.context;

    if (parent !== undefined && name !== undefined) {
      const parentValue = parent.getValue() || {};
      return parentValue[name];
    }

    return this.currentValue;
  }

  register(field: Element) {
    const { name } = field.props;
    const currentValue: Object = this.getValue() || {};

    if (!(name in currentValue)) {
      this.setValue({ ...currentValue, [name]: undefined }, false);
    }
  }

  unregister(field: Element) {
    const { name } = field.props;

    if (name !== undefined) {
      const newValue = { ...this.getValue() };
      delete newValue[name];
      this.setValue(Object.freeze(newValue));
    }
  }
}
