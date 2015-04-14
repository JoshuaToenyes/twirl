(function () {

  // The element the user clicks to toggle open/close.
  var TRIGGER_ELEMENT_SELECTOR = ".twirl";

  // Animation class. This class is added when the element should
  // animate, and removed when it shouldn't to allow for size recalculation
  // without the browser interference.
  var ANIMATION_CLASS = "animated";

  // The height of the expanding/contracting element when contracted.
  var CONTRACTED_HEIGHT = '0px';

  // Time to wait after window resize before recalculating element sizes.
  var RESIZE_TIME = 500;

  /***************************** END CONFIGURATION ****************************/

  var resizeTimer = null;

  $(function() {

    $(TRIGGER_ELEMENT_SELECTOR).on('click', function() {
      $el = $(this);
      var expanded = $el.data('expanded');

      // calculate and store the height on first click
      if (expanded === undefined) {
        $el.next().data('height', $el.next().outerHeight());
        expanded = true;
      }

      $el.next().addClass(ANIMATION_CLASS);

      if (expanded === false) {
        $el.next().css('height', $el.next().data('height'));
        $el.data('expanded', true);
        $el.addClass('expanded');
      } else {
        $el.next().css('height', CONTRACTED_HEIGHT);
        $el.data('expanded', false);
        $el.removeClass('expanded');
      }
    });
  });

  $(window).on('load', function() {
    $(TRIGGER_ELEMENT_SELECTOR).trigger('click');
  });

  $(window).on('resize', function() {
    $el = $(this);

    if (resizeTimer !== null) clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function() {

      $(TRIGGER_ELEMENT_SELECTOR).each(function() {
        $el.next().removeClass(ANIMATION_CLASS);
        $el.next().css('height', 'auto');
        $el.next().data('height', $el.next().outerHeight());
        $el.next().css('height', $el.next().data('height'));

        if ($el.data('expanded') !== true) {
          $el.next().css('height', CONTRACTED_HEIGHT);
        }
      });

      resizeTimer = null;
    }, RESIZE_TIME);
  });

})();
