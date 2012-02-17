var FullScreen = function(canvas) {
   
	var enabled = false;
	
	// Private method
    var enter = function() {
	  enabled = true;
	  if (canvas.webkitRequestFullScreen) {
	    canvas.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	  } else {
	    canvas.mozRequestFullScreen();
	  }
    };

	var exit = function(){
		 enabled = false;
		 document.cancelFullScreen();
	}

    // Begin public section
    return {
        enter: enter, exit: exit,
		toggle:function(){
			if (!enabled){
				enter();
			}
			else {
				exit();
			}
		}
    };
};




