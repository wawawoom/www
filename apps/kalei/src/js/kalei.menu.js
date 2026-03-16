$(function () {
  kalei.menu = (function () {
    var _isOpen = false;
    var _currentPanel = '';
    var _panelWidth = kalei.canvas.getCanvasSize().w;

    var _start = function () {
      _bindMenuEvents();
      _setMenuColorBackgroundColor(kalei.settings.get('drawLineColor'));
      _clickOnDrawColor(
        $(
          '.kaleiColorPick[data-color="' +
            kalei.settings.get('drawLineColor') +
            '"]'
        )
      );
      _clickOnDrawSize(kalei.settings.get('drawSizeName'));

      $('#changeLayoutLinesCount').val(kalei.settings.get('layoutLinesCount'));
      $('#repeatSectionCountDisplay').text(
        kalei.settings.get('layoutLinesCount')
      );

      $('#subMenuWrapper').css('left', -_panelWidth + 'px');
      $('#subMenuWrapper').width(_panelWidth);
    };

    var _setMenuColorBackgroundColor = function (color) {
      $('#menuWrapper #drawColors').css('background-color', color);

      if (kalei.utils.colorIsLightOrDark(color) == 'light') {
        $('#menuWrapper #drawColors').addClass('light');
      } else {
        if ($('#menuWrapper #drawColors').hasClass('light')) {
          $('#menuWrapper #drawColors').removeClass('light');
        }
      }
    };

    var _setMirrorEffect = function (bool) {
      kalei.settings.set('mirrorEffect', bool);
      if (bool) {
        $('#mirrorEffect').attr('checked', 'checked');
      } else {
        $('#mirrorEffect').removeAttr('checked');
      }
      kalei.canvas.redraw();
    };

    var _clickOnDrawSize = function (sizeName) {
      kalei.settings.set(
        'drawLineWidth',
        kalei.settings.get('drawSizes')[sizeName]
      );

      $('#theCanvas').attr('data-cursor-size', sizeName);
      $('.aSizeSelector').removeClass('selected');
      $('#menuWrapper #drawSize')
        .empty()
        .append(
          $('.aSizeSelector[data-draw-size-name="' + sizeName + '"]')
            .find('svg')
            .clone()
        );
      $('.aSizeSelector[data-draw-size-name="' + sizeName + '"]').addClass(
        'selected'
      );
    };

    var _clickOnDrawColor = function ($this) {
      $('.kaleiColorPick.selected').removeClass('selected');
      $this.addClass('selected');

      var _color = $this.attr('data-color');
      _setMenuColorBackgroundColor(_color);

      kalei.settings.set('drawLineColor', _color);
    };

    var _onChangeOpacity = function (opacity) {
      var _opacity = opacity;
      if (_opacity > 1) {
        _opacity = _opacity / 100;
      }
      kalei.settings.set('drawOpacity', _opacity);
    };

    var _onChangeLayoutLinesCount = function (circlePortions) {
      kalei.settings.set('layoutLinesCount', circlePortions);
      kalei.canvas.redraw();
      $('#repeatSectionCountDisplay').text(circlePortions);
    };

    var _savingButtonLoadingMode = function (bool) {
      if (bool) {
        $('#save svg').hide();
        $('#save .loading').css('display', 'inline-block');
        $('#save').addClass('saving');
      } else {
        $('#save svg').show();
        $('#save .loading').hide();
        $('#save').removeClass('saving');
      }
    };

    var _openCloseMenu = function (panelName) {
      _panelWidth = kalei.interface.isInSmallRes()
        ? kalei.canvas.getCanvasSize().w / 1.1
        : kalei.canvas.getCanvasSize().w / 2;

      $('#subMenuWrapper').width(_panelWidth);

      // Close
      if (
        typeof panelName == 'undefined' ||
        (_isOpen && panelName == _currentPanel)
      ) {
        _isOpen = false;
        _currentPanel = '';

        $('#subMenuWrapper').animate(
          {
            left: -_panelWidth + 'px',
          },
          250,
          'swing'
        );
      }

      // Open or change
      else {
        // Check if a panel from the header is already open
        if (kalei.header.getCurrentPanel != '') {
          kalei.header.openCloseMenu();
        }

        _currentPanel = panelName;

        /*
				// REadusjt the colors sizes
				if (_currentPanel === 'drawColorsPanel') {
					var _colorHeight = (kalei.canvas.getCanvasSize().h - 160 - (50 * 2)) / 13;
					$('.kaleiColorPick').outerHeight(_colorHeight);
				}
				*/

        if (_isOpen) {
          $('#subMenuWrapper .kaleiPanel').slideUp('fast');
          $('#' + _currentPanel).slideDown('fast');
        } else {
          $('#subMenuWrapper .kaleiPanel').hide();
          $('#' + _currentPanel).show();
        }
        _isOpen = true;

        $('#subMenuWrapper').animate(
          {
            left: 0,
          },
          250,
          'swing'
        );
      }
    };

    var _showShareOnFacebookButton = function () {
      $('#shareOnFacebook').show();
    };

    var _hideShareOnFacebookButton = function () {
      $('#shareOnFacebook').hide();
    };

    var _showReplayButton = function () {
      //$('#replay').show();
    };

    var _hideReplayButton = function () {
      //$('#replay').hide();
    };

    var _showCommentButton = function () {
      $('#commentKalei').show();
      $('#commentsBadge')
        .addClass('fb-comments-count')
        .attr(
          'data-href',
          kalei.settings.get('ROOT_URL') + '/guid/' + kalei.canvas.getGUID()
        );
      FB.XFBML.parse();
    };

    var _hideCommentButton = function () {
      $('#commentKalei').hide();
    };

    var _showLikeButton = function (likeCount) {
      if (typeof likeCount != 'undefined') {
        _updateLikeCount(likeCount);
      }
      $('#likeKalei').show();
    };

    var _updateLikeCount = function (likeCount) {
      if (likeCount > 0) {
        $('#likesBadge').text(likeCount).show();
      } else {
        $('#likesBadge').text('').hide();
      }
    };

    var _setBgColorLikeButton = function (likeBoolean) {
      // If current user is not connected
      if (kalei.connect.account().userID === null) {
        $('#likeKalei').removeClass('currentUserLikes');
      } else {
        // User liked
        if (likeBoolean) {
          $('#likeKalei').addClass('currentUserLikes');
        } else {
          $('#likeKalei').removeClass('currentUserLikes');
        }
      }
    };

    var _hideLikeButton = function () {
      $('#likeKalei').hide();
    };

    var _likeKalei = function () {
      var _guid = kalei.canvas.getGUID();

      // Check if user is connected
      if (kalei.connect.account().login) {
        $('#likeKalei').addClass('noClick');

        kalei.services.likeKalei(_guid).then(
          function (data) {
            var message = JSON.parse(data).message;
            var currentLikeCount = parseInt(JSON.parse(data).data);

            // User liked
            if (message === 'LIKE SAVED') {
              _setBgColorLikeButton(true);
              $('#likeKalei').attr('data-tooltip', 'Unlike');
            } else if (message === 'UNLIKE SAVED') {
              _setBgColorLikeButton(false);
              $('#likeKalei').removeClass('currentUserLikes');
              $('#likeKalei').attr('data-tooltip', 'Like');
            }

            // Likes count
            if (currentLikeCount > 0) {
              $('#likeKalei #likesBadge').text(currentLikeCount).show();
            } else {
              $('#likeKalei #likesBadge').text('').hide();
            }

            $('#likeKalei').removeClass('noClick');
          },
          function (error) {
            Materialize.toast(JSON.parse(error.responseText).message, 3000);
            console.log(JSON.parse(error.responseText));
          }
        );
      }

      // User is not connected
      else {
        swal(
          {
            title: 'Ooooooooops...',
            text: 'You need to be logged in to like this Kaleï!',
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

    var _bindMenuEvents = function () {
      // Draw colors
      $('#menuWrapper #drawColors').on(
        kalei.interface.eventsName.click,
        function () {
          _openCloseMenu('drawColorsPanel');
        }
      );

      $('.kaleiColorPick').on(
        kalei.interface.eventsName.realClick,
        function () {
          _openCloseMenu();
          _clickOnDrawColor($(this));
        }
      );

      $('#rangeOpacity').on('change', function () {
        _onChangeOpacity($(this).val() / 100);
      });

      $('#changeLayoutLinesCount').on('change', function () {
        _onChangeLayoutLinesCount($(this).val());
      });

      // Draw sizes
      $('#menuWrapper #drawSize').on(
        kalei.interface.eventsName.click,
        function () {
          _openCloseMenu('drawSizePanel');
        }
      );

      // Select Draw sizes
      $('.aSizeSelector').on(kalei.interface.eventsName.realClick, function () {
        _openCloseMenu();
        _clickOnDrawSize($(this).attr('data-draw-size-name'));
      });

      // Close panel button
      $('#subMenuWrapper .closePanel').on(
        kalei.interface.eventsName.click,
        function () {
          _openCloseMenu();
        }
      );

      // Download
      $('#download a').on(kalei.interface.eventsName.click, function () {
        $(this)
          .attr('download', 'Kalei-' + new Date().getTime() + '.png')
          .attr('href', kalei.canvas.canvas.toDataURL('image/png'));
        Materialize.toast(
          'Youhou !! Check your Download folder to get the image! ',
          3000
        ); // 4000 is the duration of the toast
      });

      // Cancel
      $('#cancel').on(kalei.interface.eventsName.click, function () {
        kalei.canvas.ctrlZ();
      });

      // Save
      $('#save').on(kalei.interface.eventsName.click, function () {
        kalei.canvas.save();
      });

      // Options
      $('#options').on(kalei.interface.eventsName.click, function () {
        _openCloseMenu('optionsPanel');
      });

      // shareOnFacebook
      $('#shareOnFacebook').on(kalei.interface.eventsName.click, function () {
        kalei.connect.shareOnFacebook();
      });

      // likeKalei
      $('#likeKalei').on(kalei.interface.eventsName.click, function () {
        _likeKalei();
      });

      // Comment Kalei
      $('#commentKalei').on(kalei.interface.eventsName.click, function () {
        kalei.header.openCommentPopup(kalei.canvas.getGUID());
      });

      // Replay Kalei
      $('#replay').on(kalei.interface.eventsName.click, function () {
        kalei.canvas.replay();
      });

      // Mirror Effect
      $('#mirrorEffect').on(kalei.interface.eventsName.click, function () {
        _setMirrorEffect($(this).is(':checked'));
      });

      /*
			// Stop propagation on scroll
			$('#subMenuContentWrapper')
			.on('touchmove', function (e) {
				e.stopPropagation();
				e.stopImmediatePropagation();
				//e.preventDefault();
			});
			*/
    };

    _start();

    return {
      openCloseMenu: function (panelName) {
        return _openCloseMenu(panelName);
      },
      savingButtonLoadingMode: function (bool) {
        return _savingButtonLoadingMode(bool);
      },
      showShareOnFacebookButton: function () {
        return _showShareOnFacebookButton();
      },
      showCommentButton: function () {
        return _showCommentButton();
      },
      showLikeButton: function (likeCount) {
        return _showLikeButton(likeCount);
      },
      showReplayButton: function () {
        return _showReplayButton();
      },
      hideShareOnFacebookButton: function () {
        return _hideShareOnFacebookButton();
      },
      hideCommentButton: function () {
        return _hideCommentButton();
      },
      hideLikeButton: function () {
        return _hideLikeButton();
      },
      hideReplayButton: function () {
        return _hideReplayButton();
      },
      setBgColorLikeButton: function (bool) {
        return _setBgColorLikeButton(bool);
      },
      getCurrentPanel: function () {
        return _currentPanel;
      },
      setMirrorEffect: function (bool) {
        return _setMirrorEffect(bool);
      },
    };
  })();
});
