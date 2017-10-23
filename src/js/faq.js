(function($) {

	// cache DOM
	var $container = $('.faq.js');
	var $title = $('.faq__title.js');

	// default variable
	var containerHeight = 0;

	// init
	render();
	initEvents();

	/**
	 * [render]
	 * @param  {[Array]} arguments
	 * @return {[void]}
	 */
	function render() {
		// if arguments exist or is equal to zero
		if (arguments && arguments.length === 0) {
			// each faq item
			$.each($container, function(index, value) {
				// set default height
				$(value).css({
					height: $(value).find('.faq__title').outerHeight()
				});
			});
		} else {
			// cache this faq specific item
			var _this = $(arguments[0]);

			// if has class open
			if (_this.hasClass('open')) {
				// remove class
				_this.removeClass('open');
				
				// set container height
				containerHeight = _this.find('.faq__title').outerHeight();
				_this.css({
					height: containerHeight
				});
			} else {
				// add class
				_this.addClass('open');

				// set container height
				containerHeight = _this.find('.faq__wrapper').outerHeight();
				_this.css({
					height: containerHeight
				});
			}
		}
	}

	/**
	 * [initEvents]
	 * @return {[void]}
	 */
	function initEvents() {
		$title.on('click', onFaqClick);
	}

	/**
	 * [onFaqClick]
	 * @return {[void]}
	 */
	function onFaqClick() {
		// specific container item was clicked
		var _this = $(this).closest('.faq');

		// render
		render(_this);
	}

})(jQuery);