/*
Template Name: Medical Addon for Elementor
Author: NicheAddon
Version: 1.0.0
Email: support@nicheaddon.com
*/

(function($){
'use strict';

/*----- ELEMENTOR LOAD SWIPER CALL ---*/
function SwiperSliderInit(slider_el){
  //Atrakt Swiper Slider Script
  let animEndEv = 'webkitAnimationEnd animationend';
  let swipermw = (slider_el.hasClass('swiper-mousewheel')) ? true : false;
  let swiperkb = (slider_el.hasClass('swiper-keyboard')) ? true : false;
  let swipercentered = (slider_el.hasClass('swiper-center')) ? true : false;
  let swiperautoplay = slider_el.data('autoplay');
  let swiperinterval = slider_el.data('interval');
  let swiperloop = slider_el.data('loop');
  let swipermousedrag = slider_el.data('mousedrag');
  let swipereffect = slider_el.data('effect');
  let swiperclikable = slider_el.data('clickpage');
  let swiperspeed = slider_el.data('speed');
  let swiperinteraction = slider_el.data('interaction');

  let swipersitems = ( slider_el.data('items') ) ? slider_el.data('items') : 1;
  let swiperstabitems = ( slider_el.data('tab-items') ) ? slider_el.data('tab-items') : 1;
  let swipersmobileitems = ( slider_el.data('mobile-items') ) ? slider_el.data('mobile-items') : 1;

  //Atrakt Swiper Slides Script
  let autoplay = swiperinterval;
	
	// Init elementor swiper
	let Swiper = elementorFrontend.utils.swiper;
	initSwiper();

	async function initSwiper() {
	  let slidervar = await new Swiper( slider_el, {
      autoplayDisableOnInteraction: swiperinteraction,
      slidesPerView: swipersitems,
      effect: swipereffect,
      speed: swiperspeed,
      loop: swiperloop,
      paginationClickable: swiperclikable,
      watchSlidesProgress: true,
      autoplay: swiperautoplay,
      simulateTouch: swipermousedrag,
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: swipersmobileitems,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: swipersmobileitems,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: swiperstabitems,
        },
        991: {
          slidesPerView: swipersitems,
        }
      },      
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      mousewheelControl: swipermw,
      keyboardControl: swiperkb,
    });
    slidervar.on('slideChange', function (s) {
      let currentSlide = $(slidervar.slides[slidervar.activeIndex]);
      let elems = currentSlide.find('.animated')
      elems.each(function() {
        let $this = $(this);
        let animationType = $this.data('animation');
        $this.addClass(animationType, 100).on(animEndEv, function() {
          $this.removeClass(animationType);
        });
      });
    });
	}		
}

/*----- ELEMENTOR LOAD FUNTION CALL ---*/

