var NavSlider = function() {
  this.isNavActive = false;
  this.isMoving = false;
  this.offset = 0;
  this.init();
};

NavSlider.prototype = {
  init: function() {
    var _this = this;
    $('.js-main-nav__inner').width($('.js-main-nav').width());
    this.offset = $(window).width() -  $('.js-main-nav__inner').width() - $('.js-main-nav__inner').offset().left;
    $(document).on('click', '.js-main-nav__menu-icon', function() {
      _this.toggle();
    });
  },
  toggle: function(opts) {
    if(this.isMoving) return;

    var _this = this;
    var first = opts && opts.first;

    var $container = $('.js-main-nav');
    var $contentContainer = $('.js-nav-list');
    var $inner = $container.find('.js-main-nav__mid');
    var $menuNav = $('.js-main-nav__inner');

    this.isNavActive = !this.isNavActive;
    if(first) {
      $container.addClass('is-animation-disabled');
    }

    $container.toggleClass('is-active', this.isNavActive);
      
    this.isMoving = true;

    if(this.isNavActive) {
      $menuNav.css('transform', 'translate3d(' + (this.offset) + 'px, 0px, 0px)');
      $inner.css({
        marginRight: -9999
      });
      $contentContainer.css({
        marginLeft: 0 - this.offset,
        marginRight: $menuNav.width()
      });
      setTimeout(function() {
        $container.removeClass('is-animation-disabled');
        _this.isMoving = false;
      }, 20);
    }
    else {
      $menuNav.css('transform', '');
      setTimeout(function() {
        $contentContainer.css({
          marginLeft: '',
          marginRight: ''
        });
        $inner.css({
          marginRight: ''
        });
        $container.removeClass('is-animation-disabled');
        _this.isMoving = false;
      }, 1100);
    }
  }
};

module.exports = NavSlider;
