# A+ Forms

> I love making forms. Forms are fantastic usage of my time
>
>  -- <cite>Nobody ever</cite>

Sick of overly complex form libraries in React? The ones that promise simplicity,
but you end up bashing your head against the wall in couple of weeks? Well, allow
me introduce you to the `A+ forms`, a react forms library that you would use again.

## What's The Big Idea?

Remember how nice and easy forms were when HTML was static? You'd just have a
`form` tag, and a couple of `input` tags, and it would simply send your data
where it supposed to go. Well, `A+ forms` gives you exactly that type of
development experience back:

```js
import { Form, TextInput, PasswordInput } from 'a-plus-forms';

const signIn = ({ username, password }) => {
  axios.post('/signin', { username, password });
};

<Form onSubmit={signIn}>
  <TextInput name="username" label="Username" />
  <PasswordInput name="password" label="Password" />
  <button type="submit">Sign In</button>
</Form>
```

The goal of the `A+ forms` is to be as close to the original HTML forms API and
declarative coding style that everyone knows and loves. The idea is to give
developers the stability of well known interfaces paired with covering the needs
of the modern front end development practices.

## Features? Yeah, we have 'em.

* Simple, standard looking, and stable API (minimal learning curve)
* A robust and predictable layouts and styling system
* Custom inputs support, yup with nested fields
* Custom validation (including async validation)
* Easy integration with the server side (including server side validation)
* Built for 100% testability in the apps
* Small weight, no deps

## Documentation? Youbetcha!

* [Installation & Configuration](https://github.com/MadRabbit/a-plus-forms/wiki/Installation-&-Configuration)
* [Layouts & Styling](https://github.com/MadRabbit/a-plus-forms/wiki/Layouts-&-Styling)
* [React & Redux Wiring](https://github.com/MadRabbit/a-plus-forms/wiki/React-&-Redux-Wiring)
* [Communicating With Backends](https://github.com/MadRabbit/a-plus-forms/wiki/Handling-Backend-Requests)
* [Validation & Errors Handling](https://github.com/MadRabbit/a-plus-forms/wiki/Validation-&-Errors-Handling)
* [Custom Inputs Guide](https://github.com/MadRabbit/a-plus-forms/wiki/Custom-Inputs-Guide)
* [Compound / Nested Inputs Guide](https://github.com/MadRabbit/a-plus-forms/wiki/Compound-Inputs-Guide)
* [Testing Best Practices](https://github.com/MadRabbit/a-plus-forms/wiki/Testing-Best-Practices)

## Extensions? Totes!

* [Boostrap bindings](https://github.com/MadRabbit/a-plus-forms-bootstrap)
* [JSON schemas based validator](https://github.com/MadRabbit/a-plus-forms-json-validator)

Tell me more! [@nemshilov](https://twitter.com/nemshilov)


## Copyright & License

All source code in this repository released under the terms of the ISC license.

Copyright (C) 2017 Nikolay Nemshilov
