$(function () {

	tictac.Tasks = function () {
		
		var _t = null;
		var _nbSearchResults = 0;
		var _searchMode = false;
		
		// push HTML tasks
		var _pushTasksHTML = function(o) {
			var html = '';
			
			// If there is more than one task
			if (o.length > 0) {
				for (var i=0 ; i < o.length; i++) {
					html += '<li data-task-id="' + o[i].TAS_Id + '">';
					html += '<span class="taskName">' + o[i].TAS_Name + '</span>';
					html += '<span class="actions">';
					
					html += '<i class="ion-arrow-move moveTask tictacTooltip" title="Reorder task"></i>';
					html += '<i class="ion-navicon detailTask tictacTooltip" title="Show logged time"></i>';
					html += '<i class="ion-ios7-trash-outline deleteTask tictacTooltip" title="Delete task"></i>';
					html += '<i class="ion-ios7-play startTask tictacTooltip" title="Start task"></i>';
					html += '<i class="ion-ios7-close stopTask tictacTooltip" title="Stop task"></i>';
					html += '</span>';
					html += '</li>';
				}
			} else {
				if (!_searchMode) {
					html += '<li id="createFirstTask"><span class="ion-ios7-plus-outline"></span> Click here to create your first task</li>';
				} else {
					// Search mode an dno results found
					html += '<li id="noResultsInSearchMode">No results found</li>';
				}
			}
			
			$('#taskListWrapper ul').empty();
			$('#taskListWrapper ul').append(html);
			
			// check if Chrono has a current Task Id
			var currentTaskId = tictac.Chrono.getTaskId();
			if (hasValue(currentTaskId)) {
				$('#taskListWrapper ul li[data-task-id='+currentTaskId+']').addClass('selected');
			}
			
		}
		
		
		
		
		
		
		// Update tasks list
		var _updateTasks = function (fnSuccess) {
			// Start
			tictac.Factory.ajax (
				'getTasks', 
				null,
				function(o) {

					_pushTasksHTML(o);
					if (typeof fnSuccess == 'function') {
						fnSuccess();
					}
				}
			);	
		}
		
		
		
		// Bind Events
		var _bindEvents = function () {
			
			// Order tasks
			$( "#taskListWrapper ul" ).sortable({
					placeholder: "emptyLi",
					containment: "#taskListWrapper",
					handle: ".moveTask",
					opacity: 0.7,
					stop: function( event, ui ) {
						
						var liArrOrder = [];
						$('#taskListWrapper ul > li').each(function() {
							liArrOrder.push($(this).data('taskId'));
						});
						
						tictac.Factory.ajax(
							'orderTasks',
							{liArrOrder:liArrOrder},
							function(o) {
								
							}
						);
					}
				}
			);
			
			// Open new task
			$('body')
			.on('click', '#taskListWrapper #actions .newTask, #createFirstTask', function(e) {
				
				if(!$('#searchTaskWrapper').is(':hidden')) {
					$('#searchTaskInput').val('');
					$('#searchTaskWrapper').slideUp();
					
					_nbSearchResults = 0;
					_updateTasks();
				}
				
				if($('#newTaskWrapper').is(':hidden')) {
					$('#newTaskWrapper').slideDown();
					$('#newTaskInput').focus();
				}
			});
			
			
			// New task
			$('#newTaskInput')
			.on('keyup', function(e) {
			
				if (e.keyCode == 13) {
					var TAS_Name = $.trim($('#newTaskInput').val());
					if (TAS_Name != '') {
						
						$('#newTaskWrapper .loader16').fadeIn();
						
						tictac.Factory.ajax(
							'newTask',
							{TAS_Name:TAS_Name},
							function(o) {
								$('#newTaskInput').val('');
								_updateTasks(function() {
									$('#newTaskWrapper').slideUp();
									$('#newTaskWrapper .loader16').fadeOut();
								});
								
							}
						);
					}
				}
				
			});
			
			$('#newTaskInput')
			.on('blur', function(e) {
				$('#newTaskInput').val('');
				$('#newTaskWrapper').slideUp();
			});
			
			// Open search task
			$('#taskListWrapper #actions .searchTask')
			.on('click', function(e) {
				_searchMode = true;
				$('#searchTaskWrapper').slideDown();
				$('#searchTaskInput').focus();
			});
			
			// Search task
			$('#searchTaskInput')
			.on('keyup', function(e) {
				
				if (_t != null) {
					clearTimeout(_t);
				}

				// Wait xx ms before launching Search
				_t = setTimeout(function () { 
				
					// Nothing was entered
					// Reset list
					var TAS_Name = $.trim($('#searchTaskInput').val());
					if (TAS_Name == '') {
						$('#searchTaskWrapper .loader16').fadeIn();
						_nbSearchResults = 0;
						_updateTasks(function() {
							$('#searchTaskWrapper .loader16').fadeOut();
						});
					} else {
						$('#searchTaskWrapper .loader16').fadeIn();
						tictac.Factory.ajax (
							'searchTasks', 
							{TAS_Name:TAS_Name},
							function(o) {
								_nbSearchResults = o.length;
								_pushTasksHTML(o);
								$('#searchTaskWrapper .loader16').fadeOut();
							}
						);
					}
				
				}, 300);
				
				
				
			});
			
			$('#searchTaskInput')
			.on('blur', function(e) {
				
				if ($('#searchTaskInput').val() == '') {
					//$('#searchTaskInput').val('');
					$('#searchTaskWrapper').slideUp();
					_searchMode = false;
				}
				
			});
			
			// View all tasks
			$('#taskListWrapper #actions .viewAllTasks')
			.on('click', function(e) {
				_nbSearchResults = 0;
				_updateTasks();
				if (_searchMode) {
					$('#searchTaskInput').val('');
					$('#searchTaskWrapper').slideUp();
				}
			});
			
			// Start a TASK
			$('#taskListWrapper ul')
			.on('click.openTask', '.startTask', function(e) {
				
				function selectNewTask ($this) {
					$('#taskListWrapper ul li').removeClass('selected');
					$this.addClass('selected');
					$('#taskListWrapper ul li.selected .startTask').hide();
					$('#taskListWrapper ul li.selected .stopTask').show();
					var taskId = $this.attr('data-task-id');
					tictac.Chrono.setTaskId(taskId);
					tictac.Chrono.showControllers();
					tictac.Chrono.start();
				}
				
				// check if a task is running
				if (tictac.Chrono.isRunning() && tictac.Chrono.getTaskId() != $(this).closest('li').attr('data-task-id')) {
					var currentTaskId = $('#taskListWrapper ul li.selected').attr('data-task-id');
					$('#taskListWrapper ul li.selected .startTask').show();
					$('#taskListWrapper ul li.selected .stopTask').hide();
					$('#taskListWrapper ul li').removeClass('selected');
					var $this = $(this).closest('li');
					tictac.Chrono.stop(
						function() {
							selectNewTask($this);
						}
					);
				} else {
					selectNewTask($(this).closest('li'));
				}

			});
			
			// Stop a TASK
			$('#taskListWrapper ul')
			.on('click.stopTask', '.stopTask', function(e) {
								
				var currentTaskId = $('#taskListWrapper ul li.selected').attr('data-task-id');
				$('#taskListWrapper ul li.selected .startTask').show();
				$('#taskListWrapper ul li.selected .stopTask').hide();
				var $this = $(this).closest('li');
				
				tictac.Chrono.stop(
					function() {
						if ($this.hasClass('detailed')) {
							$this.find('.timesList').slideUp(
								function() {
									$(this).remove();
								}
							);
						}
					}
				);
			});
			
			// Delete a TASK
			$('#taskListWrapper ul')
			.on('click.deleteTask', '.deleteTask', function(e) {
				
				e.stopPropagation();
				
				var TAS_Id = $(this).closest('li').attr('data-task-id');
				var $this = $(this);
				
				// Pause tictac
				if (tictac.Chrono.isRunning) {
					tictac.Chrono.pause();
				}
				
				var deletePopup = tictac.Popup(
					{
						title:'Please confirm :', 
						width: 600,
						isClosable:false,
						message: 'Are you sure you want to delete this task ?',
						buttons:
						[
							{buttonLabel:'Ok', buttonClass: 'btn-success', buttonFunction:
								function() {
									
									tictac.Factory.ajax(
										'deleteTask',
										{TAS_Id:TAS_Id},
										function(o) {

											// If deleted is current
											if (TAS_Id == tictac.Chrono.getTaskId()) {
												tictac.Chrono.reset();
											} else {
												if (tictac.Chrono.isRunning()) {
													tictac.Chrono.unpause();
												}
											}
											
											deletePopup.close();
											$this.closest('li').slideUp();
											
										}
									);
			
								}
							},
							{buttonLabel:'Cancel', buttonClass: 'btn-default', buttonFunction:
								function() {
									deletePopup.close();
									if (tictac.Chrono.isRunning()) {
										tictac.Chrono.unpause();
									}
								}
							}
						]
					}
				);
				
			});
			
			// Show TASK detail
			$('#taskListWrapper ul')
			.on('click.showDetail', '.detailTask', function(e) {
				
				e.stopPropagation();
				
				// Check if sublist is already open
				var alreadyopen = $(this).closest('li').find('.timesList').length;
				var TAS_Id = $(this).closest('li').attr('data-task-id');
				var $this = $(this);
				var $taskElm = $this.closest('li');
				
				if (alreadyopen > 0) {
					$taskElm.find('.timesList').slideUp('fast', function() {
						$(this).remove();
						$taskElm.removeClass('detailed');
						return;
					});
				} else {
					$taskElm.addClass('detailed');
					_loadTimesList($taskElm, TAS_Id);
				}

			});
			
			// Delete a logged time
			$('#taskListWrapper ul')
			.on('click.deleteLogTime', '.deleteTime', function(e) {
				
				var TIM_Elem = $(this).closest('li');
				var TIM_Id = $(this).closest('li').attr('data-time-id');
				var TAS_Id = $(this).closest('.detailed').attr('data-task-id');
				
				var deleteLogTimePopup = new tictac.Popup(
					{
						title:'Please confirm :', 
						width: 600,
						isClosable:false,
						message: 'Are you sure you want to delete this logged session ?',
						buttons:
						[
							{buttonLabel:'Ok', buttonClass: 'btn-success', buttonFunction:
								function() {
									tictac.Factory.ajax(
										'deleteTime',
										{TIM_Id:TIM_Id, TAS_Id:TAS_Id},
										function(o) {
											deleteLogTimePopup.close();
											TIM_Elem.slideUp(function(){
												// Refresh Total Logged Time for this task
												console.log(TIM_Elem);
												$(this).closest('.timesList').find('.total .totalLogged').text(tictac.Chrono.msToTime(o.TOTAL*1000));
												$(this).remove();
											});
										}
									);
								}
							},
							{buttonLabel:'Cancel', buttonClass: 'btn-default', buttonFunction:
								function() {
									deleteLogTimePopup.close();
								}
							}
						]
					}
				);
				
			});
			
		}
		
		
		var _loadTimesList = function ($taskElm, TAS_Id) {
			tictac.Factory.ajax(
				'getTaskDetail',
				{TAS_Id:TAS_Id},
				function(o) {
				
					var html = '<ul class="timesList" style="display:none;">';
					if (o.length > 0) {
						var tt = 0;
						var liHtml = '';
						for (var i=0 ; i < o.length; i++) {
							var d = o[i].TIM_Duration * 1000;
							tt += d;
							var t = tictac.Chrono.msToTime(d);
							liHtml += '<li data-time-id="' + o[i].TIM_Id + '">';
							
							liHtml += '<table>';
							liHtml += '	<tr>';
							liHtml += '		<td width="15"><i title="Delete" class="glyphicon glyphicon-trash deleteTime tictacTooltip"></i></td>';
							liHtml += '		<td width="55">' + t + '</td>';
							liHtml += '		<td class="comment">' + o[i].TIM_Comment + '</td>';
							liHtml += '		<td width="120"><span class="date">' + dateTimeSqlToFr(o[i].TIM_TimestampStart) + '</span></td>';
							liHtml += '	</tr>';
							liHtml += '</table>';
							
							liHtml += '</li>';
						}
						html += '<li class="total">';
						html += '<span class="glyphicon glyphicon-dashboard totalIcon"></span> <span class="totalLogged">' + tictac.Chrono.msToTime(tt) + '</span>';
						html += '</li>';
						html += liHtml;
					} else {
						html += '<li>nothing was logged at this time</li></ul>';
					}
					
					html += '</ul>';
	
					$taskElm.append(html);
					$taskElm.find('.timesList').slideDown('fast');
				}
			);
		}
		
		
		var _init = function () {
			_bindEvents();
			_updateTasks();
		} ();
		
		
		
		
		
		
		// RETURN OBJECT
		return {
			updateTasks : function(fn) {
				_updateTasks(fn);
			},
			loadTimesList : function(liElm, taskId) {
				_loadTimesList(liElm, taskId);
			},
			getNbSearchResults : function() {
				return _nbSearchResults;
			}
		}
		
	} ();
	
});

