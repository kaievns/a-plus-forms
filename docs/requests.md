# Handling Backend Requests

In most of the cases, it's not the job of A+ forms to manage any data handling.
The A+ forms role is to collect the form data and hand it over the application.
But, there are some repeating use cases where a certain degree form level smarts
helps to avoid unnecessary boilerplate code.

## Blocking Forms

If you're sending data to some sort of a backend, chances are it will be an
asynchronous process that takes non-zero time. While this process is in action,
it's considered a good practice to block the form from further changes for
the duration of the request.

This is such a frequent request that A+ forms has a built in feature to do it
automatically. All you have to do is to return a `Promise` from your data
handler:

```js
const submitHandler = (data) => {
  return fetch('/endpoint', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

<Form onSubmit={submitHandler}>
 ...
```

In this case the `Form#onSubmit` handler will automatically recognize the
`Promise` instance, and add the `disabled` attribute to the underlying `<form />`
HTML element.

```html
<form disabled="">
  .....
```

In this situation you're free to use the `form[disabled]` CSS selector to lock
the form with CSS rules, for example:

```css
form[disabled] input,
form[disabled] button {
  pointer-events: none;
  opacity: 0.6;
}
```

## Server Side Validation Errors

A+ forms have an extensive feature set to handle the frontend side validation.
But, this does not mean you shouldn't have the backend side validation for the
incoming data. A+ forms allows one to seamlessly integrate both in one flow:

Consider a `Sign Up` form that checks if a username is already taken on the
server side:

```js
import { Router } from 'express';

export default new Router()
  .post('/signup', async (req, res) => {
    const { username } = req.body;
    const count = await User.count({ username });

    if (count > 0) {
      return res.status(422).send({
        error: {
          username: 'is already taken'
        }
      });
    }

    // happy path...
  });
```

Now this server side validation can be re-integrated into the fronted in the
following way:

```js
import axios from 'axios';
import { Error as ValidationError } from 'a-plus-forms';

const frontEndValidator = ({ username }) => {
  if (!username) {
    return { username: 'is required' };
  }
};

const signUpHandler = async ({ username, password }) => {
  try {
    await axios.post('/signup', { username, password });
  } catch (error) {
    const { request: { status, data } } = error;

    if (status === 422 && data.error) {
      throw new ValidationError(data.error);
    }
  }
};

<Form onSubmit={signUpHandler} schema={frontEndValidator}>
  ....
```

In this situation the frontend validator will ensure that the `username` field
filled in. But, when the server-side rejects a non-unique username, the A+
forms instance will automatically recognize the `ValidationError` and render
the payload in the form the same way as a local validation would:

```html
<form>
  <div>
    <label>Username</label>
    <input type="text" name="username" />
    <small>is required</small>
  </div>
....
```

Given the repeating nature of this use case it's advised to build the server
side validation errors handling into the same communication code that one
uses for handling authentication and such.
