$(function () {
  kalei.services = (function () {
    var _apiPATH = '/php/api.php';

    var _saveKalei = function (data, guid, image64, settings) {
      return new Promise(function (resolve, reject) {
        $.ajax({
          type: 'POST',
          url: kalei.settings.get('ROOT_URL') + _apiPATH,
          dataType: 'json',
          data: {
            fnName: 'save',
            params: {
              KAL_USE_FacebookID: kalei.connect.account().userID,
              KAL_Data: JSON.stringify(data),
              KAL_GUID: guid,
              KAL_Settings: JSON.stringify(settings),
              image64: image64,
            },
          },
        })
          .done(function (data) {
            resolve(data);
          })
          .fail(function (error) {
            reject(error);
          });
      });
    };

    var _checkUser = function (data) {
      return new Promise(function (resolve, reject) {
        $.ajax({
          type: 'POST',
          url: kalei.settings.get('ROOT_URL') + _apiPATH,
          data: {
            fnName: 'checkUser',
            params: data,
          },
        })
          .done(function (data) {
            resolve(data);
          })
          .fail(function (error) {
            reject(error);
          });
      });
    };

    var _removeKalei = function (guid) {
      var KAL_GUID = guid;

      return new Promise(function (resolve, reject) {
        $.ajax({
          type: 'POST',
          url: kalei.settings.get('ROOT_URL') + _apiPATH,
          data: {
            fnName: 'removeKalei',
            params: {
              KAL_GUID: KAL_GUID,
            },
          },
        })
          .done(function (data) {
            resolve(data);
          })
          .fail(function (error) {
            reject(error);
          });
      });
    };

    var _likeKalei = function (guid) {
      var KAL_GUID = guid;

      return new Promise(function (resolve, reject) {
        $.ajax({
          type: 'POST',
          url: kalei.settings.get('ROOT_URL') + _apiPATH,
          data: {
            fnName: 'likeKalei',
            params: {
              KAL_GUID: KAL_GUID,
            },
          },
        })
          .done(function (data) {
            resolve(data);
          })
          .fail(function (error) {
            reject(error);
          });
      });
    };

    var _getCurrentUserLikeKalei = function (guid) {
      var KAL_GUID = guid;

      return new Promise(function (resolve, reject) {
        $.ajax({
          type: 'POST',
          url: kalei.settings.get('ROOT_URL') + _apiPATH,
          data: {
            fnName: 'getCurrentUserLikeKalei',
            params: {
              KAL_GUID: KAL_GUID,
            },
          },
        })
          .done(function (data) {
            resolve(data);
          })
          .fail(function (error) {
            reject(error);
          });
      });
    };

    var _loadKalei = function (guid) {
      var KAL_GUID = guid;

      return new Promise(function (resolve, reject) {
        $.ajax({
          type: 'POST',
          url: kalei.settings.get('ROOT_URL') + _apiPATH,
          dataType: 'json',
          data: {
            fnName: 'loadKalei',
            params: {
              KAL_GUID: KAL_GUID,
            },
          },
        })
          .done(function (data) {
            resolve(data);
          })
          .fail(function (error) {
            reject(error);
          });
      });
    };

    // ##################### //
    // PUBLIC METHODS
    // ##################### //
    return {
      save: function (data, guid, image64, sectionCount) {
        return _saveKalei(data, guid, image64, sectionCount);
      },

      checkUser: function (data) {
        return _checkUser(data);
      },

      removeKalei: function (guid) {
        return _removeKalei(guid);
      },

      likeKalei: function (guid) {
        return _likeKalei(guid);
      },

      loadKalei: function (guid) {
        return _loadKalei(guid);
      },

      getCurrentUserLikeKalei: function (guid) {
        return _getCurrentUserLikeKalei(guid);
      },
    };
  })();
});
