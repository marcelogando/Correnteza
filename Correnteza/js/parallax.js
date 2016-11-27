/**
 * Parallax Scrolling Tutorial
 * For NetTuts+
 *  
 * Author: Mohiuddin Parekh
 *	http://www.mohi.me
 * 	@mohiuddinparekh   
 */

jQuery(function($){

	var _rys = jQuery.noConflict(); 

_rys(document).ready(function(){
	// Cache the Window object
	_ryswindow = _rys(window);
                
   _rys('#para[data-type="background"]').each(function(){
     var _rysbgobj = _rys(this); // assigning the object
                    
      _rys(window).scroll(function() {
                    
		// Scroll the background at var speed
		// the yPos is a negative value because we're scrolling it UP!								
		var yPos = -(_ryswindow.scrollTop() / _rysbgobj.data('speed')); 
		
		// Put together our final background position
		var coords = '50% '+ yPos + 'px';

		// Move the background
		_rysbgobj.css({ backgroundPosition: coords });
		
}); // window scroll Ends

 });	

});

});
 
/* 
 * Create HTML5 elements for IE's sake
 */
document.createElement("section");






/* * * * * * * */






