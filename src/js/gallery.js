(function($) {

	// cache DOM
	var $video = $('.video-js');

	render();

	/**
	 * [render]
	 * @return {[void]}
	 */
	function render() {
		$video.lightGallery({
			controls: false,
			counter: false
		});
	}

})(jQuery);