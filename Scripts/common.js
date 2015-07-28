/*
Title:     		Common
Desc:			homepage panels animation
Author:     	Mark Croxton, mcroxton@hallmark-design.co.uk
Copyright:		Hallmark Design
Created:    	Sept 08 2008
Updated:    	May 29 2012
*/

//Cufon.replace('h2, h3');

// form show/hide animation
jQuery.fn.slideArea = function(speed, easing, callback, toggle) {
  var $masked = $("div",this); // get child div of this element
  var h = $masked.height() + parseInt($masked.css('paddingTop')) + parseInt($masked.css('paddingBottom'));
  if (!toggle) {
  	return this.animate({height: parseInt(this.css('height')) >0 ? 0 : h}, speed, easing, callback);
  } else {
  	return this.animate({height: h}, speed, easing, callback);
  }
};

$(document).ready(function() {
	
	// tabs
	$('#content > ul#tabs').tabs({ fx: { opacity: 'toggle' } });
	
	var $tab1 = $('#tab-1 > a');
	$tab1.click(function() {
		$('#tabs').css({
	   		backgroundPosition: 0
	 	});
	});  
	var $tab2 = $('#tab-2 > a');
	$tab2.click(function() {
		$('#tabs').css({
	   		backgroundPosition: -616
	 	});
	}); 

	// main nav
	if ($('#nav ul li').length > 0) {
		$('#nav ul').flexMenu({
			linkText : 'More +'
		});
	}
	
	/* ------------------------------------------------------------------------ */
	// homepage panels animation
	if (document.getElementById("home")) {

		// colour fades
		$('#entrance ul a').each(
			function (i) {
				$(this).html( $(this).html() + '<span></span>');
			
				//set opacity to 0
				$(this).children('span').fadeTo(1,0,'');

				$(this).hover(
					function() { //mouseover	
						$(this).children('span').css({
							visibility: 'visible'
						});
						$(this).children('span').fadeTo("normal",1,'');
					},
					function() { //mouseout
						$(this).children('span').fadeTo("slow",0,'');
					}
				);
			
			}
		);

		//slide horizontal

		//append controls
		 $('#content').append('<div id="controls"><a id="btnLeft" href="#"><em>&lt;</em></a> <a id="btnRight" href="#"><em>&gt;</em></a></div><div id="shadowLeft"></div><div id="shadowRight"></div>');
	
	  	var $masked = $('#entrance ul');
		var $controls = $('#controls');
		var $btnLeft = $('#btnLeft');
		var $btnRight = $('#btnRight');
		var $shadowLeft = $('#shadowLeft');
		var $shadowRight = $('#shadowRight');
	
		// get number of panels
		var panelCount = $masked.children('li').size();
	
		// hide shadow
		$shadowLeft.css({
			visibility: 'hidden'
		});
		
		$shadowRight.css({
			visibility: 'hidden'
		});
		
		// can't vary opacity of transparent pngs in IE 6/7
		if (!$.browser.msie) {
			$shadowLeft.fadeTo(1,0,'');
			$shadowRight.fadeTo(1,0,'');
		}

		// set up some constants with global scope
		var panelsPerScreen = 2;
		if (Modernizr.mq('only screen and (min-width: 960px)')) {
			panelsPerScreen = 3;
		}
		if (Modernizr.mq('only screen and (min-width: 1221px)')) {
			panelsPerScreen = 4;
		}

		maskWidth = (parseInt($masked.children('li').css('width'))+1) * panelsPerScreen;
		
		totalWidth = (parseInt($masked.children('li').css('width'))+1) * panelCount;
		speed = 160*panelCount;
		inMotion = false;
	
		// set width of the ul
		$masked.css({ width: totalWidth});
	
		// set initial button state

		// slide left
	  	$btnLeft.click(function() {	
			
			var maskX = parseInt($masked.css('left'));
			if (maskX > (maskWidth - totalWidth) && !inMotion ) {
				
				inMotion = true;
				if ((maskX-maskWidth + totalWidth) < maskWidth) {
	   				$masked.animate({
						left: (maskWidth-totalWidth)
						},speed,'easeOutBack',manageControls, false);  
				} else {
					$masked.animate({
						left: (maskX -maskWidth)
						},speed,'easeOutBack',manageControls, false);
				}
			} 
			return false;
	 	});

		//shadow
		$btnLeft.hover(
			function(){
				$shadowLeft.css({
					visibility: 'visible'
				});
				if (!$.browser.msie) {
					$shadowLeft.fadeTo("normal",1,'');
				}
			},
			function(){
				if (!$.browser.msie) {
					$shadowLeft.fadeTo("normal",0,'');
				} else {
					$shadowLeft.css({
						visibility: 'hidden'
					});
				}
			}
		);
	
		$btnRight.hover(
			function(){
				$shadowRight.css({
					visibility: 'visible'
				});
				if (!$.browser.msie) {
					$shadowRight.fadeTo("normal",1,'');
				}
			},
			function(){
				if (!$.browser.msie) {
					$shadowRight.fadeTo("normal",0,'');
				} else {
					$shadowRight.css({
						visibility: 'hidden'
					});
				}
			}
		);

		// slide right
	  	$btnRight.click(function() {
			var maskX = parseInt($masked.css('left'));
			if (maskX < 0 && !inMotion ) {
				inMotion = true;
				if (maskX + maskWidth >0) {
	   				$masked.animate({
						left: 0
						},speed,'easeOutBack',manageControls, false);  
				} else {	
					$masked.animate({
						left: (maskX + maskWidth)
						},speed,'easeOutBack',manageControls, false);
				}
			}
	   		return false;
	 	});

		manageControls =  function() {
			inMotion = false;
			if (panelCount>3) {
				var maskX = parseInt($masked.css('left'));
				if (maskX==0) {
					$btnLeft.css({ visibility: 'visible' });
					$btnRight.css({ visibility: 'hidden' });
					if ($.browser.msie) {
						$shadowRight.css({ visibility: 'hidden' });
					}
				} else if (maskX+totalWidth- maskWidth == 0) {
					$btnLeft.css({ visibility: 'hidden' });
					$btnRight.css({ visibility: 'visible' });
					if ($.browser.msie) {
						$shadowLeft.css({ visibility: 'hidden' });
					}
				} else {
					$btnLeft.css({ visibility: 'visible' });
					$btnRight.css({ visibility: 'visible' });
				}
			} else {
				$btnLeft.css({ visibility: 'hidden' });
				$btnRight.css({ visibility: 'hidden' });
			}
		}
		// set up initial controls state
		manageControls();
	}
	// <-- END homepage panels animation
	
	/* ------------------------------------------------------------------------ */
	// Contact form
	
	var url = /(https?:\/\/[^\/]+)/.exec(window.location.href)[1];
  	var $mask = $('#contact-mask');
  	var $btn = $('#contact-toggle');
 	 // stop the page jumping to the named anchor
 	//$btn.attr("href","");
  	$btn.click(function() {
   		$mask.slideArea('slow','',toggleBtn, false);  
   		return false;
 	});
 	 
 	 // form handling via ajax
  	var options={
  		//url:			url+'/assets/snippets/contact/contact.php?ajax=1',
  		url:			url+'/contact_ajax?ajax=1',
		beforeSubmit:	showRequest, //pre-submit callback
		success:		showResponse //post-submit callback
	};
	
	// bind form
	$('#frm-contact').ajaxForm(options);
	
	// checkbox behaviour
	$('input[type="checkbox"]').click(
		function() { 
			//alert($(this).attr('id'));
			//alert($(this).attr('checked'));
			if ($(this).attr('checked')) {
				$(this).parents('label').animate( { backgroundColor: '#9DA9AE' }, 1);
			} else {
				$(this).parents('label').animate( { backgroundColor: '#667373' }, 1);
			}
		}
	);
	// safari css fix for input fields
	var isSafari3 = false; 
	if( window.devicePixelRatio &&  window.getMatchedCSSRules && !window.Opera){
    	isSafari3  =  !!window.getMatchedCSSRules(document.documentElement,'');
	}
	if ($.browser.safari && !isSafari3) {
		$('.txt').css({
			width: '100%'
		});
		$('textarea').css({
			width: '100%'
		});
	}
	// gecko css fix for textarea
	if ($.browser.mozilla) {
		$('textarea.txt').css({
			height: '78px'
		});
	}
	
	// <-- END Contact form
	/* ------------------------------------------------------------------------ */
	
});


