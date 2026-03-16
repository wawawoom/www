$(function() {

	tictac.Tooltip = function () {
	
		// ##############
		// Private Variables
		// ##############
		var base = this;
		var _htmlCode = '<div id="tictacTooltip"><div id="tooltipArrow"></div><p><span></span></p></div>';
		var _delay = 400;
		var _openTimeout;
		var _theTitle = '';
		var _theDelay;
		var _xPosTooltip;
		var _yPosTooltip;
		var _isOpen = false;

		// ##############
		// Private Functions
		// ##############
		var _open = function (elem) {

			$('#tictacTooltip p span').text(_theTitle);
			$('#tictacTooltip').css('z-index', getNextHighestZindex());
			/*
			data-tooltip-position="right"
			*/
			
			yPosTooltip = elem.offset().top - $('#tictacTooltip').height() - 7 - $(document).scrollTop();
			
			// Check if Position is specified in HTML code with
			// The "data-tooltip-position" attribute
			if (hasValue(elem.attr('data-tooltip-position'))) {
				
				// RIGHT
				if (elem.attr('data-tooltip-position') == 'right') {
					_xPosTooltip = elem.offset().left + (elem.width()) + 7;
					_yPosTooltip = elem.offset().top + (elem.height() / 2) - ($('#tictacTooltip').outerHeight(false) / 2);

					$('#tooltipArrow')
						.css('display', 'block')
						.css('left', -2)
						.css('bottom', 'auto')
						.css('top', 10);
				}

			} else {
				// AUtomatic poisitonning
				// Tooltip is under Handler
				if (yPosTooltip <= 20) { 
					_xPosTooltip = elem.offset().left + (elem.width() / 2) - ($('#tictacTooltip').outerWidth(false) / 2);
					_yPosTooltip = elem.offset().top + elem.height() + 10;
					
					$('#tooltipArrow')
						.css('display', 'block')
						.css('left', -3 + $('#tictacTooltip').width()/2)
						.css('bottom', 'auto')
						.css('top', -3);
		
				// Tooltip is upper Handler	
				} else {
				
					_xPosTooltip = elem.offset().left + (elem.width() / 2) - ($('#tictacTooltip').outerWidth(false) / 2);
					_yPosTooltip = elem.offset().top - $('#tictacTooltip').height() - 10;
					$('#tooltipArrow')
						.css('display', 'block')
						.css('left', -3 + $('#tictacTooltip').width()/2)
						.css('top', 'auto')
						.css('bottom', -3);

				}
			}

			_isOpen = true;

			//$(this).remove();
			$('#tictacTooltip')
				.css('top', _yPosTooltip)
				.css('left', _xPosTooltip)
				.css('z-index', getNextHighestZindex())
				.show();

		}

		var _close = function () {
			
			_isOpen = false;
			$('#tictacTooltip p span').text('');
			$('#tictacTooltip')
				.css('top', 0)
				.css('left', 0)
				.hide();
			clearTimeout(_openTimeout);
			_theTitle = '';
			
		}
	

		// ##############
		// Init Object events
		// ##############
		var _init = function () {
		
			

			// Bind all tooltip ONLY ON NOT TOUCH DEVICES DUE TO :hover issues
			if (!isTouchDevice()) {
				
				$(_htmlCode).appendTo('body');
				
				$('body')
				.off('mouseenter.tictacTooltip', '.tictacTooltip')
				.on('mouseenter.tictacTooltip', '.tictacTooltip', function (e) {

					
					$(this).attr("data-tooltip-handler", "true");

					var passedElement = $(this);
					_theTitle = $(this).attr("title");
					var _personnalizedDelay = $(this).attr("data-tooltip-delay");
					if (hasValue(_personnalizedDelay)) {
						_theDelay = _personnalizedDelay;
					} else {
						_theDelay = _delay;
					}

					if (hasValue(_theTitle)) {
						$(this).attr("title", "");
						_openTimeout = setTimeout(function () { _open(passedElement) }, _theDelay);
					}
					

				});
		
				$('body')
				.off('mouseleave.tictacTooltip', '.tictacTooltip')
				.on('mouseleave.tictacTooltip', '.tictacTooltip', function (e) {
					
					if (_theTitle != '') {
						$(this).attr("title", _theTitle);
						$(this).removeAttr("data-tooltip-handler");
					}
					_close();
				
				});
		
				// Remove tooltip on click
				$('body')
				.off('mousedown.tictacTooltip', '.tictacTooltip')
				.on('mousedown.tictacTooltip', '.tictacTooltip', function (e) {
				
					if (_theTitle != '') {
						$(this).attr("title", _theTitle);
						$(this).removeAttr("data-tooltip-handler");
					}
					_close();
					
				});
			
				// Remove tooltip on scroll
				$(window)
				.off('scroll.tictacTooltip')
				.on('scroll.tictacTooltip', function (e) {
				
					if (_isOpen) {
						if (_theTitle != '') {
							$('*[data-tooltip-handler="true"]').attr("title", _theTitle);
							$('*[data-tooltip-handler="true"]').removeAttr("data-tooltip-handler");
						}
						_close();
					}
					
				});
			}
		}

		// ##############
		// Start
		// ##############
		_init();

		// ##############
		// Public methods
		// ##############
	
		return {};
	
	}();

});
