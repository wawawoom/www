$(function () {
  kalei.header = (function () {
    var _isOpen = false;
    var _currentPanel = '';
    var _panelWidth = kalei.canvas.getCanvasSize().w / 2;

    var _start = function () {
      _bindMenuEvents();

      $('#subHeader').css('right', -_panelWidth + 'px');
      $('#subHeader').width(_panelWidth);
    };

    var _openCloseMenu = function (panelName) {
      _panelWidth = kalei.interface.isInSmallRes()
        ? kalei.canvas.getCanvasSize().w / 1.1
        : kalei.canvas.getCanvasSize().w / 2;

      $('#subHeader').width(_panelWidth);

      // Close
      if (
        typeof panelName == 'undefined' ||
        (_isOpen && panelName == _currentPanel)
      ) {
        _isOpen = false;
        _currentPanel = '';

        $('#subHeader').animate(
          {
            right: -_panelWidth + 'px',
          },
          250,
          'swing'
        );
      }

      // Open or change
      else {
        // Check if a panel from the header is already open
        if (kalei.menu.getCurrentPanel != '') {
          kalei.menu.openCloseMenu();
        }

        _currentPanel = panelName;

        if (_isOpen) {
          $('#subHeader .kaleiPanel').slideUp('fast');
          $('#' + _currentPanel + 'Panel').slideDown('fast');
        } else {
          $('#subHeader .kaleiPanel').hide();
          $('#' + _currentPanel + 'Panel').show();
        }
        _isOpen = true;

        $('#subHeader').animate(
          {
            right: '0',
          },
          250,
          'swing'
        );
      }
    };

    var _updateGalleryPanel = function () {
      $.get('inc/gallery.php').done(function (data) {
        $('#galleryPanel').replaceWith(data);
        $('#galleryPanel .collapsible').collapsible();
        $('#galleryPanel .tabs').tabs();
      });
    };

    var _deleteKalei = function (guid) {
      var _guid = guid;

      swal(
        {
          title: 'Are you sure?',
          text: 'You want to delete this Kaleï ?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#03a9f4',
          confirmButtonText: 'Yes, delete!',
          closeOnConfirm: true,
        },
        function () {
          kalei.services.removeKalei(_guid).then(
            function (data) {
              Materialize.toast(JSON.parse(data).message, 3000);
              $('.aKaleiGalleryWrapper[data-guid="' + _guid + '"]').slideUp(
                500,
                function () {
                  // Check if there is some kaleis
                  // Or if the user deletes the last kalei
                  var _parentDiv = $(this).parent();
                  $(this).remove();

                  if ($('.aKaleiGalleryWrapper').length === 0) {
                    _parentDiv.html(
                      '<div class="card-panel light-blue">Make your first Kaleï and save it to see it in your Kaleïs !</div>'
                    );
                  }

                  // If the deleted Kalei was the current Kalei
                  // We need to hide the facebook share button
                  if (_guid === kalei.canvas.getGUID()) {
                    kalei.menu.hideShareOnFacebookButton();
                  }
                }
              );
            },
            function (error) {
              Materialize.toast(JSON.parse(error.responseText).message, 3000);
              console.log(JSON.parse(error.responseText));
            }
          );
        }
      );
    };

    var _likeKalei = function (guid, elm) {
      var $this = elm;
      $this.addClass('noClick');

      kalei.services.likeKalei(guid).then(
        function (data) {
          var message = JSON.parse(data).message;
          var currentLikeCount = parseInt(JSON.parse(data).data);

          // User liked
          if (message === 'LIKE SAVED') {
            $this.addClass('like');
            $this.find('.likeLabel').text('Unlike');
          } else if (message === 'UNLIKE SAVED') {
            $this.removeClass('like');
            $this.find('.likeLabel').text('Like');
          }

          // Likes count
          if (currentLikeCount > 0) {
            $this.find('.likeCount').text('(' + currentLikeCount + ')');
          } else {
            $this.find('.likeCount').text('');
          }

          $this.removeClass('noClick');
        },
        function (error) {
          Materialize.toast(JSON.parse(error.responseText).message, 3000);
          console.log(JSON.parse(error.responseText));
        }
      );
    };

    var _loadKalei = function (guid) {
      _openCloseMenu();

      kalei.services.loadKalei(guid).then(
        function (data) {
          // data est déjà un objet JavaScript (parsing automatique par jQuery avec dataType: 'json')
          var message = data.message;
          var kaleiData = data.data[0];
          var kaleiSettings = JSON.parse(kaleiData.KAL_Settings);

          if (typeof kaleiData != 'undefined') {
            // SAVE AND RESTORE THE SECTION NUMBER COUNT
            kalei.canvas.setGUID(guid);
            kalei.canvas.setAuthorID(kaleiData.KAL_USE_FacebookID);
            kalei.canvas.setPoints(JSON.parse(kaleiData.KAL_Data));
            //kalei.canvas.redraw();

            // Update the input range sections count
            $('#changeLayoutLinesCount')
              .val(parseInt(kaleiSettings.layoutLinesCount, 10))
              .change();

            // UPdate mirror effect
            kalei.menu.setMirrorEffect(kaleiSettings.mirrorEffect);

            // Show buttons
            kalei.menu.showShareOnFacebookButton();
            kalei.menu.showLikeButton(parseInt(kaleiData.LikeCount, 10));
            kalei.menu.setBgColorLikeButton(kaleiData.currentUserLike);
            kalei.menu.showCommentButton();
            kalei.menu.showReplayButton();

            swal.close();
          } else {
            swal('Ooooooooops !', "This Kaleï doesn't exists...", 'warning');
          }
        },

        function (error) {
          kalei.canvas.setKaleiGuidToLoad(null);

          // If error 404, because the kalei does not exists anymore
          // Inform the user
          if (error.status === 404) {
            swal(
              {
                title: 'Ooooooooops !',
                text: ":( This Kaleï doesn't exists...",
                type: 'warning',
                confirmButtonText: 'OK, then create a new one :)',
              },
              function () {
                window.location.href = kalei.settings.get('ROOT_URL') + '/';
              }
            );
          } else {
            Materialize.toast(JSON.parse(error.responseText).message, 3000);
            console.log(JSON.parse(error.responseText));
          }
        }
      );
    };

    var _openCommentPopup = function (guid) {
      swal({
        title: "Loading Kaleï's comments",
        type: 'info',
        showConfirmButton: false,
        html: true,
        text: '<div class="preloader-wrapper big active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>',
      });

      $.get('inc/comment.php?KAL_GUID=' + guid, function (data) {
        swal.close();

        kalei.Popup.open({
          isClosable: true,
          HTML: data,
          onCloseFunction: function () {
            FB.XFBML.parse();
          },
        });
      });
    };

    var _bindMenuEvents = function () {
      // about
      $('header #about').on(kalei.interface.eventsName.click, function () {
        _openCloseMenu('about');
      });

      // contact
      $('header #contact').on(kalei.interface.eventsName.click, function () {
        _openCloseMenu('contact');
      });

      // gallery
      $('header #gallery').on(kalei.interface.eventsName.click, function () {
        _openCloseMenu('gallery');
      });

      // about
      $('header #connect').on(kalei.interface.eventsName.click, function () {
        _openCloseMenu('connect');
      });

      // Close panel button
      $('#subHeader .closePanel').on(
        kalei.interface.eventsName.click,
        function () {
          _openCloseMenu();
        }
      );

      // Delete a kalei
      $('#subHeader').on(
        kalei.interface.eventsName.click,
        '.deleteKalei',
        function () {
          var _guid = $(this)
            .closest('.aKaleiGalleryWrapper')
            .attr('data-guid');
          _deleteKalei(_guid);
        }
      );

      // Like a kalei
      $('#subHeader').on(
        kalei.interface.eventsName.click,
        '.likeKalei',
        function () {
          var _guid = $(this)
            .closest('.aKaleiGalleryWrapper')
            .attr('data-guid');
          _likeKalei(_guid, $(this));
        }
      );

      // Comment a kalei
      $('#subHeader').on(
        kalei.interface.eventsName.click,
        '.commmentKalei',
        function () {
          var _guid = $(this)
            .closest('.aKaleiGalleryWrapper')
            .attr('data-guid');
          _openCommentPopup(_guid);
        }
      );
    };

    _start();

    return {
      openCloseMenu: function (panelName) {
        return _openCloseMenu(panelName);
      },
      getCurrentPanel: function () {
        return _currentPanel;
      },
      updateGalleryPanel: function () {
        return _updateGalleryPanel();
      },
      loadKalei: function (guid) {
        _loadKalei(guid);
      },
      openCommentPopup: function (guid) {
        _openCommentPopup(guid);
      },
    };
  })();
});
