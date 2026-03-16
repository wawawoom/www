(function() {

	// Define our constructor
	this.AnimPageTitle = function(o) {

		// Define option defaults
		var _options = {
			animName: 'square',
			speed: 300,
			showOriginalPagetitle: true
		}

		// Create global element references
		var _animChars = {
			'square': 		['▙','▛','▜', '▟'],
			'dot': 			['․','‥','…'],
			'triangle': 	['◢','◣','◤','◥'],
			'circle': 		['⚭','⚮','⚯'],
			'bar': 			['▁','▂','▃','▄','▅','▆','▇','▆','▅','▄','▃','▂','▁']
		};
		
		var _interval = null;
		var _currentIndex = 0;
		var _originalPageTitle = document.title;

		// Create options by extending defaults with the passed in arugments
		if (arguments[0] && typeof arguments[0] === "object") {
			
			// animName
			if (typeof arguments[0].animName != 'undefined') {
				if (typeof _animChars[arguments[0].animName] != 'undefined' && arguments[0].animName != _options.animName) {
					_options.animName = arguments[0].animName;
				}
			}

			// speed
			if (typeof arguments[0].speed != 'undefined' && !isNaN(arguments[0].speed) && arguments[0].speed > 0) {
				_options.speed = arguments[0].speed;
			}

			// showOriginalPagetitle
			if (arguments[0].showOriginalPagetitle === false) {
				_options.showOriginalPagetitle = false;
			}

		}


		AnimPageTitle.prototype.start = function() {
			_interval = setInterval(
				function() {

					document.title = 	_options.showOriginalPagetitle ? 
										_animChars[_options.animName][_currentIndex] + ' ' + _originalPageTitle : 
										_animChars[_options.animName][_currentIndex];
					
					if (_currentIndex == _animChars[_options.animName].length - 1) {
						_currentIndex = 0;
					} else {
						_currentIndex++;
					}

				},
				_options.speed
			);

			return this;
		}

		AnimPageTitle.prototype.stop = function() {
			_currentIndex = 0;
			document.title = _originalPageTitle;
			clearInterval(_interval);

			return this;
		}

		return this;

	}

}());