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
        global.glUikitInitialAvatarModule = mod.exports;
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

    function glInitialAvatar(glUIkitAvatarService) {
        return {
            restrict: 'A',
            scope: { glInitialAvatar: '=' },
            link: function link($scope, $elem, $attrs) {
                var options = $scope.glInitialAvatar;
                glUIkitAvatarService.appendImage($elem, options);
            }
        };
    };

    var glUikitInitialAvatar = angular.module('glUikitInitialAvatarModule', []);

    glUikitInitialAvatar.service('glUIkitAvatarService', _glUIkitAvatarService2.default);
    glUikitInitialAvatar.directive('glInitialAvatar', ['glUIkitAvatarService', glInitialAvatar]);

    exports.default = glUikitInitialAvatar;
    module.exports = exports['default'];
});