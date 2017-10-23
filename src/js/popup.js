(function($) {

	// cache DOM
	var $btnClose = $('.popup__wrapper-button.js');
	var $popup = $('.popup.js');

	initEvents();

	/**
	 * [render]
	 * @return {[void]}
	 */
	function render() {
		$popup.removeClass('active');
		$popup.addClass('hide');
	}

	/**
	 * [initEvents]
	 * @return {[void]}
	 */
	function initEvents() {
		$btnClose.on('click', onClose);
		if (!readCookie('hide')) {
			setTimeout(function() {
				$popup.removeClass('hide');
				$popup.addClass('active');
			}, 20000);
		}else{
			$popup.hide();
		}
	}

	/**
	 * [onClose]
	 * @return {[void]}
	 */
	function onClose() {
		render();
		createCookie('hide', true, 1);
		return false;
	}

})(jQuery);

// ---
// And some generic cookie logic
// ---
function createCookie(name,value,days) {
	var expires='';
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires = "; expires="+date.toGMTString();
	}
	else expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
