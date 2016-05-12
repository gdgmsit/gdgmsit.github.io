/*-----------------------------------------------------------------------------------*/
/*	DOC READY JS
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function($) { 
	"use strict";

    /************** Nav Scripts **************/
	var isHeaderImage = jQuery('.main-container > a + section').eq(0).hasClass('section-header');
	if( jQuery('.ebor-page-wrapper').length || jQuery('.fullscreen-element').length ){
		isHeaderImage = true;
	}
	if( jQuery('.ebor-page-wrapper').length && !( jQuery('.ebor-page-wrapper > section').eq(0).hasClass('full') )){
		isHeaderImage = false;
	}
	if( jQuery('.ebor-page-wrapper').length && jQuery('.ebor-page-wrapper > section').eq(0).hasClass('strip-divider') ){
		isHeaderImage = true;
	}
	if( false == isHeaderImage){
		jQuery('nav').addClass('sticky-nav');
		jQuery('body').addClass('ebor-pad-body');
	}
    jQuery(window).scroll(function() {
        if (jQuery(window).scrollTop() > 1 || !(isHeaderImage)) {
            jQuery('nav').addClass('sticky-nav');
        } else {
            jQuery('nav').removeClass('sticky-nav');
        }
    });

    // Margin on the menu to make room for sidebar menu if it exists
    if (jQuery('.sidebar-menu-toggle').length && !jQuery('.sidebar-menu-toggle i').hasClass('variant-deleted-mrv')) {
        jQuery('nav').find('.menu').css('margin-right', 32);
    }

    // Mobile menu toggle
    jQuery('.mobile-menu-toggle').click(function() {
        jQuery('nav').toggleClass('open-menu');
    });

    // Sidebar menu toggle
    jQuery('.sidebar-menu-toggle').click(function() {
        if (jQuery('.instagram-sidebar').hasClass('show-sidebar')) {
            jQuery('.instagram-sidebar').toggleClass('show-sidebar');
            jQuery('.sidebar-menu').toggleClass('show-sidebar');
        } else {
            jQuery('.sidebar-menu').toggleClass('show-sidebar');
            jQuery('.main-container').toggleClass('reveal-sidebar');
            jQuery('nav .container').toggleClass('reveal-sidebar');
        }
    });

    jQuery('.instagram-toggle').click(function() {
        if (jQuery('.sidebar-menu').hasClass('show-sidebar')) {
            jQuery('.sidebar-menu').toggleClass('show-sidebar');
            jQuery('.instagram-sidebar').toggleClass('show-sidebar');
        } else {
            jQuery('.instagram-sidebar').toggleClass('show-sidebar');
            jQuery('.main-container').toggleClass('reveal-sidebar');
            jQuery('nav .container').toggleClass('reveal-sidebar');
        }
    });

    jQuery('.main-container').click(function() {
        if (jQuery('.sidebar-menu').hasClass('show-sidebar')) {
            jQuery('.sidebar-menu').toggleClass('show-sidebar');
            jQuery('.main-container').toggleClass('reveal-sidebar');
            jQuery('nav .container').toggleClass('reveal-sidebar');
        }

        if (jQuery('.instagram-sidebar').hasClass('show-sidebar')) {
            jQuery('.instagram-sidebar').toggleClass('show-sidebar');
            jQuery('.main-container').toggleClass('reveal-sidebar');
            jQuery('nav .container').toggleClass('reveal-sidebar');
        }
    });

    /************* Slider Scripts **************/
    jQuery('.hero-slider').flexslider({
        directionNav: false
    });
    jQuery('.testimonials-slider').flexslider({
        directionNav: false
    });

    jQuery('.image-slider').flexslider({
        animation: "slide",
        directionNav: false
    });

    /************** Divider Scripts **************/
    jQuery('.background-image-holder').each(function() {
        var imgSrc = jQuery(this).children('.background-image').attr('src');
        jQuery(this).css('background', 'url("' + imgSrc + '")');
        jQuery(this).children('.background-image').hide();
        jQuery(this).css('background-position', '50% 0%');
    });

    /************** Instagram Feed **************/
    jQuery.fn.spectragram.accessData = {
        accessToken: wp_data.access_token,
        clientID: '1f0ddba78ec74bfe829badaeaea02f15'
    };

    jQuery('.instafeed').each(function() {
        var method = ( jQuery(this).attr('data-method') ) ? jQuery(this).attr('data-method') : 'getUserFeed';
        jQuery(this).children('ul').spectragram( method, {
            query: jQuery(this).attr('data-user-name')
        });
    });

    /************** Fullscreen Elements **************/
    jQuery('.fullscreen-element').each(function() {
        if (jQuery(window).height() < 768) {
            jQuery(this).css('height', 900);
        } else {
            jQuery(this).css('height', jQuery(window).height());
        }
    });

    /************** Twitter Feed **************/
	if(jQuery('.tweets-feed').length){
	    jQuery('.tweets-feed').each(function(index) {
	        jQuery(this).attr('id', 'tweets-' + index);
	    }).each(function(index) {
			
			function handleTweets(tweets) {
			    var x = tweets.length;
			    var n = 0;
			    var element = document.getElementById('tweets-' + index);
			    var html = '<ul class="slides">';
			    while (n < x) {
			        html += '<li>' + tweets[n] + '</li>';
			        n++;
			    }
			    html += '</ul>';
			    element.innerHTML = html;
			    return html;
			}
	        twitterFetcher.fetch(jQuery('#tweets-' + index).attr('data-widget-id'), '', 5, true, true, true, '', false, handleTweets);
	
	    });
	}
	
    /************** Countdown Timer **************/
    jQuery('.countdown').each(function() {
        jQuery(this).countdown({
            until: new Date(jQuery(this).attr('data-date'))
        });
    });

}); 
/*-----------------------------------------------------------------------------------*/
/*	WINDOW LOAD JS
/*-----------------------------------------------------------------------------------*/
jQuery(window).load(function() { 
	"use strict";

    var navHeight = jQuery('nav').outerHeight();
    jQuery('a[href^="#"]').not('a[href="#"], .wpb_accordion a, .wpb_tabs a, .wpb_tour a').smoothScroll({
        offset: -navHeight,
        speed: 800
    });

    /************** Parallax Scripts **************/
    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    var isChrome = !!window.chrome;
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    var prefix;

    if (isFirefox) {
        prefix = '-moz-';
    } else if (isIE) {

    } else if (isChrome || isSafari) {
        prefix = '-webkit-';
    }

    jQuery('.parallax-background').each(function() {
        jQuery(this).attr('data-bottom-top', prefix + 'transform: translate3d(0px,-100px, 0px)');
        jQuery(this).attr('data-center', prefix + 'transform: translate3d(0px,0px, 0px)');
        jQuery(this).attr('data-top-bottom', prefix + 'transform: translate3d(0px,100px, 0px)');
    });

    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        skrollr.init({
            forceHeight: false
        });
        
        jQuery('a.js-activated').not('a.js-activated[href^="#"]').click(function(){
        	var url = jQuery(this).attr('href');
        	window.location.href = url;
        	return true;
        });
    }

    jQuery('.tweets-feed').flexslider({
        directionNav: false,
        controlNav: false
    });


    jQuery('.instagram li a').attr('title', '');

    setTimeout(function() {
        jQuery('.instagram li').each(function() {
            var imgSrc = jQuery(this).find('img').attr('src');
            jQuery(this).css('background', 'url("' + imgSrc + '")');
            jQuery(this).find('img').css('opacity', 0);
            jQuery(this).css('background-position', '50% 0%');
        });
    }, 1000);

    setTimeout(function() {
        jQuery('.loader').addClass('hide-loader');
        setTimeout(function() {
            jQuery('.loader').remove();
            jQuery('.main-container').addClass('show-content');
            jQuery('nav').addClass('show-content');
        }, 500);
    }, 10);

}); 