// contact form functions
function toggleBtn() {
	var $btn = $('#contact-toggle');
	if ($btn.attr("class") != "active") {
   		$btn.attr("class","active");
   	} else {
   		$btn.attr("class","");
	}
}

//pre-submit callback
function showRequest(formData,jqForm,options){
	var queryString = $.param(formData);
	//alert('About to submit:\n\n'+queryString);
	return true;
}

//post-submit callback
function showResponse(data, statusText){

	// note: converting to json manually because dataType: json is borked 
	data = window['eval']('(' + data + ')');

	var $errorOutput = $('#frm-output');

	// clean up
	$errorOutput.html("");
	
	$('.txt').animate( { backgroundColor: '#9DA9AE' }, 1);
	
	if (data.status == 'error') {
		// highlight error fields
		if (data.error.length > 0) {
			for (i=0; i<data.error.length;i++) {
				//animate
  				$('#'+data.error[i]).animate( { backgroundColor: '#99FFFF' }, 200).animate( { backgroundColor: '#78BBBB' }, 300);
			}
			$errorOutput.html(data.message);
		} else {
			$errorOutput.html(data.message);
		}
	} else if (data.status == 'success') {
		// hide form
		$("#frm-contact").css({
   			display: 'none'
 		});
		// show thank you message
		$('#contact').html($('#contact').html() + '<div id="success">' + data.message + '</div>');
		//resize the slide area
		 $('#contact-mask').slideArea('slow','','', true);
	}
}




