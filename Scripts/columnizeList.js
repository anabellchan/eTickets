/**
 * Copyright (c) 2007 Ingo Schommer (www.chillu.com)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Splits a <ul>/<ol>-list into equal-sized columns.
 * 
 * Requirements: 
 * <ul>
 * <li>All list-elements need to have the same height.</li>
 * <li>List has to be blocklevel</li>
 * </ul>
 * 
 * Caution: margin-top/margin-left on <li> are overridden.
 * Doesn't react to changes to the DOM, you need to call the function
 * manually afterwards.
 * 
 * @see http://www.alistapart.com/articles/multicolumnlists

 * Adapated by Mark Croxton (www.hallmark-design.co.uk), April 11 2008 

 */
jQuery.fn.columnizeList = function(settings){
	settings = jQuery.extend({
		cols: 4,
		width: '176',
		height: '132',
		emSize: '12'
	}, settings);
	
  	var prevColNum = 0;
  	var size = $('li',this).size();
  	//var emSize = parseFloat($(this).css('font-size'));
  	var columnMaxItems = Math.ceil(size/settings.cols);
  	var resetPoint=columnMaxItems;
  	var currentColNum=0;
  	var colHeight= Math.ceil(size/settings.cols) * settings.height / settings.emSize;
  	
  
  	$(this).css({
  		height : colHeight+'em'
  	});
  	
  	$('li',this).each(function(i) {
		if(i == resetPoint) {
			$(this).css('margin-top','-'+colHeight+'em');
			currentColNum++;
  			resetPoint += columnMaxItems;
		} else {
			$(this).css('margin-top','0');
		}
		$(this).css('margin-left',(currentColNum*settings.width)+'px');

	});

	//this.css('height',(size/settings.cols)*(parseFloat($('li:first',this).height())/emSize)+'em');
	
	var onchange = function(e) {
		if(!e.originalTarget || e.originalTarget.tagName != 'LI') return true;
		var scope = this; // caution: closure
		setTimeout(function() {$(scope).columnizeList(settings);}, 50);
	};
	
	this.one('DOMNodeInserted',onchange);
	this.one('DOMNodeRemoved',onchange);
	
	return this;
};

$(document).ready(
	function() {
		$('#stores').columnizeList(); 
	}
);