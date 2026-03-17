$(function() {

	kalei.Popup = function (o) {

		// ##############
		// Private Variables
		// ##############
		var _o = {
			isClosable: true,
			HTML: 'Hello World',
			onCloseFunction: null
		}
		
		// ##############
		// Private Functions
		// ##############

		var _open = function (o) {
			
			$.extend( _o, o ); // Merge options
			
			// CREATE HTML CODE FOR THE POPUP BOX
			var _htmlCode;
			_htmlCode = '<div class="kaleiPopup" style="z-index:' + kalei.utils.getNextHighestZindex() + '">';
			_htmlCode += '<div class="windowPopup">';
			
			// HIDE OR SHOW THE CLOSE BUTTON
			if (_o.isClosable) {
				_htmlCode += '<span class="closePopup">';
				_htmlCode += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30" enable-background="new 0 0 30 30" xml:space="preserve">';
				_htmlCode += '<path fill="#FFFFFF" d="M16.945,15l8.651-8.651c0.537-0.537,0.537-1.408,0-1.945c-0.537-0.538-1.408-0.538-1.945,0L15,13.054';
				_htmlCode += ' L6.349,4.403c-0.538-0.538-1.408-0.538-1.945,0c-0.538,0.537-0.538,1.408,0,1.945L13.055,15l-8.651,8.65';
				_htmlCode += ' c-0.538,0.537-0.538,1.408,0,1.945c0.269,0.269,0.621,0.403,0.973,0.403s0.704-0.135,0.973-0.403L15,16.944l8.651,8.651';
				_htmlCode += 'c0.269,0.269,0.621,0.403,0.973,0.403s0.704-0.135,0.973-0.403c0.537-0.537,0.537-1.408,0-1.945L16.945,15z"></path>';
				_htmlCode += '</svg>';
				_htmlCode += '</span>';
			}
			_htmlCode += '<div class="messageBoxPopup">' + _o.HTML + '</div>';
			_htmlCode += '</div>';
			_htmlCode += '</div>';

			// APPEND TO HTML
			$('body').append(_htmlCode);
			
			// Bind close button
			$('.kaleiPopup .closePopup')
			.off('click')
			.on('click', function (e) {
				e.stopPropagation();
				_close(_o.onCloseFunction);
			});

			// SHOW THE Popup BOX
			$('.kaleiPopup').css('opacity', 0);
			$('.kaleiPopup').css('display', 'block');
			$('.kaleiPopup').animate({opacity: 1}, 400, function () {});

			// SET FOCUS ON POPUP
			$('html').focus();

		}

		// CLOSE Popup BOX
		var _close = function (fn) {
			
			$('.kaleiPopup').off();
			$('.kaleiPopup').animate({
				opacity: 0
			}, 200, function () {
				$('.kaleiPopup').remove();
			});
			
			if (typeof fn == 'function') {
				fn();
			}
			
		}
		
		
		// ##############
		// Public methods
		// ##############
		return {
			// Close Popup Box
			close: function (fn) {
				_close(fn);
			},

			// Open Popup Box
			open: function (options) {
				_open(options);
			}
		}
	
	
	} () ;

	
});