# Layouts & Styling

Although most forms are on principle are the same—and essentially are buckets of
inputs—the real life rendering of the input fields can vary drastically from an
application to an application. Or even different sections of the same application.

To that end A+ forms don't impose any specific way to render input fields. On the
contrary, it provides the concept of layouts to achieve consistency, flexibility
and long term maintainability of forms in any given situation.

To help you wrap your head around it, think of it this way. We, essentialy separate
the input fields themselves, as data input logic, from the input rendering contexts,
the layouts. An input field itself is a mere controlled `<input />` tag:

```js
import { field } from 'a-plus-forms';

const TextInput = field()(({ value, onChange }) =>
  <input type="text" value={value} onChange={onChange} />
);
```

This input needs a _layout_, which is essentaly the actual HTML context for the input
represented by a stateless component. A+ forms comes with a very basic one by default,
so you might want to declare something more useful for your own application:

```js
const MyLayout = ({ label, error, input }) => (
  <div className="my-field">
    <label>{label}</label>
    <div className="input-block">{input}</div>
    {error ? <small className="error">{error}</small> : null}
  </div>
);
```

## Layouts Usage

Now that you have a layout, there are options how you can use it with A+ forms.

First, and the most crude one is to declare your layout as the default layout throughout
the entire A+ forms setup. This can be done via the `config` object:

```js
import { config } from 'a-plus-forms';

config.DefaultLayout = MyLayout;
```

Now A+ will always fall back to the `MyLayout` as the default option.

If this feels gross, there is a more elegant way to specify your layout via a layout
provider component:

```js
import { LayoutProvider } from 'a-plus-forms';

const App = () => (
  <LayoutProvider layout={MyLayout}>
    {
      // the rest of the application
    }
  </LayoutProvider>
);
```

this is particularly useful if you need to have some different layouts in different
sections of your application. For example you can use it with an application router:

```js
const Routes = (
  <Route path="/">
    <Route path="public">
      <LayoutProvider layout={PublicFormLayout}>
        {
          // all forms here will use the public form layout
        }
      </LayoutProvider>
    </Route>
    <Route path="private">
      <LayoutProvider layout={PrivateFormLayout}>
        {
          // all forms here will use the private form layout
        }
      </LayoutProvider>
    </Route>
  </Route>
)
```

## More Grannular Control

There're some options for more grannular control over the form layouts usage.
For example, a specific form could render its inputs using a separate layout

```js
<Form layout={CompactLayout} onSubmit={handler}>
  <TextInput name="username" label="Username" />
  <PasswordInput name="username" label="Username" />
</Form>
```

Also, a specific input could be rendered with a different layout if needed:

```js
<TextInput layout={FunkyLayout} name="name" label="Something" />
```

## Rendering Without Layouts

Depending an application needs, one might need to render an input fields
completly without the layout decorations. This is useful when one needs
either a bare metal input, or they want to re-wrap an existing input
component into another custom input field. In this case the layouts
can be switched off by passing the `layout={null}` option:

```js
import { field, TextInput } from 'a-plus-forms';

@field()
class PhoneInput extends React.Component {
  onChange = (rawInput) => {
    // formatting the phone input
    this.props.onChange(format(rawInput))
  }

  render() {
    return (
      <TextInput
        {...this.props}
        onChange={this.onChange}
        layout={null}
      />
    );
  }
}
```

In this situation, we're re-using an existing `TextInput` component and
adding some extra logic that formats the user input into a nice looking
phone number.