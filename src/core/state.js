/* @flow */
/* eslint no-use-before-define: off */
import type { Valuable, Element, FieldOptions } from '../types';

export default class StateManager {
  strategy: NestedStateStrategy | ReactStateStrategy;

  constructor(component: Element, { nested }: FieldOptions) {
    this.strategy = new (nested ? NestedStateStrategy : ReactStateStrategy)(component);
  }

  get value(): any {
    return this.strategy.value;
  }
  set value(value: any) {
    this.strategy.value = value;
  }

  register(field: Valuable) {
    if (this.strategy instanceof NestedStateStrategy) {
      this.strategy.register(field);
    }
  }

  unregister(field: Valuable) {
    if (this.strategy instanceof NestedStateStrategy) {
      this.strategy.unregister(field);
    }
  }
}

// a generic input field state strategy
class ReactStateStrategy {
  state: Object;
  component: Object;

  constructor(component: Object) {
    this.component = component;
    this.component.state = { value: undefined };
  }

  get value(): any {
    return this.component.state.value;
  }

  set value(value: any) {
    this.component.setState({ value });
  }
}

// a compount input state strategy
// NOTE: a nested field can receive initial values _before_ sub-fields
//       start to register. which, will create a un-sync situation
//       to solve the problem, nested field strategy saves any incoming values
//       in the `seedValues` property and then pipes them into fields as they
//       register
class NestedStateStrategy {
  fields: Array<Valuable> = [];
  seedValues: Object = {};
  component: Object;

  constructor(component: Object) {
    this.component = component;
  }

  register(field: Valuable) {
    this.fields.push(field);
    this.component.forceUpdate(); // re-render in case of errors were re-picked up

    if (field.name && field.name in this.seedValues) {
      field.value = this.seedValues[field.name];
      delete this.seedValues[field.name];
    }
  }

  unregister(field: Valuable) {
    this.fields.splice(this.fields.indexOf(field), 1);
  }

  get value(): Object {
    return this.fields.reduce(
      (data, field) => Object.assign(data, field.name ? { [field.name]: field.value } : {}),
      {}
    );
  }

  set value(data: any) {
    if (this.fields.length === 0) {
      this.seedValues = { ...data }; // stashing the initial value
    }

    Object.keys(data || {}).forEach(name => {
      const field = this.fields.find(field => field.name === name);
      if (field) field.value = data[name];
    });
  }
}
