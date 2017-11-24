# Installation & Configuration

A+ forms designed to have a minimal footprint when it comes to installation
and configuration requirements; hence the installation process is straight
forward:

```
npm install a-plus-forms

yarn add a-plus-forms
```

Most of the configuration done via higher order components in the app itself, but
there are some defaults that one can override directly:

```js
import { config } from 'a-plus-forms';

config.DefaultValidator // -> the fallback validator class
config.DefaultLayout // -> the fallback inputs layout
config.FormLayout // -> the fallback Form layout
```
