(function ($) {

	// cache DOM
	$burgerBtn = $('.navigation__burger-js');
	$navigation = $('.navigation-js');
	$navigationMenu = $('.navigation__menu-js');

	render();

	/**
	 * [render]
	 * @return {[void]}
	 */
	function render() {
		initEvents();

		$(window).on('load', function() {
			initWaypoint();
		});
	}

	/**
	 * [initEvents all events will initialize here]
	 * @return {[void]}
	 */
	function initEvents() {
		$burgerBtn.on('click', onBurgerBtnClick);
	}

	/**
	 * [onBurgerBtnClick]
	 * @param  {[Event]} event
	 * @return {[void]}
	 */
	function onBurgerBtnClick(event) {
		event.preventDefault();

		// get window height
		var wh = $(window).outerHeight();

		// if has open class
		if ($navigation.hasClass('open')) {
			// remove open class
			$navigation.removeClass('open');

			// set navigation height to 0
			$navigation.css('height', 80);
		}
		// else no open class
		else {
			// add open class
			$navigation.addClass('open');

			// set navigation height to 0
			$navigation.css('height', wh);
		}
	}

	/**
	 * [initWaypoint]
	 * @return {[void}
	 */
	function initWaypoint() {
		if ($navigation.length) {
			var waypoint = new Waypoint({
				element: $navigation,
				handler: function(direction) {
					if (direction === 'down') {
						$navigation.addClass('sticky');
					} else {
						$navigation.removeClass('sticky');
					}
				},
				offset: -2
			});
		}		
	}

})(jQuery);