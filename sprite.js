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
		this.zoom = typeof options.zoom === "number" ? options.zoom : 1;
		this.image = options.image || null;
		this.keyFrame = typeof options.keyFrame === "number" ? options.keyFrame : 0;
		this.keyFrameCount = typeof options.keyFrameCount === "number" ? options.keyFrameCount : 1;
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
	
	function addKeyFrame()
	{
		this.keyFrame += 1;
		if (this.keyFrame >= this.keyFrameCount)
			this.keyFrame = 0;		
	}

	function drawSprite(context)
	{		
		if (!this.image)
		{
			context.clearRect(this.position.x, this.position.y, this.size.width, this.size.height);			
		}
		else
		{
			context.drawImage(this.image, 
				this.keyFrame * this.size.width/this.zoom, 0, 
				this.size.width/this.zoom, this.size.height/this.zoom, 
				this.position.x, this.position.y, 
				this.size.width, this.size.height);
		}
	}
	
	bto.Sprite = Sprite;
	bto.Sprite.prototype.hasMoved = hasMoved;	
	bto.Sprite.prototype.resetMoved = resetMoved;	
	bto.Sprite.prototype.drawSprite = drawSprite;
	bto.Sprite.prototype.addKeyFrame = addKeyFrame;
})();


