$(function () {
  kalei.canvas = (function () {
    var _canvas = null;
    var _ctx = null;

    var _id = kalei.settings.get('canvasID');
    var _guid = kalei.utils.guid();
    var _kaleiGuidToLoad = null;
    var _authorID = null;

    var _width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    var _height =
      window.innerHeight > 0
        ? window.innerHeight -
          kalei.settings.get('headerHeight') -
          kalei.settings.get('menuHeight')
        : screen.height -
          kalei.settings.get('headerHeight') -
          kalei.settings.get('menuHeight');

    var _isDrawing = false;
    var _isSaving = false;
    var _points = [];

    var _start = function () {
      _buildCanvas();
      _fillBackgroundColor();
      _drawStarLayout();
      _bindCanvasEvents();
    };

    var _buildCanvas = function () {
      _canvas = document.createElement('canvas');
      _canvas.id = _id;
      _canvas.width = _width;
      _canvas.height = _height;
      document.getElementById('canvasWrapper').appendChild(_canvas);

      _ctx = _canvas.getContext('2d');
    };

    var _fillBackgroundColor = function () {
      _ctx.fillStyle = kalei.settings.get('backgroundColor');
      _ctx.fillRect(0, 0, _width, _height);
    };

    var _drawStarLayout = function () {
      var angle = 360 / kalei.settings.get('layoutLinesCount');
      var radius = _width > _height ? _width / 2 : _height / 2;

      _ctx.lineWidth = kalei.settings.get('layoutLineWidth');
      _ctx.strokeStyle = kalei.settings.get('layoutLineColor');
      _ctx.lineJoin = kalei.settings.get('lineJoin');
      _ctx.lineCap = kalei.settings.get('lineCap');

      for (var i = 0; i < kalei.settings.get('layoutLinesCount'); i++) {
        _ctx.beginPath();
        _ctx.moveTo(_width / 2, _height / 2);

        _ctx.lineTo(
          _width / 2 + radius * Math.cos(_degToRad(angle * i)),
          _height / 2 + radius * Math.sin(_degToRad(angle * i))
        );
        _ctx.stroke();
      }
    };

    var _bindCanvasEvents = function () {
      $(_canvas)
        .on(kalei.interface.eventsName.down, function (e) {
          _doDown(e);
        })
        .on(kalei.interface.eventsName.move, function (e) {
          e.preventDefault(); //Used to prevent Chrome pull down effect to refresh page TODO: Do this only on chrome android
          _doMove(e);
        })
        .on(kalei.interface.eventsName.up, function (e) {
          _doUp(e);
        })
        .on(kalei.interface.eventsName.leave, function (e) {
          _doUp(e);
        });
    };

    var _doDown = function (e) {
      var _x =
        (kalei.interface.isTouchDevice()
          ? e.targetTouches[0].pageX
          : e.offsetX) -
        _width / 2; // - kalei.settings.get('headerHeight');
      var _y =
        (kalei.interface.isTouchDevice()
          ? e.targetTouches[0].pageY
          : e.offsetY) -
        _height / 2 -
        (kalei.interface.isTouchDevice()
          ? kalei.settings.get('headerHeight')
          : 0);

      //console.log(_x, _y);

      _isDrawing = true;

      _ctx.strokeStyle = kalei.utils.convertHex(
        kalei.settings.get('drawLineColor'),
        kalei.settings.get('drawOpacity')
      );
      _ctx.lineWidth = kalei.settings.get('drawLineWidth');
      _ctx.lineJoin = kalei.settings.get('lineJoin');
      _ctx.lineCap = kalei.settings.get('lineCap');

      _points.push([
        {
          x: _x,
          y: _y,
          s: {
            lw: kalei.settings.get('drawLineWidth'),
            ss: kalei.settings.get('drawLineColor'),
            op: kalei.settings.get('drawOpacity'),
          },
        },
      ]);
    };

    var _doMove = function (e) {
      var _x,
        _y,
        _radius,
        _addAngle,
        _angle = 360 / kalei.settings.get('layoutLinesCount'),
        _isTouchDevice = kalei.interface.isTouchDevice(),
        _currentLineIndex = _points.length - 1,
        _doMirror = kalei.settings.get('mirrorEffect');

      if (_isDrawing) {
        _x =
          (kalei.interface.isTouchDevice()
            ? e.targetTouches[0].pageX
            : e.offsetX) -
          _width / 2; // - kalei.settings.get('headerHeight');
        _y =
          (kalei.interface.isTouchDevice()
            ? e.targetTouches[0].pageY
            : e.offsetY) -
          _height / 2 -
          (kalei.interface.isTouchDevice()
            ? kalei.settings.get('headerHeight')
            : 0);

        _points[_currentLineIndex].push({
          x: _x,
          y: _y,
          s: {
            lw: kalei.settings.get('drawLineWidth'),
            ss: kalei.settings.get('drawLineColor'),
            op: kalei.settings.get('drawOpacity'),
          },
        });

        // Duplicate line through Circle portions
        for (var i = 1; i < kalei.settings.get('layoutLinesCount') + 1; i++) {
          _ctx.beginPath();

          _radius = kalei.utils.hypot(
            _points[_currentLineIndex][_points[_currentLineIndex].length - 2].x,
            _points[_currentLineIndex][_points[_currentLineIndex].length - 2].y
          );
          _addAngle = Math.atan2(
            _points[_currentLineIndex][_points[_currentLineIndex].length - 2].y,
            _points[_currentLineIndex][_points[_currentLineIndex].length - 2].x
          );

          _ctx.moveTo(
            _width / 2 +
              _radius * Math.cos(_degToRad(_angle * (i - 1)) + _addAngle),
            _height / 2 +
              _radius * Math.sin(_degToRad(_angle * (i - 1)) + _addAngle)
          );

          _radius = kalei.utils.hypot(
            _points[_currentLineIndex][_points[_currentLineIndex].length - 1].x,
            _points[_currentLineIndex][_points[_currentLineIndex].length - 1].y
          );
          _addAngle = Math.atan2(
            _points[_currentLineIndex][_points[_currentLineIndex].length - 1].y,
            _points[_currentLineIndex][_points[_currentLineIndex].length - 1].x
          );

          _ctx.lineTo(
            _width / 2 +
              _radius * Math.cos(_degToRad(_angle * (i - 1)) + _addAngle),
            _height / 2 +
              _radius * Math.sin(_degToRad(_angle * (i - 1)) + _addAngle)
          );

          _ctx.stroke();

          // ################## //
          // MIRROR EFFECT
          if (_doMirror) {
            _ctx.beginPath();

            _radius = kalei.utils.hypot(
              _points[_currentLineIndex][_points[_currentLineIndex].length - 2]
                .x,
              _points[_currentLineIndex][_points[_currentLineIndex].length - 2]
                .y
            );
            _addAngle = Math.atan2(
              -_points[_currentLineIndex][_points[_currentLineIndex].length - 2]
                .y,
              _points[_currentLineIndex][_points[_currentLineIndex].length - 2]
                .x
            );

            _ctx.moveTo(
              _width / 2 +
                _radius * Math.cos(_degToRad(_angle * (i + 1)) + _addAngle),
              _height / 2 +
                _radius * Math.sin(_degToRad(_angle * (i + 1)) + _addAngle)
            );

            _radius = kalei.utils.hypot(
              _points[_currentLineIndex][_points[_currentLineIndex].length - 1]
                .x,
              _points[_currentLineIndex][_points[_currentLineIndex].length - 1]
                .y
            );
            _addAngle = Math.atan2(
              -_points[_currentLineIndex][_points[_currentLineIndex].length - 1]
                .y,
              _points[_currentLineIndex][_points[_currentLineIndex].length - 1]
                .x
            );

            _ctx.lineTo(
              _width / 2 +
                _radius * Math.cos(_degToRad(_angle * (i + 1)) + _addAngle),
              _height / 2 +
                _radius * Math.sin(_degToRad(_angle * (i + 1)) + _addAngle)
            );

            _ctx.stroke();
          }
        }
      }
    };

    var _doUp = function (e) {
      _isDrawing = false;
    };

    var _redraw = function () {
      var _angle, _radius, _addAngle, _doMirror;

      _width = window.innerWidth > 0 ? window.innerWidth : screen.width;
      _height =
        window.innerHeight > 0
          ? window.innerHeight -
            kalei.settings.get('headerHeight') -
            kalei.settings.get('menuHeight')
          : screen.height -
            kalei.settings.get('headerHeight') -
            kalei.settings.get('menuHeight');

      _canvas.width = _width;
      _canvas.height = _height;

      _ctx.clearRect(0, 0, _width, _height);

      _fillBackgroundColor();
      _drawStarLayout();

      _angle = 360 / kalei.settings.get('layoutLinesCount');

      _doMirror = kalei.settings.get('mirrorEffect');

      var _l = _points.length;

      for (var g = 0; g < _l; g++) {
        _ctx.beginPath();
        _ctx.moveTo(_points[g].x + _width / 2, _points[g].y + _height / 2);

        var _ll = _points[g].length;

        for (var h = 0; h < _ll; h++) {
          //_ctx.strokeStyle = _points[g][h].s.ss;
          _ctx.strokeStyle = kalei.utils.convertHex(
            _points[g][h].s.ss,
            _points[g][h].s.op
          );
          _ctx.lineWidth = _points[g][h].s.lw;
          _ctx.lineTo(
            _points[g][h].x + _width / 2,
            _points[g][h].y + _height / 2
          );
        }
        _ctx.stroke();

        // Duplicate line through Circle portions
        for (var i = 0; i < kalei.settings.get('layoutLinesCount'); i++) {
          _radius = kalei.utils.hypot(_points[g][0].x, _points[g][0].y);
          _addAngle = Math.atan2(_points[g][0].y, _points[g][0].x);

          _ctx.beginPath();
          _ctx.strokeStyle = kalei.utils.convertHex(
            _points[g][0].s.ss,
            _points[g][0].s.op
          );
          _ctx.lineWidth = _points[g][0].s.lw;

          _ctx.moveTo(
            _width / 2 +
              _radius * Math.cos(_degToRad(_angle * (i + 1)) + _addAngle),
            _height / 2 +
              _radius * Math.sin(_degToRad(_angle * (i + 1)) + _addAngle)
          );

          for (var j = 0; j < _ll - 1; j++) {
            _radius = kalei.utils.hypot(_points[g][j].x, _points[g][j].y);
            _addAngle = Math.atan2(_points[g][j].y, _points[g][j].x);

            _ctx.strokeStyle = kalei.utils.convertHex(
              _points[g][j].s.ss,
              _points[g][j].s.op
            );
            _ctx.lineWidth = _points[g][j].s.lw;

            _ctx.lineTo(
              _width / 2 +
                _radius * Math.cos(_degToRad(_angle * (i + 1)) + _addAngle),
              _height / 2 +
                _radius * Math.sin(_degToRad(_angle * (i + 1)) + _addAngle)
            );
          }

          _ctx.stroke();

          if (_doMirror) {
            _radius = kalei.utils.hypot(_points[g][0].x, -_points[g][0].y);
            _addAngle = Math.atan2(-_points[g][0].y, _points[g][0].x);

            _ctx.beginPath();
            _ctx.strokeStyle = kalei.utils.convertHex(
              _points[g][0].s.ss,
              _points[g][0].s.op
            );
            _ctx.lineWidth = _points[g][0].s.lw;

            _ctx.moveTo(
              _width / 2 +
                _radius * Math.cos(_degToRad(_angle * (i + 1)) + _addAngle),
              _height / 2 +
                _radius * Math.sin(_degToRad(_angle * (i + 1)) + _addAngle)
            );

            for (var j = 0; j < _ll; j++) {
              _radius = kalei.utils.hypot(_points[g][j].x, -_points[g][j].y);
              _addAngle = Math.atan2(-_points[g][j].y, _points[g][j].x);

              _ctx.strokeStyle = kalei.utils.convertHex(
                _points[g][j].s.ss,
                _points[g][j].s.op
              );
              _ctx.lineWidth = _points[g][j].s.lw;

              _ctx.lineTo(
                _width / 2 +
                  _radius * Math.cos(_degToRad(_angle * (i + 1)) + _addAngle),
                _height / 2 +
                  _radius * Math.sin(_degToRad(_angle * (i + 1)) + _addAngle)
              );
            }

            _ctx.stroke();
          }
        }
      }
    };

    var _crtlZ = function () {
      _points.splice(-1, 1);
      _redraw();
    };

    var _degToRad = function (deg) {
      return (deg * Math.PI) / 180;
    };

    var _duplicate = function () {
      var _guid = kalei.utils.guid();
      var _image64 = _canvas.toDataURL('image/png', 0.6);

      _isSaving = true;
      kalei.menu.savingButtonLoadingMode(true);

      kalei.services
        .save(
          _points,
          _guid,
          _image64,
          parseInt(kalei.settings.get('layoutLinesCount'), 10)
        )
        .then(
          function (data) {
            _isSaving = false;

            // Reload the page with the right URL
            window.location = kalei.settings.get('ROOT_URL') + '/guid/' + _guid;
          },
          function (error) {
            Materialize.toast(
              'There was an error while duplicating your Kaleï!',
              3000
            );
            _isSaving = false;
            kalei.menu.savingButtonLoadingMode(false);
          }
        );
    };

    var _save = function () {
      var _image64;

      if (_isSaving) {
        return;
      }

      // check if user is connected with his facebook account
      if (kalei.connect.account().login) {
        // Check if user has started to draw something
        if (_points.length === 0) {
          swal(
            'Ooooooooops !',
            'Please start drawing before saving your Kaleï',
            'warning'
          );
          return;
        }

        // Check if the original author of the kalei equals to the current
        // user ID
        if (
          kalei.canvas.getAuthorID() === null ||
          kalei.connect.account().userID === kalei.canvas.getAuthorID()
        ) {
          _image64 = _canvas.toDataURL('image/png', 0.6);

          _isSaving = true;
          kalei.menu.savingButtonLoadingMode(true);

          kalei.services
            .save(_points, _guid, _image64, {
              layoutLinesCount: parseInt(
                kalei.settings.get('layoutLinesCount'),
                10
              ),
              mirrorEffect: kalei.settings.get('mirrorEffect'),
            })
            .then(
              function (data) {
                Materialize.toast('Your Kaleï has been well saved!', 3000);
                _isSaving = false;
                kalei.menu.savingButtonLoadingMode(false);
                kalei.header.updateGalleryPanel();
                kalei.menu.showShareOnFacebookButton();
                kalei.menu.showLikeButton();
                kalei.menu.showCommentButton();
                kalei.menu.showReplayButton();
              },
              function (error) {
                Materialize.toast(
                  'There was an error while saving your Kaleï!',
                  3000
                );
                _isSaving = false;
                kalei.menu.savingButtonLoadingMode(false);
              }
            );
        } else {
          // Current user is not the original author
          // Duplicate the Kalei in his account
          swal(
            {
              title: 'Hey !',
              text: "You're not the original author of this Kaleï. Would you like to duplicate this one in your Kaleïs ?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#03a9f4',
              confirmButtonText: 'Ok duplicate !',
              closeOnConfirm: false,
            },
            function () {
              swal({
                title: 'Duplicating Kaleï...',
                type: 'info',
                showConfirmButton: false,
                html: true,
                text: '<div class="preloader-wrapper big active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>',
              });

              _duplicate();
            }
          );
        }
      } else {
        swal(
          {
            title: 'Ooooooooops...',
            text: 'You need to be logged in to save your Kaleï!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#03a9f4',
            confirmButtonText: 'I want to login !',
            closeOnConfirm: true,
          },
          function () {
            $('#logInButton').click();
          }
        );
      }
    };

    var _replay = function () {
      for (var i = 0; i < _points.length; i++) {
        setTimeout(
          function (j) {
            console.log(_points[j]);
          },
          i * 500,
          i
        ); // we're passing i
      }
    };

    var _setKaleiGuidToLoad = function (guid) {
      swal({
        title: 'Loading Kaleï',
        type: 'info',
        showConfirmButton: false,
        html: true,
        text: '<div class="preloader-wrapper big active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>',
      });
      _kaleiGuidToLoad = guid;
    };

    // ############################ //
    // Start
    // ############################ //

    _start();

    return {
      canvas: _canvas,
      ctx: _ctx,
      points: function () {
        return _points;
      },
      setPoints: function (arr) {
        _points = arr;
      },
      redraw: function () {
        return _redraw();
      },
      ctrlZ: function () {
        return _crtlZ();
      },
      save: function () {
        _save();
      },
      replay: function () {
        _replay();
      },
      getCanvasSize: function () {
        return {
          w: _width,
          h: _height,
        };
      },
      getGUID: function () {
        return _guid;
      },
      setGUID: function (guid) {
        _guid = guid;
      },
      setKaleiGuidToLoad: function (guid) {
        return _setKaleiGuidToLoad(guid);
      },
      getKaleiGuidToLoad: function () {
        return _kaleiGuidToLoad;
      },
      setAuthorID: function (id) {
        _authorID = id;
      },
      getAuthorID: function () {
        return _authorID;
      },
    };
  })();
});
