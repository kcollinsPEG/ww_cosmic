(function($) {

	// cache DOM
	var $date = $('.date.js');
	var today = new Date();

	// initialize
	render();
	/**
	 * [render]
	 * @return {[void]}
	 */
	function render() {
		// render datepicker with options
		$date.datepicker({
			format: 'dd/mm/yy',
			startDate: new Date(today.setDate(today.getDate() + 1))
		});
	}

})(jQuery);