/*
Title:     		Gallery
Desc:			Thumbnail gallery with jquery
Author:     	Mark Croxton, mcroxton@hallmark-design.co.uk
Copyright:		Hallmark Design
Updated:    	April 04 2008
*/

// GalleryImage class
var GalleryImage = function (image,title) {	
	
	// private vars
	var self = this; // get the scope of the instantiated object
		
	// public instance variables
	this.image = image; // array
	this.title = title; 
}

// Gallery object (literal notation)
var Gallery = {
	
	//default config
	imageId : '#bigImg',	
	loadId : '#loading',
	thumbs : '#thumbs > li > a', // selector for image thumb links
	CSSselectedClass : 'active', // css class to apply to selected items
	startImg : 0,
	startShowImg : true,
	aImages : new Array (),
		
	//private vars
	selectedImg : -1,
	isPaused : false,
	imgLinks : new Array (),
	loaded : false,
	
	showImg : function (img) {
		if (Gallery.loaded && !Gallery.isPaused && Gallery.selectedImg != img) {
			if (img !=-1) {
				Gallery.showImage(img);
				//manage links
				Gallery.manageLinks(img);
			}
		}
	},
	
	manageLinks : function (img) {
		//set css class on thumbnail images
		for (i=0; i<Gallery.imgLinks.length; i++) {
			if(i === img) { // set selected class
				Gallery.imgLinks[i].attr("class",Gallery.CSSselectedClass);
			} else { //remove class attribute
				Gallery.imgLinks[i].removeAttr("class");
			}

		}
	},
	
	swapImage : function (img) {
		$bigImg =  $(Gallery.imageId);
   		$bigImg.attr("src", Gallery.aImages[img].image);
		$bigImg.attr("alt", Gallery.aImages[img].title);
		$bigImg.attr("title", Gallery.aImages[img].title);
	},

	showImage : function (img) {

		// show loadmeter 
		$loading=$(Gallery.loadId);
		$loading.css({
			display: "block"
		});
		
		$loading.fadeTo(200,1, function() {
			// preload image into a temporary image object so that it is cached
			imgPreload = new Image();
			
			// onload
			imgPreload.onload=function(){
				Gallery.swapImage(img);
					
				//fade out loading
				// pass the killPause() function to be called back on completion
				Gallery.isPaused = true;
				Gallery.selectedImg = img;
				$loading.fadeTo("slow",0,Gallery.killPause);
			}	
			imgPreload.src = Gallery.aImages[img].image;
			
		});
	},
	
	killPause: function() {
		Gallery.isPaused = false;
	},

	attachLinkBehavior : function () {	
		$(Gallery.thumbs).each(
			//lopp trough each item found
			function (i) {
				//build array of big images
				Gallery.aImages.push(new GalleryImage($(this).attr("href"),$(this).attr("title")));
				// build array of thumbs
				Gallery.imgLinks.push($(this));
				
				$(this).bind (
					"click",
					function(){
						// do stuff on click
						Gallery.showImg(i);
						return false; // stop link being followed
					}
				);
			}
		);
	},
	
	init : function () {
		// add link behaviour
		Gallery.attachLinkBehavior();
		Gallery.loaded=true;
   		if (Gallery.startShowImg) {
			//show start image
			Gallery.showImg(Gallery.startImg);
		}
	}
}

//initialise gallery
$(document).ready(function() {
	Gallery.init();
});