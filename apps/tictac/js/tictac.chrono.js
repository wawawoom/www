

$(function () {

	tictac.Chrono = function () {


		// ###############
		// Private properties
		// ###############

		var milliCount = 0 // milliseconds
		var timerInt;
		var intervalValue = 1000;
		var newTimeValue = '00:00:00';
		var _isRunning = false;
		var _isInPause = false;
		var _taskId = null;
		var _realTimeStart;
		var _timeSessions = [];
		
		// ###############
		// Private methods
		// ###############
		
		var _msToTime = function(m) {
			var ms = m % 1000;
			m = (m - ms) / 1000;
			var secs = m % 60;
			if (secs < 10) {
				_secs = '0' + secs;
			} else {
				_secs = secs;
			}
			
			m = (m - secs) / 60;
			var mins = m % 60;
			if (mins < 10) {
				_mins = '0' + mins;
			} else {
				_mins = mins;
			}
			
			var hrs = (m - mins) / 60;
			if (hrs < 10) {
				_hrs = '0' + hrs;
			} else {
				_hrs = hrs;
			}
			
			//var days = (m - hrs) / 24;

			//return hrs + ':' + mins + ':' + secs + '.' + ms;
			return _hrs + ':' + _mins + ':' + _secs;
		}
		
		var _timeToMs = function(s) {

			var _milli = 0;
			
			var _a = s.split(":");
			var _h = parseInt(_a[0]) * 60 * 60;
			var _m = parseInt(_a[1]) * 60;
			var _s = parseInt(_a[2]);
			
			_milli = (_h + _m + _s) * 1000;
			
			return _milli;
			
		}
		
		var _updateChrono = function() {
			
			var countTotal = 0;
			for(var i = 0; i < _timeSessions.length; i++) {
			    countTotal += _timeSessions[i];
			}

			milliCount = countTotal;
			
			milliCount = milliCount + new Date().getTime() - _realTimeStart;

			//milliCount += intervalValue;
			$('#chrono').text(_msToTime(milliCount));
		}
		
		var _pause = function () {
			console.log('_pause');
			
			_timeSessions.push (new Date().getTime() - _realTimeStart);
			
			//_isRunning = false;
			_isInPause = true; 
			$('#start').css('display', 'block');
			$('#pause').hide();
			$('#stop').css('display', 'block');
			clearInterval(timerInt);
		}
		
		/*
		var _unpause = function () {
			console.log('_unpause');
			//_isRunning = true;
			$('#start').hide();
			$('#stop').css('display', 'block');
			timerInt = setInterval(function() {_updateChrono();}, intervalValue);
		}
		*/
		
		var _start = function () {
			
			// Check if _taskId is not null
			if (hasValue(_taskId)) {
				if (!_isInPause) {
					milliCount = 0;
				} else {
					_isInPause = false;
				}
				_realTimeStart = new Date().getTime();
				_isRunning = true;
				$('#start').hide();
				$('#stop').css('display', 'block');
				$('#pause').css('display', 'block');
				
				$('#taskListWrapper ul li.selected .startTask').hide();
				$('#taskListWrapper ul li.selected .stopTask').show();
				
				console.log(_taskId);
				
				// Send START to mysql
				tictac.Factory.ajax (
					'startChrono', 
					{TAS_Id:_taskId},
					function(o) {
						console.log(o);
						// Start Chrono
						timerInt = setInterval(
							function() {
								_updateChrono();
							}, intervalValue
						);
					}
				);
			} else {
				// select first Task in list
			}
			
			
			
		}
		
		var _stop = function (callbackSuccess) {
			
			$('#start').css('display', 'block');
			$('#pause').hide();
			$('#stop').hide();
			clearInterval(timerInt);
			
			$('#taskListWrapper ul li.selected .startTask').show();
			$('#taskListWrapper ul li.selected .stopTask').hide();
		
			var stopPopup = new tictac.Popup(
				{
					title:'Add a comment ?', 
					width: 600,
					isClosable:false,
					bindKeyPress: false,
					urlToLoad: 'ajax/stopTimer.html',
					buttons:
					[
						{buttonLabel:'Ok', buttonClass: 'btn-success', buttonFunction:
							function() {
								
								var _h = $('select[name="hours"]').val();
								var _m = $('select[name="minutes"]').val();
								var _s = $('select[name="seconds"]').val();
								
								if (!hasValue(_h)) {
									_h = '00';
								} else {
									if (parseInt(_h) < 10) {
										_h = '0' + _h;
									}
								}	
								
								if (!hasValue(_m)) {
									_m = '00';
								} else {
									if (parseInt(_m) < 10) {
										_m = '0' + _m;
									}
								}
								
								if (!hasValue(_s)) {
									_s = '00';
								} else {
									if (parseInt(_s) < 10) {
										_s = '0' + _s;
									}
								}
								
								var _timeEdited = _h + ':' + _m + ':' + _s;				
								_timeEdited = _timeToMs(_timeEdited);
								
								// Send STOP to mysql
								tictac.Factory.ajax (
									'stopChrono', 
									{
										TAS_Id : _taskId,
										TIM_Duration : _timeEdited / 1000,
										TIM_Comment : $.trim($('#TIM_Comment').val())
									},
									function(o) {
										
										// Stop Chrono
										clearInterval(timerInt);
										_isRunning = false;
										$('#start').show();
										$('#stop').hide();
										$('#chrono').text(newTimeValue);
										tictac.Core.pushTime(milliCount);
										milliCount = 0;
										_timeSessions = [];
										_realTimeStart = null;
										
										// Refresh logged times if it's showed in the task list
										if ($('li[data-task-id=' + _taskId + ']').hasClass('detailed')) {
											$('li[data-task-id=' + _taskId + ']').find('.timesList').slideUp(
												function() {
													$(this).remove();
												}
											);
											tictac.Tasks.loadTimesList($('li[data-task-id=' + _taskId + ']'), _taskId);
										}
										
										stopPopup.close();
										
										if (hasValue(callbackSuccess)) {
											callbackSuccess();
										}
									}
								);
				
							}
						}
					]
				}
			);

		
			
			
		}
		
		var _reset = function () {
			console.log('_reset');
			clearInterval(timerInt);
			_isRunning = false;
			$('#start').show();
			$('#stop').hide();
			$('#chrono').text(newTimeValue);
			milliCount = 0;
			_timeSessions = [];
			_realTimeStart = null;
			_hideControllers();
		}
		
		var _setTaskId = function (taskId) {
			_taskId = taskId;
		}
		
		var _hideControllers = function () {
			$('#chronoControllers').hide();
			$('#chrono').css('opacity', 0.15);
		}
		
		var _showControllers = function () {
			$('#chronoControllers').show();
			$('#chrono').css('opacity', 1);
		}
		
		var _init = function () {
			
			// Bind events Chrono
			$('#start')
			.off('click')
			.on('click', function() {
				_start();
			});
			
			$('#pause')
			.off('click')
			.on('click', function() {
				_pause();
			});
			
			$('#stop')
			.off('click')
			.on('click', function() {
				_stop();
			});
			
			// On close window
			$(window).on("beforeunload", function(e) { 
				if (_isRunning) {
					e.preventDefault();	
					_stop();
				}
			});
			
		}
		
		_init();
		
		
		// ##################### //
		// PUBLIC METHODS
		// ##################### //
		return {
			reset: function () {
				_reset();
			},
			pause: function () {
				_pause();
			},
			start: function () {
				_start();
			},
			stop: function (callbackSuccess) {
				_stop(callbackSuccess);
			},
			isRunning: function () {
				return _isRunning;
			},
			setTaskId: function (taskId) {
				_setTaskId(taskId);
			},
			getTaskId : function () {
				return _taskId;
			},
			showControllers: function () {
				_showControllers();
			},
			hideControllers: function () {
				_hideControllers();
			},
			getDuration : function () {
				return milliCount;
			},
			msToTime : function (m) {
				return _msToTime(m);
			},
			getSessions: function() {
				return _timeSessions;
			}
			
		} 

	} ();

});
