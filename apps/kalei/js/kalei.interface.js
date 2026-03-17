$(function() {

	kalei.interface = function () {

		var _isTouchDevice = function() {
			return 'ontouchstart' in window        // works on most browsers 
				|| navigator.maxTouchPoints;       // works on IE10/11 and Surface
		};

		var _eventsName = {
			down: _isTouchDevice() ? 'touchstart' : 'mousedown',
			move: _isTouchDevice() ? 'touchmove' : 'mousemove',
			up: _isTouchDevice() ? 'touchend' : 'mouseup',
			leave: _isTouchDevice() ? 'touchend' : 'mouseleave',
			click: _isTouchDevice() ? 'touchend' : 'click',
			realClick: _isTouchDevice() ? 'click' : 'click'
		}

		var _resize = function () {

			$('#mainWrapper').height(
				(window.innerHeight > 0) ? window.innerHeight - kalei.settings.get('headerHeight') : screen.height - kalei.settings.get('headerHeight')
			);

			$('#subMenuWrapper, #subHeader')
			.height(
				(window.innerHeight > 0) ? window.innerHeight - kalei.settings.get('headerHeight')  - kalei.settings.get('menuHeight') : screen.height - kalei.settings.get('headerHeight') - kalei.settings.get('menuHeight')
			)
			.width(
				_isInSmallRes() ? window.innerWidth / 1.1 : window.innerWidth / 2
			);

			
			if (kalei.header.getCurrentPanel() === '') {
				$('#subHeader').css('right', _isInSmallRes() ? -(window.innerWidth / 1.1) : -(window.innerWidth / 2));
			}
			else {
				$('#subHeader').css('right', 0);
			}

			if (kalei.menu.getCurrentPanel() === '') {
				$('#subMenuWrapper').css('left', _isInSmallRes() ? -(window.innerWidth / 1.1) : -(window.innerWidth / 2));
			}
			else {
				$('#subMenuWrapper').css('left', 0);
			}
			
		}

		var _bindEvents = function () {
			$(window).on('resize', function () {
				_resize();
				kalei.canvas.redraw();
			});

			$(document).on('keydown', function(e) {
				if (e.keyCode == 90 && (e.ctrlKey || e.metaKey)) {
					kalei.canvas.ctrlZ();
				}
			});

			$(window).on('orientationchange',function(event){
				_resize();
			});


		}

		var _isInSmallRes = function () {
			return window.innerWidth <= 767;
		}

		var init = function () {
			_bindEvents();
		} () ;

		return {
			isTouchDevice: function () {
				return _isTouchDevice();
			},
			isInSmallRes: function () {
				return _isInSmallRes();
			},
			resize: function () {
				return _resize();
			},
			eventsName: _eventsName
		}

	} () ;

});