var kalei = {
  version: '0.3',

  author: 'Nicolas Payrouse',

  settings: (function () {
    var _settings = {
      connectLabel: 'Connect',
      headerHeight: 60,
      menuHeight: 60,
      canvasID: 'theCanvas',
      backgroundColor: '#000000',
      layoutLineColor: '#282828',
      layoutLineWidth: 0.5,
      layoutLinesCount: 9,
      lineJoin: 'round',
      lineCap: 'round',
      drawLineColor: '#F5FCFA',
      drawLineWidth: 1,
      drawSizeName: 'M',
      drawOpacity: 1,
      drawSizes: {
        S: 0.3,
        M: 1,
        L: 4,
        XL: 20,
      },
      mirrorEffect: true,
    };

    return {
      get: function (settingName) {
        return _settings[settingName];
      },
      set: function (settingName, value) {
        return (_settings[settingName] = value);
      },
      getAll: function () {
        return _settings;
      },
    };
  })(),

  utils: {
    colorIsLightOrDark: function (hexcolor) {
      var _hexcolor = hexcolor.replace('#', '');
      var r = parseInt(_hexcolor.substr(0, 2), 16);
      var g = parseInt(_hexcolor.substr(2, 2), 16);
      var b = parseInt(_hexcolor.substr(4, 2), 16);
      var yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 128 ? 'light' : 'dark';
    },

    hypot: function (x, y) {
      return Math.sqrt(x * x + y * y);
    },

    convertHex: function (hex, opacity) {
      hex = hex.replace('#', '');
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);

      result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
      return result;
    },

    guid: function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },

    createCookie: function (name, value, days) {
      var expires;

      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toGMTString();
      } else {
        expires = '';
      }
      document.cookie =
        encodeURIComponent(name) +
        '=' +
        encodeURIComponent(value) +
        expires +
        '; path=/';
    },

    readCookie: function (name) {
      var nameEQ = encodeURIComponent(name) + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
          return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
      return null;
    },

    removeCookie: function (name) {
      kalei.utils.createCookie(name, '', -1);
    },

    getURLParameter: function (name) {
      return (
        decodeURIComponent(
          (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(
            location.search
          ) || [null, ''])[1].replace(/\+/g, '%20')
        ) || null
      );
    },

    getNextHighestZindex: function () {
      var highestZ = 1;
      var onefound = false;
      var divs = document.getElementsByTagName('*');
      var z;
      for (var i = 0; i < divs.length; i++) {
        z = parseInt(window.getComputedStyle(divs[i]).zIndex);

        if (z > 0) {
          if (!onefound) {
            highestZ = z;
            onefound = true;
          } else {
            var ii = z;
            if (ii > highestZ) {
              highestZ = ii;
            }
          }
        }
      }
      return highestZ + 1;
    },
  },
};
