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
        global.glUikitRatingModule = mod.exports;
    }
})(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var glRating = function glRating() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                val: '=',
                voted: '=?',
                isDisabled: '=',
                stateOn: '@',
                stateOff: '@',
                onVote: '='
            },
            template: '<span class="gl-rating" ng-class="{\'disable\':isDisabled, \'is-vote\': voted}">' + '<i class="gl-ratin-icon" ng-class="stateType"></i>' + '<span class="rating-value">{{val}}</span>' + '</span>',
            controller: ['$scope', function ($scope) {
                this.isInteger = function (x) {
                    return Math.round(x) === +x;
                };
                this.toggleRating = function () {
                    if ($scope.voted) {
                        $scope.voted = false;
                        $scope.val--;
                        $scope.stateType = $scope.stateOff;
                    } else {
                        $scope.voted = true;
                        $scope.val++;
                        $scope.stateType = $scope.stateOn;
                    }
                    ;
                };
            }],
            link: function link($scope, $elm, attrs, controller) {
                $scope.stateOff = $scope.stateOff || 'glicon-heart';
                $scope.stateOn = $scope.stateOn || 'glicon-heartfilled';
                $scope.stateType = $scope.stateOff;

                $scope.$watch('val', function (newVal) {
                    if (newVal) {
                        if (!controller.isInteger($scope.val)) throw new Error('gl-rating is not integer');
                        if ($scope.voted) $scope.stateType = $scope.stateOn;
                    }
                });
                if (!$scope.isDisabled) {
                    $elm.click(function (e) {
                        controller.toggleRating();
                        $scope.$apply($scope.onVote);
                    });
                }
            }
        };
    };

    var glUikitRating = angular.module('glUikitRating', []);

    glUikitRating.directive('glRating', glRating);

    exports.default = glUikitRating;
    module.exports = exports['default'];
});