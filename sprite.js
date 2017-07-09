"use strict";

var bto;
if (bto == null)
    bto = {};
else if (typeof bto != 'object')
    throw "BTO is not valid: " + (typeof bto);


(function ()
{	
	function Sprite(options)	
	{			
		options = options || {};
		this.position = options.position || { x: 0, y: 0 };
		this.oldPosition = { x: -1, y: -1};								// starts with hasMoved to true
		this.speed = options.speed || 5;
		this.size = options.size || { width: 10, height: 10 }
		return this;		
	}	
	
	function hasMoved()
	{
		return this.oldPosition.x !== this.position.x || this.oldPosition.y !== this.position.y;
	}
	
	function resetMoved()
	{
		this.oldPosition = $.extend(this.oldPosition, this.position);
	}
	
	bto.Sprite = Sprite;
	bto.Sprite.prototype.hasMoved = hasMoved;	
	bto.Sprite.prototype.resetMoved = resetMoved;	
})();


