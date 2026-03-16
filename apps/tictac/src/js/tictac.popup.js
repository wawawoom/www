$(function() {

	tictac.Popup = function (o) {

		tictac.Popup.prototype.popupCount++;
		
		// ##############
		// Private Variables
		// ##############
		var _o = {
			isClosable: true,
			title: null,
			urlToLoad: null,
			message: null,
			buttons: null,
			bindKeyPress: true,
			zIndex: getNextHighestZindex(),
			popupType: 'center',
			boxId: 'popupBox' + tictac.Popup.prototype.popupCount
		}
		
		// ##############
		// Private Functions
		// ##############

		var _open = function (o) {
			
			$.extend( _o, o ); // Merge options
			
			// CREATE HTML CODE FOR THE POPUP BOX
			var _htmlCode;
			_htmlCode = '<div class="tictacPopup" id="' + _o.boxId + '" style="z-index:' + _o.zIndex + '">';
			_htmlCode += '<div class="windowPopup">';
			_htmlCode += '<div class="windowTitlePopup">';
			_htmlCode += '<p></p>';
			
			// HIDE OR SHOW THE CLOSE BUTTON
			if (_o.isClosable) {
				_htmlCode += '<span class="glyphicon glyphicon-remove-circle cancelPopup"></span>';
			}
			_htmlCode += '</div>';
			_htmlCode += '<div class="messageBoxPopup"></div>';
			_htmlCode += '<div class="popupButtons">';
			for (var i= 0; i < _o.buttons.length; i++) {
				var buttonLabel = _o.buttons[i].buttonLabel;
				var buttonClass = _o.buttons[i].buttonClass;
				_htmlCode += '<input id="bt' + i + '_' + _o.boxId + '" type="button" class="btn '+ buttonClass + '" value="'+ buttonLabel + '" style="margin-right:20px;" />';
			}
			_htmlCode += '</div>';
			_htmlCode += '</div>';
			_htmlCode += '</div>';

			// APPEND TO HTML
			$('body').prepend(_htmlCode);

			// BIND BUTTONS
			var arrayFunctions = new Array();
			for(var i = 0; i < _o.buttons.length;i++) {
				arrayFunctions.push(_o.buttons[i].buttonFunction);
				$('#bt' + i + '_' + _o.boxId)
				.off('click')
				.on('click', function(e) {
					e.stopPropagation();
					// GET BUTTON NUMBER
					var nb = $(this).attr('id').split('_')[0];
					nb = nb.replace("bt",""); 
					arrayFunctions[Number(nb)]();
				});
			}
			
			
			// Bind Enter Keypress to click on First Button
			if (_o.bindKeyPress) {
				$(document)
				.on('keypress.myPopup' + _o.boxId, function(e) {
					if (e.keyCode == 13) {
						$('.tictacPopup:first #bt0_' + _o.boxId).click();
					}
				});
			}
							
			// Bind close button
			$('#' + _o.boxId + ' .cancelPopup')
			.off('click')
			.on('click', function (e) {
				e.stopPropagation();
				_close();
			});
			
			// ADD THE WINDOW TITLE
			$('#' + _o.boxId + ' .windowPopup p').html(_o.title);
			
			

			// ########################## //
			// INSERT A TEXT IN THE Popup BOX
			if(hasValue(_o.urlToLoad)) {
				$.ajax({
					url: _o.urlToLoad,
					cache: false
				})
				.done(function(data) {
					$('#' + _o.boxId + ' .messageBoxPopup').html(data);
					_centerWindow();
				});
			} else {
				$('#' + _o.boxId + ' .messageBoxPopup').html(_o.message);
			}
		
			// SHOW THE Popup BOX
			$('#' + _o.boxId).css('opacity', 0);
			$('#' + _o.boxId).css('display', 'block');	
			$('#' + _o.boxId).animate({opacity: 1}, 400, function () {});

			// SET FOCUS ON POPUP
			$('html').focus();
			
			// WHEN RESIZE WINDOW, CENTER THE MODAL WINDOW
			$(window)
			.off('resize.tictacPopup')
			.on('resize.tictacPopup', function (event) {
				_centerWindow();
			});

			_centerWindow();

		}

		// CENTER MODAL WINDOW IN SCREEN
		var _centerWindow = function () {
			$('#' + _o.boxId + ' .windowPopup').css('top', (($(window).height() - $('#' + _o.boxId + ' .windowPopup').outerHeight(false)) / 2));
			$('#' + _o.boxId + ' .windowPopup').css('left', (($(window).width() - $('#' + _o.boxId + ' .windowPopup').outerWidth(false)) / 2));
		}

		// CLOSE Popup BOX
		var _close = function (fn) {
	    	
	    	tictac.Popup.prototype.popupCount--;
	    	
			$('#' + _o.boxId).off();
			$(document).off('keypress.myPopup' + _o.boxId);
		
			$('#' + _o.boxId).animate({
				opacity: 0
			}, 200, function () {
				$('#' + _o.boxId).remove();
			});
	    
			if (typeof fn == 'function') {
				fn();
			}
			
		}
		
		// START
		_open(o);
		
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
			},

			//Loading Mode
			loadingMode: function () {
				$('#' + _o.boxId + ' .popupButtons').hide();
				$('#' + _o.boxId + ' .cancelPopup').hide();
				$('#' + _o.boxId + ' .messageBoxPopup').html('<div class="loadingModeWrapper"><div class="loadingModeLoader"></div><p>Loading</p></div>');
			}
		}
	
	
	};
	
	// PROTOTYPE
	tictac.Popup.prototype.popupCount = 0;
	
});