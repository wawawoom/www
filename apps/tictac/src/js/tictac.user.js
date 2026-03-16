$(function () {

	tictac.User = function () {


		// ###############
		// Private properties
		// ###############
		var _USE_Email;
		
		// ###############
		// Private methods
		// ###############
		var _login = function (email, password) {
			
			// Start
			tictac.Factory.ajax (
				'login', 
				{
					USE_Email: email,
					USE_Password: password
				},
				function(o) {
				
					// LOGIN SUCCESS
					if (o == true) {
						document.location.href = "tictac.php";
						
					// LOGIN FAIL
					} else {
					
						var errorLoginPopup = new tictac.Popup(
							{
								title:'Error :', 
								width: 600,
								isClosable:true,
								message: 'Sorry, but we can\'t log you with those credentials. Please try again.',
								buttons:
								[
									{
										buttonLabel:'OK', 
										buttonClass:'btn-warning', 
										buttonFunction:function() {
											errorLoginPopup.close();
										}
									}
								]
							}
						);
					}
				}
			);
			
		}
		
		
		var _register = function (email, password) {
			
			// Start
			tictac.Factory.ajax (
				'register', 
				{
					USE_Email: email,
					USE_Password: password
				},
				function(o) {
				
					// REGISTER SUCCESS
					if (o == true) {
						document.location.href = "tictac.php";
						
					// REGISTER FAIL
					} else {
					
						var errorRegisterPopup = new tictac.Popup(
							{
								title:'Error :', 
								width: 600,
								isClosable:true,
								message: o,
								buttons:
								[
									{
										buttonLabel:'OK', 
										buttonClass:'btn-warning', 
										buttonFunction:function() {
											errorRegisterPopup.close();
										}
									}
								]
							}
						);
					}
				}
			);
			
		}
		
		
		
		
		var _bindEvents = function() {
			
			
			$('#loginButton')
			.on('click', function() {
				
				var loginPopup = new tictac.Popup(
					{
						title:'Login form', 
						width: 600,
						isClosable:true,
						urlToLoad: 'ajax/login.html',
						buttons:
						[
							{
								buttonLabel:'Login', 
								buttonClass:'btn-success', 
								buttonFunction:function() {
									
									var email = $.trim($('#USE_Email').val());
									var password = $.trim($('#USE_Password').val());
									_login(email, password);
									
								}
							},
							{
								buttonLabel:'Cancel',  
								buttonFunction:function() {
									loginPopup.close();
								}
							}
						]
					}
				);
				
			});
			
			
			$('#registerButton')
			.on('click', function() {
				
				var registerPopup = new tictac.Popup(
					{
						title:'Register form', 
						width: 600,
						isClosable:true,
						urlToLoad: 'ajax/register.html',
						buttons:
						[
							{
								buttonLabel:'Register', 
								buttonClass:'btn-info', 
								buttonFunction:function() {
									
									var email = $.trim($('#USE_Email').val());
									var password = $.trim($('#USE_Password').val());
									_register(email, password);
									
								}
							},
							{
								buttonLabel:'Cancel',  
								buttonFunction:function() {
									registerPopup.close();
								}
							}
						]
					}
				);
				
			});
			
		} ();
	
		// ##################### //
		// PUBLIC METHODS
		// ##################### //
		return {
			
		}

	} ();

});

