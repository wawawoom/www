// Load the SDK asynchronously
(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = '//connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

$(function () {
  kalei.connect = (function () {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '1867792813440028',
        cookie: true, // enable cookies to allow the server to access
        xfbml: true, // parse social plugins on this page
        version: 'v2.8', // use graph api version 2.8
      });

      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.

      FB.getLoginStatus(function (response) {
        _statusChangeCallback(response);
      });
    };

    var _facebook = {
      userID: null,
      picture: null,
      name: null,
      email: null,
      login: false,
    };

    // This is called with the results from from FB.getLoginStatus().
    var _statusChangeCallback = function (response) {
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().

      //_facebook.status = response.authResponse;

      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        FB.api(
          '/me',
          { fields: 'id,name,picture,email,permissions' },
          function (response) {
            _facebook.login = true;
            _facebook.userID = response.id;
            _facebook.name = response.name;
            _facebook.email =
              typeof response.email != 'undefined' ? response.email : '';
            _facebook.picture = response.picture;

            // Here we need to check if this user already exists in DB
            kalei.services.checkUser(_facebook).then(
              function (response) {
                _updateHeaderAccountButton();
                _toggleLoginLogoutButton();

                // Cookies create
                kalei.utils.createCookie('kaleiUserID', _facebook.userID, 1);

                kalei.header.updateGalleryPanel();

                if (kalei.header.getCurrentPanel() === 'connect') {
                  kalei.header.openCloseMenu();
                }

                var _response = JSON.parse(response);

                if (_response.message === 'NEW USER') {
                  Materialize.toast(
                    'Hello ' + _facebook.name + '. Welcome in Kaleï.',
                    3000
                  ); // 4000 is the duration of the toast
                } else {
                  Materialize.toast(
                    'Welcome back in Kaleï ' + _facebook.name + ' !',
                    3000
                  );
                }

                // Load a kalei if needed
                if (kalei.canvas.getKaleiGuidToLoad() !== null) {
                  kalei.header.loadKalei(kalei.canvas.getKaleiGuidToLoad());
                }
              },
              function (error) {
                Materialize.toast(
                  'checkUser Method : ' + error.statusText,
                  3000
                ); // 4000 is the duration of the toast
              }
            );
          }
        );
      } else if (response.status === 'unknown') {
        if (_facebook.name !== null) {
          Materialize.toast('Bye bye ' + _facebook.name + ' !', 3000);
        }

        _facebook.userID = null;
        _facebook.name = null;
        _facebook.picture = null;
        _facebook.login = false;

        _updateHeaderAccountButton();

        kalei.utils.removeCookie('kaleiUserID');
        kalei.header.updateGalleryPanel();
        kalei.menu.hideCommentButton();
        kalei.menu.hideLikeButton();
        kalei.menu.hideShareOnFacebookButton();

        _toggleLoginLogoutButton();

        if (kalei.header.getCurrentPanel() === 'connect') {
          kalei.header.openCloseMenu();
        }

        // Load a kalei if needed
        if (kalei.canvas.getKaleiGuidToLoad() !== null) {
          kalei.header.loadKalei(kalei.canvas.getKaleiGuidToLoad());
        }
      } else {
        if (kalei.canvas.getKaleiGuidToLoad() !== null) {
          kalei.header.loadKalei(kalei.canvas.getKaleiGuidToLoad());
        }
      }

      /*
			else if (response.status === 'not_authorized') {
				
				if (kalei.canvas.getKaleiGuidToLoad() !== null) {
					kalei.header.loadKalei(kalei.canvas.getKaleiGuidToLoad());
				}
			
			} 
			*/
      /*
			else {
			
				// The person is not logged into Facebook, so we're not sure if
				// they are logged into this app or not.
				document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
			
			}
			*/
    };

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.

    /*
		var _checkLoginState = function () {
			//FB.getLoginStatus(function(response) {
			//	_statusChangeCallback(response);
			//});
		}
		*/

    var _toggleLoginLogoutButton = function () {
      if (_facebook.login) {
        $('#wrapperLogout .userName').text(_facebook.name);
        $('#wrapperLogin').hide();
        $('#wrapperLogout').show();
      } else {
        $('#wrapperLogout .userName').text('');
        $('#wrapperLogin').show();
        $('#wrapperLogout').hide();
      }
    };

    var _updateHeaderAccountButton = function () {
      if (_facebook.login) {
        $('#connect i').hide();
        $('#facebookAvatar').attr('src', _facebook.picture.data.url).show();
        $('#connect span').html(_facebook.name);
      } else {
        $('#connect i').show();
        $('#facebookAvatar').attr('src', '').hide();
        $('#connect span').html(kalei.settings.get('connectLabel'));
      }
    };

    var _bindEvents = (function () {
      $('#logInButton').on('click', function () {
        _login();
      });

      $('#logOutButton').on('click', function () {
        _logout();
      });
    })();

    var _login = function () {
      FB.login(
        function (response) {
          _statusChangeCallback(response);
        },
        {
          scope: 'email,publish_actions,public_profile',
        }
      );
    };

    var _logout = function () {
      FB.logout(function (response) {
        _statusChangeCallback(response);
      });
    };

    var _shareOnFacebook = function () {
      FB.ui(
        {
          method: 'share',
          href:
            'https://www.wawawoom.fr/kalei/guid/' +
            kalei.canvas.getGUID() +
            '?d=' +
            new Date().getTime(),
          hashtag: '#mandala',
        },
        // callback
        function (response) {
          debugger;
          if (response && !response.error_message) {
            swal(
              "Thank's for sharing!",
              'The Kaleï was shared on facebook.',
              'success'
            );
          } else {
            swal(
              'Ooooooooops !',
              'There was an error when sharing the Kaleï on Facebook',
              'warning'
            );
          }
        }
      );
    };

    /*
		// Here we run a very simple test of the Graph API after login is
		// successful.  See statusChangeCallback() for when this call is made.
		var _testAPI = function () {
			console.log('Welcome!  Fetching your information.... ');
			FB.api('/me', function(response) {
				console.log(response);
				console.log('Successful login for: ' + response.name);
				document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
			});
		}
		*/

    return {
      account: function () {
        return _facebook;
      },
      shareOnFacebook: function () {
        return _shareOnFacebook();
      },
    };
  })();
});
