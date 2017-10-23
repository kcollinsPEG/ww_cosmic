(function($) {

	// cache DOM
	$faqButtons = $('.faqs__buttons.js');
	$faqList = $('.faqs__list.js');

	// default variables
	var className = 'all';
	var buttonClass = '';
	var currentButton = $faqButtons.children().eq(0);

	// initialize
	render();
	initEvents();

	/**
	 * [render]
	 * @return {[void]}
	 */
	function render() {
		// check if has button--red
		if (!currentButton.hasClass('button--red')) {
			// remove all red and gray class
			$faqButtons.find('.button').removeClass('button--red button--gray');

			// add all gray class
			$faqButtons.find('.button').addClass('button--gray');

			// remove current button gray class
			currentButton.removeClass('button--gray');

			// add current button red class
			currentButton.addClass('button--red');
		}

		// hide all by default
		$faqList.find('.all').hide();

		// show faq base on data value
		$faqList.find('.'+className).show();
	}

	/**
	 * [initEvents]
	 * @return {[void]}
	 */
	function initEvents() {
		// set event trigger
		$faqButtons.on('click', 'a', onFaqButtonsClick);
	}

	/**
	 * [onFaqButtonsClick]
	 * @return {[void]}
	 */
	function onFaqButtonsClick(event) {
		event.preventDefault();

		// cache this
		var _this = $(this);

		// set className
		className = _this.data('value');

		// set current button
		currentButton = _this;

		// render
		render();
	}

})(jQuery);