# string2js
Create Javascript objects and primitives from their string representation

This module expose a function to convert string values to Javascript objects. It
also offer a `reviver()` function to be used with `JSON.parse()`.


## RegExp

The module allow to reviver `RegExp` objects. To serialize them automatically as
JSON, just add the next snippet to the begining of your code:

```js
if(RegExp.prototype.toJSON === undefined)
   RegExp.prototype.toJSON = RegExp.prototype.toString
```
