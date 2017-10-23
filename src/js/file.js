(function($) {

	// cache DOM
	var $fileInput = $('.file.js');
	var $fileButton = $('.contact__form-file.js');

	// default variables
	var filename = '';

	// initialize
	render();
	initEvents();

	/**
	 * [render]
	 * @return {[void]}
	 */
	function render() {
		// do nothing if filename is empty
		if (filename === '')
			return;

		// display filename
		$fileButton.find('span').text(filename);
	}

	/**
	 * [initEvents]
	 * @return {[void]}
	 */
	function initEvents() {
		$fileButton.on('click', onFileButtonClick);
		$fileInput.on('change', onFileInputChange);
	}

	/**
	 * [onFileButtonClick]
	 * @return {[void]}
	 */
	function onFileButtonClick() {
		// trigger click on file input
		$fileInput.click();
	}

	/**
	 * [onFileInputChange]
	 * @return {[void]}
	 */
	function onFileInputChange() {
		// set filename
		filename = $(this).val();

		// render
		render();
	}

})(jQuery);