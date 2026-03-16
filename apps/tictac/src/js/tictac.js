var tictac = {};

$(function () {

	tictac.Core = function () {


		// ###############
		// Private properties
		// ###############
		var _times = new Array();
		
		var base = this;


		// ###############
		// Private methods
		// ###############
		var _pushTime = function (m) {
			_times.push(m);
		}
		
		var _init = function () {
				
		}
		
		
		// ##################### //
		// PUBLIC METHODS
		// ##################### //
		return {
			pushTime : function (m) {
				_pushTime(m);
			},
			getTimes : function() {
				return _times;
			}
			
		}

	} ();

});

