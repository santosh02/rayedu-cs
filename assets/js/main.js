/** ***************************************

	TABLE OF CONTENTS
	---------------------------
        1. Loader
		2. Counter
        3. Subscribe
        4. Contact
		5. Gallery
        6. Smooth Scroll
        7. Scroll Reveal

 **  ***************************************/

/******************************************************************
*******************************     1. LOADER
******************************************************************/

    ( function ( $ ) {
        'use strict';
        $(window).on('load', function() {
            setTimeout( function() {
                $('.loader').fadeOut(500);
            }, 1500);
        });
    } ( jQuery ) );

/******************************************************************
*******************************     2. COUNTER
******************************************************************/

	( function (  ) {
	    'use strict';

		var Month 		= counter.setMonth;
		var Day 		= counter.setDay;
		var Year 		= counter.setYear;
		var target_date = new Date(Month +','+ Day +','+ Year).getTime();
		 
		var days, hours, minutes, seconds;
		 
		var countdownDays 	 = document.getElementById("days");
		var countdownHours 	 = document.getElementById("hours");
		var countdownMinutes = document.getElementById("minutes");
		var countdownSeconds = document.getElementById("seconds");

		setInterval(function () {
		 
			var current_date = new Date().getTime();
			var seconds_left = (target_date - current_date) / 1000;

			days = parseInt(seconds_left / 86400);
			seconds_left = seconds_left % 86400;

			hours = parseInt(seconds_left / 3600);
			seconds_left = seconds_left % 3600;

			minutes = parseInt(seconds_left / 60);
			seconds = parseInt(seconds_left % 60);


			days 	= (String(days).length >= 2) ? days : '0' + days;
	    	hours 	= (String(hours).length >= 2) ? hours : '0' + hours;
	    	minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
	    	seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

			countdownDays.innerHTML = days;
			countdownHours.innerHTML = hours;
			countdownMinutes.innerHTML = minutes;
			countdownSeconds.innerHTML = seconds;

		 
		}, 1000);

		var numberOfIcons 	= $('.layer-soc').length,
			iconWidth 		= $('.layer-soc').outerWidth(true),
			totalIconsWidth	= numberOfIcons * iconWidth;

		$('.icon-center').css({
			width: totalIconsWidth
		});

	} () );

/******************************************************************
*******************************		3. SUBSCRIBE
******************************************************************/

	( function ( $ ) {
	    'use strict';
		$(document).ready(function() {

            var subscribe_open      = $('.subscribe-open'),
                subscribe_form      = $('.subscribe-form'),
                subscribe_open_p    = $('.subscribe-open p'),
                is_subscribe_open   = false;

            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    
            subscribe_open.on('click', function() {

                if( is_subscribe_open ) {
                    close_subscribe();
                } else {
                    open_subscribe();
                }

            });

            function open_subscribe() {

                subscribe_open_p.removeClass('animated fadeIn').addClass('animated fadeOut');
                
                subscribe_open.addClass('subscribe-close').children('span').removeClass('animated fadeIn').addClass('animated fadeOut').removeClass('ion-ios-email-outline').one(animationEnd, function() {
                    
                    subscribe_open.children('span').removeClass('ion-ios-email-outline animated fadeOut').addClass('ion-ios-close-empty animated fadeIn');

                        subscribe_form.css('display', 'block');

                        subscribe_form.removeClass('slideOutUp').addClass('animated slideInDown').one(animationEnd, function() {

                            is_subscribe_open = true;

                        });
                });

            }

            function close_subscribe() {

                subscribe_form.removeClass('slideInDown').addClass('animated slideOutUp').one(animationEnd, function() {

                    subscribe_form.css('display', 'none');

                    subscribe_open.removeClass('subscribe-close').children('span').removeClass('animated fadeIn').addClass('animated fadeOut').removeClass('ion-ios-close-empty').one(animationEnd, function() {
                        
                        subscribe_open.children('span').removeClass('animated fadeOut').addClass('ion-ios-email-outline animated fadeIn');
                        
                        subscribe_open_p.removeClass('animated fadeOut').addClass('animated fadeIn').removeClass('animated fadeIn');
                    
                        is_subscribe_open = false;

                    });
                });

            }

			// Event on submit subscribe form
			$('.subscribe-submit').on('click', function() {

				// Get value from input field
	          	var email = $('.subscribe-field').val(),
					emailTo = '',
					apiKey = '',
					listID = '',
					is_email_enabled = false,
					is_mailchimp_enabled = false;

				// Subscribe via email
				if( subscribe.emailTo ) {
					is_email_enabled = true;
					emailTo = subscribe.emailTo;
				}
				// Subscribe via mailchimp
				if( subscribe.apiKey && subscribe.listID ) {
					is_mailchimp_enabled = true;
					apiKey = subscribe.apiKey;
					listID = subscribe.listID;
				}

	          	// Ajax request for sending mails
	            $.ajax({
					type: 'POST',
					url: 'assets/subscribe.php',
					data: {
						// Mailchimp service
						via_mailchimp: is_mailchimp_enabled,
						// Subscribe via email service
						via_email: is_email_enabled,
						// Field value
						email: email,
						// Your email
						email_to: emailTo,
						// Mailchimp api key
						api_key: apiKey,
						// Mailchimp list id
						list_id: listID,
						// Server success message
						success_msg: subscribe.successMsg
					},
					dataType: 'json',
					success: function(json) {
		                if(json.valid === 0) {
                            var response = "Email is invalid";
                        }
                        else {
                            var response = json.message;
		                }
                        
                        $('.subscribe').append('<p class="response-subscribe-message">' + response + '</p>');

                        $('.response-subscribe-message').css({
                                'color': '#888',
                                'width': '100%',
                                'text-align': 'center'
                        });

                        setInterval(function() {
                            $('.response-subscribe-message').fadeOut();
                            $('.subscribe-field').val('');
                        }, 2000);
                        setInterval(function() {
                            $('.response-subscribe-message').remove();
                        }, 3000);

	              	},
	              	error: function (jqXHR, textStatus, errorThrown) {
	                    console.log(textStatus, errorThrown);
	                }

	          });

	          return false;

	        });

		});
	} ( jQuery ) );

