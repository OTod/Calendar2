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
        global.glkitCalcDropdownHeightDirective = mod.exports;
    }
})(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function glkitCalcDropdownHeightDirective($window, $compile) {
        return {
            restrict: 'A',
            link: function link(scope, elm, attrs, ctrl) {
                var winHeight = $window.innerHeight,
                    headerHeight = angular.element('.app-header').outerHeight() || 0;

                elm.css('max-height', winHeight - headerHeight + 'px');
            }
        };
    };
    glkitCalcDropdownHeightDirective.$inject = ['$window', '$compile'];

    exports.default = glkitCalcDropdownHeightDirective;
    module.exports = exports['default'];
});