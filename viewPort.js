var bto;
if (bto == null)
    bto = {};
else if (typeof bto != 'object')
    throw "BTO is not valid: " + (typeof bto);

(function ()
{	
	function ViewPort(options)	
	{			
		options = options || {};
		this.size = options.size || { width: 640*10, height: 480 };
		this.viewable = options.viewable || { width: 640, height: 480 };
		this.currentTranslate = options.currentTranslate || { x: 0, y: 0};
		return this;		
	}

	bto.ViewPort = ViewPort;			

	ViewPort.prototype = {
		setTranslate: setTranslate
	};	
	
	function setTranslate(bounds)
	{
		var boundary = {
			left: Math.round(this.viewable.width * 0.10),
			right: Math.round(this.viewable.width * 0.90)
			};
			
		var desiredShift = boundary.right - bounds.right;								// as character goes right, shift gets more negative

		var newTranslate = { x: desiredShift, y: 0 };
		if (this.currentTranslate.x < newTranslate.x)
		{
			var leftBoundary = this.currentTranslate.x + (boundary.right - boundary.left) - (bounds.right - bounds.left);		
			if (newTranslate.x > leftBoundary)
			{
				var leftShift = newTranslate.x - leftBoundary;
				newTranslate.x = Math.min(0, this.currentTranslate.x + leftShift);  	// prevents from scrolling too far left
				
				this.currentTranslate = newTranslate;		
				return this.currentTranslate;
			}
			
			return this.currentTranslate;
		}

		newTranslate.x = Math.max(this.viewable.width - this.size.width, newTranslate.x);	// prevents from scrolling too far right
		
		this.currentTranslate = newTranslate;		
		return newTranslate;
	}
	
})();


