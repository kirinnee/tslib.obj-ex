!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}("undefined"!=typeof window?window:this,function(){return function(n){var r={};function o(t){if(r[t])return r[t].exports;var e=r[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}return o.m=n,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(1);e.ObjectX=r.ObjectX},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t){t.AssertExtend(),this.c=t}return Object.defineProperty(t.prototype,"IsExtended",{get:function(){return null!=Object.prototype.Equal},enumerable:!0,configurable:!0}),t.prototype.AssertExtend=function(){if(!this.IsExtended)throw new Error("Objex needs to be extended")},t.prototype.ExtendPrimitives=function(){var o=this,e=this.c;Object.prototype.AsMap=function(){return e.FlattenObject(this)},Object.prototype.Clone=function(){var n={};return this.Each(function(t,e){o.NO(e)?n[t]=e:n[t]=e.Clone()}),n},Object.prototype.Overwrite=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n=(t=t.Where(function(t){return null!=t})).length;if(0===n)return this.Clone();var r=o.OR(this,t[0]);return 1===n?r:r.Overwrite.apply(r,t.Skip(1))},Object.prototype.Each=function(t){for(var e in this)this.hasOwnProperty(e)&&t(e,this[e]);return this},Object.prototype.Map=function(r){var o={};return this.Each(function(t,e){var n=r(t,e);o[n.key]=n.value}),o},Object.prototype.MapKey=function(n){var r={};return this.Each(function(t,e){return r[n(t,e)]=e}),r},Object.prototype.MapValue=function(n){var r={};return this.Each(function(t,e){return r[t]=n(e,t)}),r},Object.prototype.Where=function(n){var r={};return this.Each(function(t,e){n(t,e)&&(r[t]=e)}),r},Object.prototype.Equal=function(t){return e.DeepEqual(this,t)}},t.prototype.TO=function(t,e){return typeof t===e},t.prototype.NO=function(t){return this.c.IsArray(t)||t instanceof RegExp||t instanceof Date||!this.TO(t,"object")||this.TO(t,"function")},t.prototype.OR=function(t,e){for(var n in e=e.Clone(),t)t.hasOwnProperty(n)&&("object"==typeof e[n]?e[n]=this.OR(t[n],e[n]):e[n]=t[n]);return e},t}();e.ObjectX=r}])});