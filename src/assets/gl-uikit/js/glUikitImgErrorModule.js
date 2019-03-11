(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './services/glUIkitAvatarService'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./services/glUIkitAvatarService'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.glUIkitAvatarService);
    global.glUikitImgErrorModule = mod.exports;
  }
})(this, function (module, exports, _glUIkitAvatarService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _glUIkitAvatarService2 = _interopRequireDefault(_glUIkitAvatarService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function glImgError($timeout, glUIkitAvatarService) {
    return {
      restrict: 'A',
      scope: { glImgError: '=' },
      link: function link($scope, $elem, $attrs) {
        var options = $scope.glImgError;
        if ($attrs.ngSrc || $attrs.src) {
          $elem.on('error', function () {
            glUIkitAvatarService.appendImage($elem, options);
          });
        } else {
          glUIkitAvatarService.appendImage($elem, options);
        }
      }
    };
  };

  var glUikitImgErrorModule = angular.module('glUikitImgError', []);

  glUikitImgErrorModule.service('glUIkitAvatarService', _glUIkitAvatarService2.default);
  glUikitImgErrorModule.directive('glImgError', ['$timeout', 'glUIkitAvatarService', glImgError]);
  exports.default = glUikitImgErrorModule;
  module.exports = exports['default'];
});