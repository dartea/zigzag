/*
== jquery zigzag plugin == 
version: 1.0.0
author: DARTEA (http://www.dartea.com) 
plugin home: http://zigzag.dartea.com
*/

/*
Copyright 2013 DARTEA

This program is free software: you can redistribute it and/or modify 
it under the terms of the Apache v2 License. 

This program is distributed in the hope that it will be useful, 
but WITHOUT ANY WARRANTY; without even the implied warranty of 
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  

You should have received a copy of the Apache v2 License 
along with this program.  If not, see http://www.apache.org/licenses/LICENSE-2.0.html
*/
(function($){
	var ZigZagObj = {
		init:function(options){
			if($("#ZigZagLayer").length == 0)$('body').append('<div id="ZigZagLayer"></div>');
			if(options.item_target===undefined)$.error("ZigZagJS need a target !");
			return this.each(function(){
				var $this=$(this);
					/*click handler*/
					$this.click(function(){
						$(this).data(options);/*passing options by data*/
						$(this).ZigZag('startanimation');
					});
			});
		},
		startanimation:function(){
			var $this = this;
			var options_data = $this.data();/*retrive data*/
			var offset = $this.offset();
			var size   = {
				w : $this.outerWidth(true),
				h : $this.outerHeight(true)
			};

			/*reset if animtion already runnig*/
  			$('#ZigZagLayer').stop();
			$('#ZigZagLayer').removeClass('noscale');
			$('#ZigZagLayer').addClass('scale');
			/*default position and content layer*/
			$('#ZigZagLayer').html($this.html());
			$('#ZigZagLayer').css('left',offset.left+'px');
			$('#ZigZagLayer').css('top',offset.top+'px');
				
				
				var begin_animation = {opacity: 0.8}
				/*possibles  animations type*/
				switch(options_data.direction){
					default:
					case 'top':
						begin_animation.top = offset.top-size.h+"px";
					break;

					case 'bottom':
						begin_animation.top = offset.top+size.h+"px";
					break;

					case 'left':
						begin_animation.left =  offset.left-size.w+"px";
					break;

					case 'right':
						begin_animation.left =  offset.left+size.w+"px";
					break;

				}
					    
					    
				
				$('#ZigZagLayer').animate(begin_animation, 200, function() {
				  	
				    // Begin Animation complete.
				    var $target = $(options_data.item_target);
				    var targetoffset = $target.offset();

				    	$('#ZigZagLayer').addClass('noscale');
				    	 $('#ZigZagLayer').animate({
						    opacity: 0,
						    top: targetoffset.top+"px",
						    left: targetoffset.left+"px"
						  }, 600, function() {
						  		$('#ZigZagLayer').removeClass('scale');
						  		$('#ZigZagLayer').removeClass('noscale');
						    	// Animation complete.
						    	/*callback fun.*/
						    	$('#ZigZagLayer').html('');
						    	if(options_data.onFinish)options_data.onFinish($this);
						    	
						  });
					
				  });
			
		}
	};

	/*plugin fn*/
	$.fn.ZigZag=function(method){
		if(ZigZagObj[method]){
			return ZigZagObj[method].apply(this);
		}else if(typeof method==="object" || !method){
			return ZigZagObj.init.apply(this,arguments);
		}else{
			$.error("this method "+method+" does not exist for ZigZagJS");
		}
		
	
	};

	
})(jQuery);

