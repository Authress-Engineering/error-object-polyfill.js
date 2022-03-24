# error-object-polyfill.js
Replace your lame string errors with object versions.


## Usage
Use `Error.create` to pass objects as error messages. That's it, really simple, one line error objects, go to town!

```js
throw Error.create({ title: 'Message', details: { data: {} } }, 'OPTIONAL_ERROR_CODE');
```
