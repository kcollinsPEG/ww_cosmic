(function($) {

	// cache DOM
	var $select = $('.select.js');
	var $custom = $('.custom.js');

	// initialize
	render();

	/**
	 * [render]
	 * @return {[void]}
	 */
	function render() {
		// hide custom field
		$custom.hide();

		// init select2
		$select.select2();

		// change event
		$select.on('change', function(event) {
			// cache this
			var _this = $(this);

			// get index on current selected item
			var selectedIndex = _this[0].options.selectedIndex;

			// get data-value on selected iten
			var custom = $(_this[0].options[selectedIndex]).data('value');

			// check if custom is selected and show
			// else hide it
			if (typeof custom !== 'undefined') {
				$custom.show();
			} else {
				$custom.hide();
			}
		});
	}

})(jQuery);