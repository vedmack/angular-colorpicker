Angular Color Picker
=====
 
Description:
=====

The color picker for AngularJS - Native / Simple / Cool. No other dependencies are needed at all.


Contact/Social:
=====
If you want to ask a question you can post a question on [stackoverflow](www.stackoverflow.com)

If you like my directive, you can show your appreciation by following me on [Twitter](https://twitter.com/danielreznick) / [GitHub](https://github.com/vedmack)


Features:
=====

- Can extend simple input
- Can replace a div (or any other container) with an inline color picker
- Can replace any HTML element with a cool tiny trigger
- Can color the extended input

Examples:
=====

<input color-picker ng-model="colorValueInput">

<div color-picker ng-model="colorValueInline"></div>

<input color-picker tiny-trigger="true" ng-model="colorValueTinyTrigger">

<input color-picker color-me="true" ng-model="colorValueInputColor">


Usage:
=====

```javascript
angular.module('colorPickerApp', ['color-picker-dr'])
  .controller('ColorPickerCtrl', ['$scope', function($scope) {
  }]);
```



Available attributes
=====

* color-picker: use this to turn your element into a color picker
* tiny-trigger="true": replace any HTML element with a cool tiny trigger
* color-me="true": color the extended input on color selection


License:
=====

Copyright (c) 2015 Daniel Reznick, released under the MIT license