$( window ).on( 'elementor/frontend/init', function() {
	//Owl Carousel Slider Script
	var owl_carousel = function(){
		$('.owl-carousel').each( function() {
	    var $carousel = $(this);
	    var $items = ($carousel.data('items') !== undefined) ? $carousel.data('items') : 1;
	    var $items_tablet = ($carousel.data('items-tablet') !== undefined) ? $carousel.data('items-tablet') : 1;
	    var $items_mobile_landscape = ($carousel.data('items-mobile-landscape') !== undefined) ? $carousel.data('items-mobile-landscape') : 1;
	    var $items_mobile_portrait = ($carousel.data('items-mobile-portrait') !== undefined) ? $carousel.data('items-mobile-portrait') : 1;
	    $carousel.owlCarousel ({
	      loop : ($carousel.data('loop') !== undefined) ? $carousel.data('loop') : true,
	      items : $carousel.data('items'),
	      margin : ($carousel.data('margin') !== undefined) ? $carousel.data('margin') : 0,
	      dots : ($carousel.data('dots') !== undefined) ? $carousel.data('dots') : true,
	      nav : ($carousel.data('nav') !== undefined) ? $carousel.data('nav') : false,
	      navText : ["<div class='slider-no-current'><span class='current-no'></span><span class='total-no'></span></div><span class='current-monials'></span>", "<div class='slider-no-next'></div><span class='next-monials'></span>"],
	      autoplay : ($carousel.data('autoplay') !== undefined) ? $carousel.data('autoplay') : false,
	      autoplayTimeout : ($carousel.data('autoplay-timeout') !== undefined) ? $carousel.data('autoplay-timeout') : 5000,
	      animateIn : ($carousel.data('animatein') !== undefined) ? $carousel.data('animatein') : false,
	      animateOut : ($carousel.data('animateout') !== undefined) ? $carousel.data('animateout') : false,
	      mouseDrag : ($carousel.data('mouse-drag') !== undefined) ? $carousel.data('mouse-drag') : true,
	      autoWidth : ($carousel.data('auto-width') !== undefined) ? $carousel.data('auto-width') : false,
	      autoHeight : ($carousel.data('auto-height') !== undefined) ? $carousel.data('auto-height') : false,
	      center : ($carousel.data('center') !== undefined) ? $carousel.data('center') : false,
	      responsiveClass: true,
	      dotsEachNumber: true,
	      smartSpeed: 600,
	      autoplayHoverPause: true,
	      responsive : {
	        0 : {
	          items : $items_mobile_portrait,
	        },
	        480 : {
	          items : $items_mobile_landscape,
	        },
	        768 : {
	          items : $items_tablet,
	        },
	        992 : {
	          items : $items,
	        }
	      }
	    });
	    var totLength = $('.owl-dot', $carousel).length;
	    $('.total-no', $carousel).html(totLength);
	    $('.current-no', $carousel).html(totLength);
	    $carousel.owlCarousel();
	    $('.current-no', $carousel).html(1);
	    $carousel.on('changed.owl.carousel', function(event) {
	      var total_items = event.page.count;
	      var currentNum = event.page.index + 1;
	      $('.total-no', $carousel ).html(total_items);
	      $('.current-no', $carousel).html(currentNum);
	    });
	  });
	}; // end

	//Medical Addon for Elementor Preloader Script
  $('.namep-preloader').fadeOut(500);

	var item_hover_class = function( selector ){
		$(selector).on({
		  mouseenter : function() {
			$(this).addClass('namep-hover');
		  },
		  mouseleave : function() {
			$(this).removeClass('namep-hover');
		  }
		});
	};

	var item_prev_class = function( selector ){
		$(selector).on({
		  mouseenter : function() {
			$(this).prevAll(selector).addClass('process-done');
		  },
		  mouseleave : function() {
			$(this).prevAll(selector).removeClass('process-done');
		  }
		});
	};

	//Medical Addon for Elementor Services
	elementorFrontend.hooks.addAction( 'frontend/element_ready/namedical_basic_services.default', function($scope, $){
		item_hover_class('.namep-service-item');
	} );
	//Medical Addon for Elementor Blog
	elementorFrontend.hooks.addAction( 'frontend/element_ready/namedical_basic_blog.default', function($scope, $){
		item_hover_class('.namep-news-item');
    $('.namep-item').matchHeight ({
      property: 'height'
    });
	} );
	//Medical Addon for Elementor Gallery
	elementorFrontend.hooks.addAction( 'frontend/element_ready/namedical_basic_gallery.default', function($scope, $){
		item_hover_class('.namep-gallery-item');
		$('.masonry-wrap').each(function(i, gridContainer) {
      var $gridContainer = $(gridContainer);
      var $grid = $gridContainer.find('.namep-masonry').imagesLoaded(function() {
        $grid.isotope ({
          itemSelector: '.masonry-item',
          // layoutMode: 'packery',
          percentPosition: true,
          isFitWidth: true,
        })
      });
      $grid.packery({
	      itemSelector: '.masonry-item'
	    });
      $gridContainer.find('.masonry-filters').on('click', 'li a', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope ({
          filter: filterValue,
        });
      });
    });
    $('.masonry-filters').each( function( i, buttonGroup ) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on( 'click', 'li a', function() {
        $buttonGroup.find('.active').removeClass('active');
        $(this).addClass('active');
      });
    });
	} );
	//Medical Addon for Elementor Contact
	elementorFrontend.hooks.addAction( 'frontend/element_ready/namedical_basic_contact.default', function($scope, $){
		item_hover_class('.namep-contact-item');
	} );
	//Medical Addon for Elementor Process
	elementorFrontend.hooks.addAction( 'frontend/element_ready/namedical_basic_process.default', function($scope, $){
	  item_prev_class('.namep-process-item');
	} );
	//Medical Addon for Elementor Team
	elementorFrontend.hooks.addAction( 'frontend/element_ready/namedical_basic_team.default', function($scope, $){
	  item_hover_class('.namep-mate-item');
	} );
	//Medical Addon for Elementor Testimonials
	elementorFrontend.hooks.addAction( 'frontend/element_ready/namedical_basic_testimonials.default', function($scope, $){
		owl_carousel();
	} );
	//Medical Addon for Elementor Video Popup
	elementorFrontend.hooks.addAction( 'frontend/element_ready/namedical_basic_video.default', function($scope, $){
	  item_hover_class('.namep-video-wrap');
	} );
	//Medical Addon for Elementor History
	elementorFrontend.hooks.addAction( 'frontend/element_ready/namedical_basic_history.default', function($scope, $){
	  // item_hover_class('.namep-history-item');
		owl_carousel();
		$('.namep-item').matchHeight ({
	    property: 'height'
	  });
	} );
	//Medical Addon for Elementor Slider
	elementorFrontend.hooks.addAction( 'frontend/element_ready/namedical_basic_slider.default', function($scope, $){
		//Fame Swiper Slider Script
		let slider_el = $scope.find(".swiper-slides");
		SwiperSliderInit(slider_el);
	} );

	//Medical Addon for Elementor Valuable Box
	elementorFrontend.hooks.addAction( 'frontend/element_ready/namedical_unique_valuable.default', function($scope, $){
	  item_hover_class('.namep-valuable-item');
	  $('.namep-item').matchHeight ({
	    property: 'height'
	  });
	  // Slick Vertical Slider
	  jQuery('.slick-vertical-slider').not('.slick-initialized').slick ({
	    dots: false,
	    vertical: true,
	    slidesToShow: 3,
	    slidesToScroll: 1,
	    verticalSwiping: true,
	  });
	} );

	//Medical Addon for Elementor Stats
	elementorFrontend.hooks.addAction( 'frontend/element_ready/namedical_unique_stats.default', function($scope, $){
	  item_hover_class('.namep-stats-item');
	} );

	//Medical Addon for Elementor Hospitals
	elementorFrontend.hooks.addAction( 'frontend/element_ready/namedical_unique_hospitals.default', function($scope, $){
	  item_hover_class('.namep-hospital-item');
	} );

	//Medical Addon for Elementor Tools
	elementorFrontend.hooks.addAction( 'frontend/element_ready/namedical_unique_tools.default', function($scope, $){
	  item_hover_class('.namep-tool-item');
	  item_hover_class('.namep-care-item');
	} );

	//Medical Addon for Elementor Tools
	elementorFrontend.hooks.addAction( 'frontend/element_ready/namedical_unique_departments.default', function($scope, $){
	  item_hover_class('.namep-department-item');
	} );


	  //Chart
	  elementorFrontend.hooks.addAction( 'frontend/element_ready/namedical_basic_chart.default', function($scope, $){
	    //Chart Script
	    let $canvas = $scope.find(".eclt-chart canvas");
	        let chartData = $canvas.data('chart');

	        if (chartData) {
	            // Global configs
	            Chart.defaults.global.responsive = true;
	            Chart.defaults.global.maintainAspectRatio = false;
	            Chart.defaults.global.tooltips.backgroundColor = 'rgba(35,35,35,0.9)';
	            Chart.defaults.global.tooltips.bodyFontSize = 13;
	            Chart.defaults.global.tooltips.bodyFontStyle = 'bold';
	            Chart.defaults.global.tooltips.yPadding = 13;
	            Chart.defaults.global.tooltips.xPadding = 10;
	            Chart.defaults.doughnut.cutoutPercentage = 60;

	            // Create the chart
	            new Chart($canvas, {
	                type: chartData.type,
	                data: {
	                    labels: chartData.labels,
	                    datasets: chartData.datasets
	                },
	                options: chartData.options
	            });
	        } 
	  } );

	  elementorFrontend.hooks.addAction( 'frontend/element_ready/namedical_basic_typewriter.default', function($scope, $) {
	    let target_el   = $scope.find(".namep-typewriter");
	    let $id         = target_el.attr('data-id');
	    let $typed_id   = target_el.attr('data-type-id');
	    let $typeSpeed  = target_el.attr('data-type-speed');
	    let $backSpeed  = target_el.attr('data-back-speed');
	    let $backDelay  = target_el.attr('data-back-delay');
	    let $startDelay = target_el.attr('data-start-delay');
	    let $cursorChar = target_el.attr('data-cursor-char');

	    let target_var  = 'typed_' + $typed_id + '_' + $id;

	    target_var = new Typed('.' + target_var, {
	      typeSpeed: parseInt($typeSpeed),
	      backSpeed: parseInt($backSpeed),
	      backDelay: parseInt($backDelay),
	      startDelay: parseInt($startDelay),
	      cursorChar: $cursorChar,
	      loop: true,
	      stringsElement: '.'+ target_var +'_strings',
	    });   
	  } );	
} );
})(jQuery);