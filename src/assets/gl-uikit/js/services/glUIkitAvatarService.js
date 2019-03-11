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
    global.glUIkitAvatarService = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function glUIkitAvatarService($http, $q) {

    function validString(value) {
      return typeof value === 'string' && value.length > 0;
    }

    function appendImage($elem, options) {
      var settings, avatar;

      settings = angular.extend({
        // Default settings
        logo: false
      }, options);

      // if logo parameter specified and it is a valid string, do not generate avatar
      if (validString(settings.logo)) {
        $elem.attr('src', settings.logo);
      } else {
        $elem.attr("src", createAvatar(options));
      }
    }

    function createAvatar(options) {
      var colors, settings, letter, tmpObj, tmpHTML, colorIndex, svg, resultHtml;

      // Defining Colors
      colors = ["#1abc9c", "#16a085", "#f1c40f", "#f39c12", "#2ecc71", "#27ae60", "#e67e22", "#d35400", "#3498db", "#2980b9", "#e74c3c", "#c0392b", "#9b59b6", "#8e44ad", "#bdc3c7", "#34495e", "#2c3e50", "#95a5a6", "#7f8c8d", "#ec87bf", "#d870ad", "#f69785", "#9ba37e", "#b49255", "#b49255", "#a94136"];

      settings = angular.extend({
        // Default settings
        name: 'Global Logic',
        seed: 0,
        charCount: 1,
        textColor: '#ffffff',
        height: 100,
        width: 100,
        fontSize: 60,
        fontWeight: 400,
        fontFamily: 'OpenSans, Helvetica, Arial'
      }, options);

      letter = settings.name.substr(0, settings.charCount).toUpperCase();
      tmpObj = angular.element('<text text-anchor="middle"></text>').attr({
        'y': '50%',
        'x': '50%',
        'dy': '0.35em',
        'pointer-events': 'auto',
        'fill': settings.textColor,
        'font-family': settings.fontFamily
      }).html(letter).css({
        'font-weight': settings.fontWeight,
        'font-size': settings.fontSize + 'px'
      });

      colorIndex = Math.floor((letter.charCodeAt(0) + settings.seed) % colors.length);

      svg = angular.element('<svg></svg>').attr({
        'xmlns': 'http://www.w3.org/2000/svg',
        'pointer-events': 'none',
        'width': settings.width,
        'height': settings.height
      }).css({
        'background-color': colors[colorIndex],
        'width': settings.width + 'px',
        'height': settings.height + 'px'
      });

      svg.append(tmpObj);
      tmpHTML = angular.element('<div>').append(svg.clone()).html();
      resultHtml = window.btoa(unescape(encodeURIComponent(tmpHTML)));

      return 'data:image/svg+xml;base64,' + resultHtml;
    }

    return {
      appendImage: appendImage,
      createAvatar: createAvatar
    };
  };

  glUIkitAvatarService.$inject = ['$http', '$q'];

  exports.default = glUIkitAvatarService;
  module.exports = exports['default'];
});