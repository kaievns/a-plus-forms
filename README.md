# A+ Forms

> I love making forms. Forms are fantastic usage of my time
>
>  -- <cite>Nobody ever</cite>

Let me introduce you to the `A+ forms`, a react forms library that makes forms
creation a civilized and enjoyable process.

## Features

There are two principles `A+ forms` are build on top:

1) _zero learning curve_, all interfaces are 100% familiar and act as expected
2) _just give me data_, all routine processes are taken care of, the forms just
   send the user's input as an object via the `onSubmit` prop.

If you want to more, here is more:

3) `~7.5k` in size and zero deps
4) used in production for ages and scales to complex forms nicely
5) easy custom layouts support
6) easy custom validators support
7) easy custom inputs support
8) easy compound inputs support
9) allows to re-wrap existing inputs into new specialized ones


## Usage & Examples

```
npm install a-plus-forms
yarn add a-plus-forms
```


### Input Field Layouts

Inputs in `A+ forms` are simply standard interfaces, to style them according
to your needs we use the concept of layouts. Which are basically dumb components
that consistently render all inputs in a form. For example:

```js
const MyLayout = ({ label, error, input }) =>
  <div className="my-input">
    <label>{label}</label>
    <div className="input-container">{input}</div>
    {error ? <small className="error">{error}</small> : null}
  </div>;
```

In this case, `label` is the label one specifies in the input props. `error` is
a validation error string, and `input` is the actual input field element.

Now that you have a layout, you have options:

```js
// set this layout as a default layout globally
import { config } from 'a-plus-forms';
config.DefaultLayout = MyLayout;

// specify the layout as a default via a layout provider
import { LayoutProvider } from 'a-plus-forms';
<App>
  <LayoutProvider layout={MyLayout}>
    // content....
  </LayoutProvider>
</App>

// render a specific form with this layout
<Form onSubmit={handler} layout={MyLayout}>
  // all inputs here will use that layout
</Form>

// render an individual input with this layout
<EmailInput name="username" layout={MyLayout} />
```

You also can render any input without any layout decoration whatsoever, which
is useful when you start making compound.

```js
<TextInput name="something" layout={null} />
// will render simply this
<input type="text" name="something" />
```


### Validation Story

`A+ forms` have several validation options. A very simple one is to just pass
a function into the `schema` prop:

```js
const validate = (data) => {
  if (!data.username) return { username: 'is required' };
};

const SignInForm = ({ signIn }) =>
  <Form onSubmit={signIn} schema={validate}>
    <EmailInput name="username" label="Username" />
    <PasswordInput name="password" label="Password" />
  </Form>;
```

Whenever the validation function returns data, the form will automatically
pass the errors into the respective fields. All the pristine/dirty states are
automatically taken care of.

One also can create custom re-usable validators and pass them around via a
`ValidatorProvider` component:

```js
import { ValidatorProvider } from 'a-plus-forms';

class CustomValidator {
  errorsFor(data) {
    if (!data.username) {
      return { username: 'is required' };
    }
  }
}

<ValidatorProvider validator={CustomValidator}>
  <SignInForm signIn={signIn} />
</ValidatorProvider>
```

Async validators are also supported out of the box:

```js
class CustomValidator {
  async errorsFor({ username }) {
    const taken = await api.get('/username-check', { username });

    if (taken) {
      return { username: 'is already taken' };
    }
  }
}
```

For a reference implementation of custom validators, please see the
[JSON Schema validator plugin](https://github.com/MadRabbit/a-plus-forms-json-validator)

### Custom Inputs

Where `A+ forms` really shine is the ease of creation of new custom inputs. A
very simple use case would look somewhat like this:

```js
import { field } from 'a-plus-forms';

const MyCustomInput = ({ value, onChange }) =>
  <input type="text" value={value} onChange={onChange} />;

export default field(MyCustomInput);
```

Essentially, the `field` decorator is where the magic happens, it takes care of
all the state, errors and layouts management for you. The only think you need
to provide back a _controlled_ input that understands `value` and `onChange`.

You can also re-use/re-wrap existing inputs to build extra functionality into
the fields:

```js
import { field, TextInput } from 'a-plus-forms';

const PhoneNumberInput = props => {
  const { onChange, ...rest } = props;
  const format = userInput => toPhoneNumber(userInput);

  return (
    <TextInput
      {...rest}
      layout={null} // <- render the input only
      onChange={value => onChange(format(value))}
    />
  );
}
```

For more examples, please see the collection of the [built in inputs](src/inputs)

### Compound/Nested Inputs

One can easily combine several inputs into one compound input if needed.

```js
import { field, TextInput } from 'a-plus-forms';

const AddressInput = field({ nested: true })(
  () => (
    <div>
      <TextInput name="country" layout={false} />
      <TextInput name="state" layout={false} />
      <TextInput name="city" layout={false} />
    </div>
  )
);

const ProfileForm = ({ onSubmit }) =>
  <Form onSubmit={onSubmit}>
    <AddressInput name="address" />
  </Form>;
```

When the user submits the form, the `onSubmit` function will receive a structure
that looks like so:

```js
{
  address: {
    country: '...',
    state: '...',
    city: '...'
  }
}
```




## Copyright & License

All source code in this repository released under the terms of the ISC license.

Copyright (C) 2017 Nikolay Nemshilov
