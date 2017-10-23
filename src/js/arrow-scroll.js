(function($) {

    var $arrow = $('.arrow-js');
    var $target = $('#arrow-target');

    render();

    /**
     * [render]
     * @return {[void]}
     */
    function render() {
        $arrow.on('click', onArrowClick);
    }

    /**
     * [onArrowClick]
     * @return {[void]}
     */
    function onArrowClick() {
        $('html,body').animate({ scrollTop: $target.offset().top }, 'slow');
    }

})(jQuery);
