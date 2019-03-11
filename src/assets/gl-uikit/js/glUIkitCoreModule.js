(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './directives/glkitCalcDropdownHeightDirective.js', './glUikitSpinbuttonModule.js', './glUikitRatingModule.js', './glUikitInitialAvatarModule.js', './glUikitImgErrorModule.js', './glUikitExpandableListModule.js', './glUikitTagbgModule.js'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./directives/glkitCalcDropdownHeightDirective.js'), require('./glUikitSpinbuttonModule.js'), require('./glUikitRatingModule.js'), require('./glUikitInitialAvatarModule.js'), require('./glUikitImgErrorModule.js'), require('./glUikitExpandableListModule.js'), require('./glUikitTagbgModule.js'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.glkitCalcDropdownHeightDirective, global.glUikitSpinbuttonModule, global.glUikitRatingModule, global.glUikitInitialAvatarModule, global.glUikitImgErrorModule, global.glUikitExpandableListModule, global.glUikitTagbgModule);
    global.glUIkitCoreModule = mod.exports;
  }
})(this, function (module, exports, _glkitCalcDropdownHeightDirective) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _glkitCalcDropdownHeightDirective2 = _interopRequireDefault(_glkitCalcDropdownHeightDirective);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var glUIkitCoreModule = angular.module('glUIkitCoreModule', ['glUikitSpinbutton', 'glUikitRating', 'glUikitInitialAvatarModule', 'glUikitImgError', 'glUikitExpandableListModule', 'glUikitTagbgModule']);

  //directives
  //module
  glUIkitCoreModule.directive('glkitCalcDropdownHeight', _glkitCalcDropdownHeightDirective2.default);

  exports.default = glUIkitCoreModule;
  module.exports = exports['default'];
});