/******************************************************************
*******************************     4. CONTACT
******************************************************************/

    ( function ( $ ) {
        'use strict';

        $( '.js-input' ).keyup(function() {
            if( $(this).val() ) {
                $(this).addClass('not-empty');
            } else {
                $(this).removeClass('not-empty');
            }
        });

    } ( jQuery ) );

        $('.submit-message').on('click', function(e) {
            e.preventDefault();
            var message_name    = $('.message-name').val(),
                message_email   = $('.message-email').val(),
                message_text    = $('.message-text').val();

            // Ajax request for sending mails
            $.ajax({
                type: 'POST',
                url: 'assets/message.php',
                data: {
                    message_name: message_name,
                    message_email: message_email,
                    message_text: message_text,
                    // Your email
                    email_to: message.emailTo,
                    success_msg: message.successMsg
                },
                dataType: 'json',
                success: function(json) {

                    if( json.is_mail_sent ) {
                        $('#name').css('border-color', 'green');                            
                        $('#email').css('border-color', 'green');
                        $('#message').css('border-color', 'green');

                        setTimeout(function() {

                            $('#name, #email, #message').val('').removeClass('not-empty');

                            $( '.js-input' ).keyup(function() {
                                if( $(this).val() ) {
                                    $(this).addClass('not-empty');
                                } 
                                else {
                                    $(this).removeClass('not-empty');
                                }
                            });
                            
                            if( json.name == 0 ) {
                                $('#name').css('border-color', 'tomato');
                            } else {
                                $('#name').css('border-color', '#FFF');
                            }
                            if( json.email == 0 ) {
                                $('#email').css('border-color', 'tomato');
                            } else {
                                $('#email').css('border-color', '#FFF');
                            }
                            if( json.message == 0 ) {
                                $('#message').css('border-color', 'tomato');
                            } else {
                                $('#message').css('border-color', '#FFF');
                            }
                        }, 3000);

                    }

                    if( !json.is_mail_sent ) {

                        if( json.name == 0 ) {
                            $('#name').css('border-color', 'tomato');
                        } else {
                            $('#name').css('border-color', '#FFF');
                        }
                        if( json.email == 0 ) {
                            $('#email').css('border-color', 'tomato');
                        } else {
                            $('#email').css('border-color', '#FFF');
                        }
                        if( json.message == 0 ) {
                            $('#message').css('border-color', 'tomato');
                        } else {
                            $('#message').css('border-color', '#FFF');
                        }

                    }
                    
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        });

/******************************************************************
*******************************     5. GALLERY
******************************************************************/
    
    $(document).ready(function() {

        var gallery = $('.gallery'),
            content_wrapper = $('.content-wrapper'),
            caption_3 = $('.column-3 .caption'),
            caption_2 = $('.column-2 .caption');

        var gallerySize = function() {
            gallery.css('width', gallery.parent().parent().parent().parent().width() + 20);
            gallery.css('margin-left', '-' + (parseFloat(content_wrapper.css('margin-left').slice(0,-2)) + 30) + 'px');

            caption_3.css('height', caption_3.parent().height());
            caption_2.css('height', caption_2.parent().height());
            caption_2.css('top', caption_3.parent().height());
        };

        setTimeout(function() {
            gallerySize();
        }, 2000);

        $(window).resize(function() {
            gallerySize();
        });

    });

    ( function ( $ ) {
        'use strict';

    	var initPhotoSwipeFromDOM = function(gallerySelector) {

        // parse slide data (url, title, size ...) from DOM elements 
        // (children of gallerySelector)
        var parseThumbnailElements = function(el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                linkEl,
                size,
                item;

            for(var i = 0; i < numNodes; i++) {

                figureEl = thumbElements[i]; // <figure> element

                // include only element nodes 
                if(figureEl.nodeType !== 1) {
                    continue;
                }

                linkEl = figureEl.children[0]; // <a> element

                size = linkEl.getAttribute('data-size').split('x');

                // create slide object
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };



                if(figureEl.children.length > 1) {
                    // <figcaption> content
                    item.title = figureEl.children[1].innerHTML; 
                }

                if(linkEl.children.length > 0) {
                    // <img> thumbnail element, retrieving thumbnail url
                    item.msrc = linkEl.children[0].getAttribute('src');
                } 

                item.el = figureEl; // save link to element for getThumbBoundsFn
                items.push(item);
            }

            return items;
        };

        // find nearest parent element
        var closest = function closest(el, fn) {
            return el && ( fn(el) ? el : closest(el.parentNode, fn) );
        };

        // triggers when user clicks on thumbnail
        var onThumbnailsClick = function(e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            var eTarget = e.target || e.srcElement;

            // find root element of slide
            var clickedListItem = closest(eTarget, function(el) {
                return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
            });

            if(!clickedListItem) {
                return;
            }

            // find index of clicked item by looping through all child nodes
            // alternatively, you may define index via data- attribute
            var clickedGallery = clickedListItem.parentNode,
                childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;

            for (var i = 0; i < numChildNodes; i++) {
                if(childNodes[i].nodeType !== 1) { 
                    continue; 
                }

                if(childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }



            if(index >= 0) {
                // open PhotoSwipe if valid index found
                openPhotoSwipe( index, clickedGallery );
            }
            return false;
        };

        // parse picture index and gallery index from URL (#&pid=1&gid=2)
        var photoswipeParseHash = function() {
            var hash = window.location.hash.substring(1),
            params = {};

            if(hash.length < 5) {
                return params;
            }

            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if(!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');  
                if(pair.length < 2) {
                    continue;
                }           
                params[pair[0]] = pair[1];
            }

            if(params.gid) {
                params.gid = parseInt(params.gid, 10);
            }

            return params;
        };

        var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;

            items = parseThumbnailElements(galleryElement);

            // define options (if needed)
            options = {

                // define gallery index (for URL)
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                getThumbBoundsFn: function(index) {
                    // See Options -> getThumbBoundsFn section of documentation for more info
                    var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect(); 

                    return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                }

            };

            // PhotoSwipe opened from URL
            if(fromURL) {
                if(options.galleryPIDs) {
                    // parse real index when custom PIDs are used 
                    // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                    for(var j = 0; j < items.length; j++) {
                        if(items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    // in URL indexes start from 1
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }

            // exit if index not found
            if( isNaN(options.index) ) {
                return;
            }

            if(disableAnimation) {
                options.showAnimationDuration = 0;
            }

            // Pass data to PhotoSwipe and initialize it
            gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };

        // loop through all gallery elements and bind events
        var galleryElements = document.querySelectorAll( gallerySelector );

        for(var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i+1);
            galleryElements[i].onclick = onThumbnailsClick;
        }

        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        if(hashData.pid && hashData.gid) {
            openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
        }
    };

    // execute above function
    initPhotoSwipeFromDOM('.my-gallery');
        
    } ( jQuery ) );

/******************************************************************
*******************************     6. SMOOTH SCROLL
******************************************************************/

    ( function ( $ ) {
        'use strict';

        $('.navigation a').on('click', function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                
                var target = $(this.hash);
                
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                
                if (target.length) {
                    $('#content').animate({
                        scrollTop: $('#content').scrollTop() + target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });

        $('.navigation-mobile a').on('click', function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                
                var target = $(this.hash);
                
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                
                if (target.length) {
                    $('html').animate({
                        scrollTop: $('#content').scrollTop() + target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });

    } ( jQuery ) );

/******************************************************************
*******************************     7. SCROLL REVEAL
******************************************************************/

    ( function ( $ ) {

        $(window).on('load', function() {

            content = document.getElementById('content');
            main    = document.getElementById('main');
             
            sr = ScrollReveal();

            // Main Section
            sr.reveal('#main .logo-wrapper', { 
                container   : main,
                duration    : 500,
                delay       : 2000,
                scale       : 0.8,
                opacity     : 0,
                easing      : 'ease'
            });

            sr.reveal('#main .main-text', { 
                container   : main,
                duration    : 500,
                delay       : 2000,
                scale       : 0.8,
                opacity     : 0,
                easing      : 'ease'
            });

            sr.reveal('#main #counter', { 
                container   : main,
                duration    : 500,
                delay       : 2200,
                scale       : 0.8,
                opacity     : 0,
                easing      : 'linear',
                origin      : 'bottom'
            });

            sr.reveal('#main .subscribe', { 
                container   : main,
                duration    : 500,
                delay       : 2200,
                scale       : 0.8,
                opacity     : 0,
                easing      : 'linear',
                origin      : 'top'
            });

            // About Section
            sr.reveal('#about .title', { 
                container   : content,
                duration    : 500,
                delay       : 2000,
                scale       : 0.8,
                opacity     : 0,
                easing      : 'ease'
            });

            sr.reveal('#about hr', { 
                container   : content,
                duration    : 500,
                delay       : 2100,
                scale       : 0.8,
                opacity     : 0,
                easing      : 'ease'
            });

            sr.reveal('#about .social', { 
                container   : content,
                duration    : 500,
                delay       : 2200,
                scale       : 0.8,
                opacity     : 0,
                easing      : 'ease'
            });

            sr.reveal('#about .paragraph', { 
                container   : content,
                duration    : 500,
                delay       : 2300,
                scale       : 0.8,
                opacity     : 0,
                easing      : 'ease'
            });

            // Portfolio Section
            sr.reveal('#portfolio .title', { 
                container   : content,
                duration    : 500,
                delay       : 2400,
                scale       : 0.8,
                opacity     : 0,
                easing      : 'ease'
            });

            sr.reveal('#portfolio .vertical-separator', { 
                container   : content,
                duration    : 500,
                delay       : 2500,
                scale       : 0.8,
                opacity     : 0,
                easing      : 'ease'
            });

            sr.reveal('#portfolio .gallery', { 
                container   : content,
                duration    : 500,
                delay       : 2500,
                scale       : 0.8,
                opacity     : 0,
                easing      : 'ease'
            });

            // Services Section
            sr.reveal('#services .title', { 
                container   : content,
                duration    : 500,
                scale       : 0.8,
                opacity     : 0,
                easing      : 'ease'
            });

            sr.reveal('#services .vertical-separator', { 
                container   : content,
                duration    : 500,
                delay       : 100,
                scale       : 0.8,
                opacity     : 0,
                easing      : 'ease'
            });

            sr.reveal('#services .content-box', { 
                container   : content,
                duration    : 500,
                delay       : 200,
                scale       : 0.8,
                opacity     : 0,
                easing      : 'ease'
            });

            // Contact Section
            sr.reveal('#contact .title', { 
                container   : content,
                duration    : 500,
                scale       : 0.8,
                opacity     : 0,
                easing      : 'ease'
            });

            sr.reveal('#contact .vertical-separator', { 
                container   : content,
                duration    : 500,
                delay       : 100,
                scale       : 0.8,
                opacity     : 0,
                easing      : 'ease'
            });

            sr.reveal('#contact .details', { 
                container   : content,
                duration    : 500,
                scale       : 0.8,
                opacity     : 0,
                easing      : 'ease'
            });

            sr.reveal('#contact .get-in-touch', { 
                container   : content,
                duration    : 500,
                scale       : 0.8,
                opacity     : 0,
                easing      : 'ease'
            });

        });
    } ( jQuery ) );
