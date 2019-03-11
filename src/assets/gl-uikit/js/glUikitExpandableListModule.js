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
    global.glUikitExpandableListModule = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var glUikitExpandableList = function glUikitExpandableList($compile, $q, $log, $timeout) {
    return {
      restrict: 'E',
      require: ['ngModel', 'glUikitExpandableList'],
      scope: {
        ngModel: '=',
        settings: '=',

        //event
        onListItemActionTrigger: '=',
        onListItemChange: '='

      },
      template: '\n      <ul class="gl-uikit-expand-list">            \n          <li ng-repeat="item in expandList track by $index" ng-class="{\'last-item\': $last}">\n            <input class="form-control gl-input-default input-{{key}}" ng-change="changeExistListItem(item, $parent.$index, $index)" ng-disabled="{{settings[key].disabled}}" ng-repeat="(key, value) in item" ng-model="item[key]" type="{{(settings[key].type)? settings[key].type: \'text\'}}" name="" placeholder="{{key}}" value="{{value}}" />\n            <span ng-click="deleteListItem($index)" class="glicon-close"></span>\n        </li>\n        <li>\n          <input class="form-control gl-input-default" ng-repeat="(key, value) in newItem" ng-model="newItem[key]" ng-change="changeNewItem(newItem[key], key)" type="{{(settings[key].type)? settings[key].type: \'text\'}}" ng-pattern="settings[key].regexp" name="" placeholder="add new {{key}}" value="{{value}}" />       \n          <a ng-class="{\'disabled\': isDetabledAddBtn }"  ng-click="addListItem()" class="gl-link-primary">Add</a>\n        </li>\n      </ul>\n    ',
      replace: true,
      controller: function controller($scope) {
        var _self = this;

        this.isValidInputData = function (data) {
          var itemLenght,
              itemKeys,
              result = false;
          if (Array.isArray(data) && data.length) {
            for (var index = 0; index < data.length; index++) {
              // check if every item is Object
              if (angular.isObject(data[index]) && Object.keys(data[index]).length > 0) {
                if (index === 0) {
                  itemKeys = Object.keys(data[index]);
                  itemLenght = itemKeys.length;
                }

                // check if every Object has same lenght of key
                if (itemLenght === Object.keys(data[index]).length) {
                  var isCheckKey = Object.keys(data[index]).every(function (keyItem, i) {
                    return itemKeys.indexOf(keyItem) !== -1;
                  });

                  // check if every Object has same of key
                  if (isCheckKey) {
                    result = true;
                  } else {
                    console.error('glUikitExpandableList: Object index ' + index + ' does not has same key');
                    result = false;
                    break;
                  }
                } else {
                  console.error('glUikitExpandableList: Object index ' + index + ' does not has same lenght of key');
                  result = false;
                  break;
                }
              } else {
                console.warn('glUikitExpandableList: data item index ' + index + ' is not Object or does not have key');
                result = false;
                break;
              }
            }
            ;
          } else {
            console.warn('glUikitExpandableList: input data is not Array or array is empty');
          }

          return result;
        };

        this.initEmptyFirstListItem = function (initModel) {
          $scope.isDetabledAddBtn = true;
          $scope.newItem = {};

          Object.keys(initModel).forEach(function (item) {
            $scope.newItem[item] = null;
          });
        };

        $scope.changeExistListItem = function (value, listItemIndex, inputIndex) {
          if (angular.isFunction($scope.onListItemChange)) $scope.onListItemChange(value, listItemIndex, inputIndex);
        };

        $scope.changeNewItem = function (value, input) {
          $scope.isDetabledAddBtn = !Object.keys($scope.newItem).every(function (item, index) {
            return angular.isString($scope.newItem[item]) && $scope.newItem[item].length > 0;
          });
        };

        $scope.addListItem = function () {
          if (angular.isFunction($scope.onListItemActionTrigger)) {
            $q.when($scope.onListItemActionTrigger('add', $scope.newItem, $scope.expandList.length)).then(function (result) {
              $scope.expandList.push($scope.newItem);
              //reset last item
              _self.initEmptyFirstListItem($scope.ngModel[0]);
            }, function (error) {
              console.error(error);
            });
          } else {
            $scope.expandList.push($scope.newItem);
            //reset last item
            _self.initEmptyFirstListItem($scope.ngModel[0]);
          }
        };

        $scope.deleteListItem = function (index) {
          if (index > -1) {
            if (angular.isFunction($scope.onListItemActionTrigger)) {
              $q.when($scope.onListItemActionTrigger('delete', $scope.expandList[index], index)).then(function (result) {
                $scope.expandList.splice(index, 1);
              }, function (error) {
                console.error(error);
              });
            } else {
              $scope.expandList.splice(index, 1);
            }
          }
        };
      },
      link: function link($scope, $elm, $attrs, ctrl) {
        var expandListCtr = ctrl[1];
        $scope.expandList = $scope.ngModel;

        if (expandListCtr.isValidInputData($scope.ngModel)) {
          //init empy item list;
          expandListCtr.initEmptyFirstListItem($scope.ngModel[0]);
        } else {
          // this hack for empy array in angular ngModel
          $scope.expandList.splice(0, $scope.expandList.length);

          var fistItem;
          if (angular.isObject($scope.settings)) {
            fistItem = Object.keys($scope.settings).reduce(function (acc, val) {
              acc[val] = 'null';
              return acc;
            }, {});
          } else {
            fistItem = { name: '' };
          }

          expandListCtr.initEmptyFirstListItem(fistItem);
        }
      }
    };
  };

  var glUikitExpandableListModule = angular.module('glUikitExpandableListModule', []);
  glUikitExpandableListModule.directive('glUikitExpandableList', ['$compile', '$q', '$log', '$timeout', glUikitExpandableList]);
  exports.default = glUikitExpandableListModule;
  module.exports = exports['default'];
});