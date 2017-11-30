/* @flow */
/* eslint no-use-before-define: off */
import type { Element } from '../types';

type Field = Element & {
  state: Object,
  context: Object,
  isUnmounted: boolean
};

export default class StateManager {
  element: Field;

  constructor(element: Field) {
    this.element = element;
  }

  // actual set value that allows to swtich off onChange data propagation
  setValue(value: any, propagate: boolean = true) {
    if (this.element.isUnmounted) return;

    const { name, onChange } = this.element.props;
    const { APFState: parent } = this.element.context;
    const { value: currentValue } = this.element.state;

    if (parent !== undefined && name !== undefined) {
      const parentValue = parent.getValue() || {};
      if (parentValue[name] !== value) {
        if (propagate) onChange(value);
        const newValue = Object.freeze({ ...parentValue, [name]: value });
        parent.setValue(newValue, propagate);
      }
    } else if (parent !== undefined && parent.isArray) {
      const index = parent.getIndexFor(this.element);
      const parentValue = parent.getValue() || [];

      if (parentValue[index] !== value) {
        if (propagate) onChange(value);

        parent.setValue(
          Object.freeze([...parentValue.slice(0, index), value, ...parentValue.slice(index + 1)])
        );
      }
    } else if (currentValue !== value) {
      this.element.setState({ value: Object.freeze(value) });
      this.element.state.value = value; // forcing the value change for tests
      if (propagate) onChange(value);
    }
  }

  getValue(): any {
    const { name } = this.element.props;
    const { APFState: parent } = this.element.context;
    const { value: currentValue } = this.element.state;

    if (parent !== undefined && name !== undefined) {
      const parentValue = parent.getValue() || {};
      return parentValue[name];
    } else if (parent !== undefined && parent.isArray) {
      const index = parent.getIndexFor(this.element);
      const value = parent.getValue() || [];
      return value[index];
    }

    return currentValue;
  }

  listFields: Array<Field> = [];
  register(field: Field) {
    const { name } = field.props;
    const currentValue: Object = this.getValue() || {};

    if (name !== undefined && !(name in currentValue)) {
      this.setValue({ ...currentValue, [name]: undefined }, false);
    } else if (this.isArray && !this.listFields.includes(field)) {
      this.listFields.push(field);
    }
  }

  unregister(field: Field) {
    const { name } = field.props;

    if (name !== undefined) {
      const newValue = { ...this.getValue() };
      delete newValue[name];
      this.setValue(Object.freeze(newValue));
    } else if (this.isArray) {
      const index = this.getIndexFor(field);
      if (index > -1) this.listFields.splice(index, 1);
    }
  }

  // private

  getIndexFor(field: Field) {
    return this.listFields.indexOf(field);
  }

  get isArray(): boolean {
    const { constructor: { fieldOptions: options } } = this.element;

    return options.array === true;
  }
}
