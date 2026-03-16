$(function () {

	tictac.Factory = function () {
		
		// Private Variables.
		var phpFactoryUrl = 'inc/factory.php';
		var jqXhr;
		
		var _sendRequest = function (fnName, o, successMethod) {
			
			var _post = {
				fnName : fnName,
				params : o
			};
			
			$.ajax(
				{
					type: "POST",
					url: phpFactoryUrl,
					data: _post
				}
			)
			.done(function( o ) {
				if (successMethod != null && typeof successMethod != 'undefined' && successMethod != '') {
					successMethod(JSON.parse(o));
				}
			})
			.fail(function( msg ) {
				alert( "tictac.Factory.js ERROR : " + msg );
			});
			
		}
		
		
		// RETURN OBJECT
		return {
			
			ajax : function(fnName, o, successMethod) {
				_sendRequest (fnName, o, successMethod);
			}
			
		}
		
	} ();
	
});
