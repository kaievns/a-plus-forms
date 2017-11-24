# React & Redux Wiring

If you're using [React](http://reactjs.com), chances are you're using
[redux](http://redux.com) as a state management library. A+ forms built for
modern libraries, and the `redux` wiring is as standard and simple as it gets:

```js
import { connect } from 'react-redux';
import { Form, TextInput, PasswordInput } from 'a-plus-forms';
import { signIn } from './actions';

const dispatchToProps = dispatch => ({
  signIn({ username, password }) {
    return dispatch(signIn({ username, password }));
  }
});

const SignInForm = ({ signIn }) =>
  <Form onSubmit={signIn}>
    <TextInput name="username" label="Username" />
    <PasswordInput name="password" label="Password" />
    <button>Sign In</button>
  </Form>;

export default connect(null, dispatchToProps)(SignInForm);
```

__NOTE__ if the `dispatch(signIn(...))` call will return a `Promise` the
`<Form` component will automatically disable itself for the duration of the
server-side request. Please refer to the [Communicating With Backends](./requests)
documentation page for more details
