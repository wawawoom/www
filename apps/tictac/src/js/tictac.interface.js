$(function () {

	tictac.Interface = function () {
		
		// When resize window
		var _resize = function () {
			
			// Position Chrono DIV
			var y = -($('#chrono').height()/2);
			var w = $('#chronoWrapper').width();
			var fs = w / 6;
			
			$('#chrono')
			.css('margin-top', y)
			.css('width', w)
			.css('font-size', fs);
			
			// Size Divs
			var h = $(window).height() - $('#header').height();
			$('#taskListWrapper').height(h);
			$('#chronoWrapper').height(h);
			
		}
				
		// Bind Events
		var _bindEvents = function () {
			$(window)
			.on('resize', function() {
				_resize();
			});
			
		}
		
		var _init = function () {
			_bindEvents();
			_resize();
		} ();
		
		
		// RETURN OBJECT
		return {
			forceResize : function() {
				_resize();
			}
		}
		
	} ();
	
});
