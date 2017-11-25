# A+ Forms

> I love making forms. Forms are fantastic usage of my time
>
>  -- <cite>Nobody ever</cite>

Sick of overly complex form libraries in React? The ones that promise simplicity,
but you end up bashing your head against the wall in couple of weeks? Well, allow
me introduce you to the `A+ forms`, a react forms library that you would use again.

Because there are better things to life than making forms work.

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

Nothing beats the good old declarative style, eh?

## Features? Yeah, we have 'em.

* Simple, standard looking, and stable API
* A robust and predictable layouts and styling system
* Custom inputs support, yup with nested fields
* Custom validation (including async validation)
* Easy integration with the server side (including server side validation)
* Built for 100% testability in the apps
* Small weight, no deps

## Documentation? Youbetcha!

* [Installation & Configuration](/MadRabbit/a-plus-forms/wiki/Installation-&-Configuration)
* [Layouts & Styling](/MadRabbit/a-plus-forms/wiki/Layouts-&-Styling)
* [React & Redux Wiring](/MadRabbit/a-plus-forms/wiki/React-&-Redux-Wiring)
* [Communicating With Backends](/MadRabbit/a-plus-forms/wiki/Handling-Backend-Requests)
* [Validation & Errors Handling](/MadRabbit/a-plus-forms/wiki/Validation-&-Errors-Handling)
* [Custom Inputs Guide](/MadRabbit/a-plus-forms/wiki/Custom-Inputs-Guide)


## Copyright & License

All source code in this repository released under the terms of the ISC license.

Copyright (C) 2017 Nikolay Nemshilov
