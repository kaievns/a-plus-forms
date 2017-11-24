# Usage Basics

A+ forms designed for a low friction development experience, and as such
the basic usage examples are straight forward. Simply think of the A+ forms
components as regular HTML elements slightly alternated for the modern use
cases:

```js
import { Form, TextInput, PasswordInput } from 'a-plus-forms';

const signInHandler = ({ username, password }) => {
  // handle the form data
};

<Form onSubmit={signInHandler}>
  <EmailInput name="username" label="Username" />
  <PasswordInput name="password" label="Password" />
  <button type="submit">Sign In</button>
</Form>
```

The core principle is that you need to give the form inputs `name` properties.
Once the form submitted, the `onSubmit` function will receive the data from
the form, where you free to handle it in an appropriate way.

## Fields & Rendering

The second most important part to understand about A+ forms is input fields
are HTML5 looking decorators that render actual inputs internally based on the
`name` and `label` properties. The actual result of the render of the form above
will look somewhat like this:

```html
<form>
  <div>
    <label>Username</label>
    <input type="text" name="username" />
  </div>
  <div>
    <label>Password</label>
    <input type="password" name="password" />
  </div>
  <button type="submit">Sign In</button>
</form>
```

Please refer to the [Layouts & Styling](./layouts) documentation page for more
details about how layouts work.

## Disabling/Enabling Form

More often than not, you might want to send the form data to some sort of back
end. And, usually, for the duration of the request you might want to block
the form from further changes. With A+ forms this could be done automatically
if you return a `Promise` from the `onSubmit` handler:

```js
import { Form, TextInput, PasswordInput } from 'a-plus-forms';

const signInHandler = ({ username, password }) => {
  return fetch('/signin', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
};

<Form onSubmit={signInHandler}>
....
```

The `Form` component will automatically recognize a `Promise` and block the
underlying `<form />` tag until the promise is either resolved or rejected.
Form more details on the subject, please refer to the
[Communicating With Backends](./requests) documentation
