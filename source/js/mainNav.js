'use strict';

// ==========================================
// Main menu toggle and active class highlighted 
// ==========================================

export default function() {
  let
    trigger = $('.hamburger'),
    nav = $('.main-nav'),
    navItems = nav.find('.main-nav__item'),
    mainNavList = $('.main-nav__list'),
    scrollDuration = 600,
    resizeTimerDuration = 400,
    controller,
    resizeTimer,
  
    toggleMenu = function(e) {
      e.preventDefault();
      $(this).toggleClass('hamburger--active');
      nav.toggleClass('main-nav--active');
    },

    closeMenu = function() {
      trigger.removeClass('hamburger--active');
      nav.removeClass('main-nav--active');
    },

    createController = function() {
      controller = new ScrollMagic.Controller();   
      
      controller.scrollTo(function (newScrollPos, cb) {
        $('html, body').stop().animate({scrollTop: newScrollPos}, scrollDuration, cb);
      });
    },
    
    createScene = function(index) {
      let sectionId = '#sec' + index;
  
      new ScrollMagic.Scene({
        triggerElement: sectionId,
        triggerHook: 0.45,
        duration: $(sectionId).innerHeight()
      })
        .setClassToggle('#menuItem' + index, 'main-nav__item--active')
        .addTo(controller);
    };

  createController();

  navItems.each(function(index) {
    let
      $this = $(this),
      itemDelay = 0.3 + 0.1 * index;
    
    $this.css('transition-delay', itemDelay + 's');
    $this.attr('id', 'menuItem' + index);
    
    createScene(index);
  });
  
  trigger.on('tap', toggleMenu);

  mainNavList.on('tap', '.main-nav__link', (e) => {
    e.preventDefault();
    
    let target = $(e.target).attr('href');
    
    controller.scrollTo($(target).offset().top, closeMenu);
    
  });
  
  $('.ofer__button').on('tap', function(e) {
    e.preventDefault();
    let target = $(this).attr('href');
    controller.scrollTo($(target).offset().top);
  });

  $(window).on('resize', () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      closeMenu();
      controller = controller.destroy(true);
      createController();
      navItems.each(function(index) {
        createScene(index);
      });
    }, resizeTimerDuration);
  });

}
  
  
  