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
    global.glUikitSpinbuttonModule = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var glSpinButton = function glSpinButton() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        inputVal: '=',
        isDisabled: '=',
        min: '=',
        max: '='
      },
      template: '<div class="number-input-wrap" ng-class="{disable: isDisabled}">' + '<input class="main-input" ng-model="inputVal" type="text" ng-change="changeInput()" ng-disabled="isDisabled" name="" value="{{inputVal}}">' + '<div class="act-btn btn-up"><div class="arrow-up"></div></div>' + '<div class="act-btn btn-down"><div class="arrow-down"></div></div>' + '</div>',
      controller: ['$scope', function ($scope) {
        this.isInteger = function (x) {
          return Math.round(x) === +x;
        };
        this.isEnterTheRange = function (number, min, max) {
          if (number > min && number < max) {
            return true;
          } else {
            return false;
          }
        };
      }],
      link: function link($scope, $elm, attrs, controller) {
        var btnUp = $elm[0].querySelector('.btn-up'),
            btnDown = $elm[0].querySelector('.btn-down'),
            isDisabled = $scope.isDisabled || false,
            minLim = $scope.min || 0,
            maxLim = $scope.max || 99;
        angular.element(btnUp).bind('click', function () {
          if (!isDisabled && controller.isInteger($scope.inputVal) && $scope.inputVal < maxLim) {
            $scope.$apply(function () {
              $scope.inputVal++;
            });
          } else {
            console.log('input value is not number or disabled');
          }
        });
        angular.element(btnDown).bind('click', function () {
          if (!isDisabled && controller.isInteger($scope.inputVal) && $scope.inputVal > minLim) {
            $scope.$apply(function () {
              $scope.inputVal--;
            });
          } else {
            console.log('input value is not number or disabled');
          }
        });
        $scope.changeInput = function () {
          $scope.inputVal = +$scope.inputVal;
          if (controller.isInteger($scope.inputVal)) {
            if (!controller.isEnterTheRange($scope.inputVal, minLim, maxLim)) {
              if ($scope.inputVal > maxLim) {
                $scope.inputVal = maxLim;
                console.log('number exceeds range');
              } else if ($scope.inputVal < minLim) {
                $scope.inputVal = minLim;
                console.log('number exceeds range');
              }
            }
          } else {
            $scope.inputVal = 0;
            console.log('number without range or disabled');
          }
        };
      }
    };
  };
  var glUikitSpinbutton = angular.module('glUikitSpinbutton', []);
  glUikitSpinbutton.directive('glSpinButton', glSpinButton);
  exports.default = glUikitSpinbutton;
  module.exports = exports['default'];
});