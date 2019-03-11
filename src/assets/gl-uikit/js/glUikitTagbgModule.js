(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.glUikitTagbgModule = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function glUikitTagbg() {
    return {
      restrict: 'A',
      scope: {
        glTagBg: '=',
        glTagbgErrorCallback: '&'
      },
      link: function link($scope, $elem, $attrs) {
        var shadowImage,
            options = $scope.glTagBg;

        if (!options) return;

        shadowImage = new Image(100, 100);
        shadowImage.src = options.url;

        shadowImage.addEventListener("load", function (event) {
          $elem.css({
            'background-image': 'url(' + options.url + ')'
          });
        }, true);

        shadowImage.addEventListener("error", function (event) {
          $scope.$apply($scope.glTagbgErrorCallback()(event, $elem, options.data));
        });
      }
    };
  };

  var glUikitTagbgModule = angular.module('glUikitTagbgModule', []);

  glUikitTagbgModule.directive('glTagBg', glUikitTagbg);

  exports.default = glUikitTagbgModule;
  module.exports = exports['default'];
});