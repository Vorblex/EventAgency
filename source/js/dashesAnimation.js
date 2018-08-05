'use strict';

// ==========================================
// Dashes animation with GSAP
// ==========================================

export default function() {
  let
    dashFade = new TimelineMax(),
    controller = new ScrollMagic.Controller();   

  dashFade = dashFade.staggerFromTo('.steps__bg-svg path', 1, {opacity:0}, {opacity:1, ease: Sine.easeOut}, .2);
    
  new ScrollMagic.Scene({
    triggerElement: '.steps-section',
    triggerHook: 0.5,
    duration: '120%'
  })
    .setTween(dashFade) 
    .addTo(controller);
}