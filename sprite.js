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
		this.size = options.size || { width: 10, height: 10 }
		this.zoom = typeof options.zoom === "number" ? options.zoom : 1;
		this.image = options.image || null;
		this.keyFrame = typeof options.keyFrame === "number" ? options.keyFrame : 0;
		this.keyFrameCount = typeof options.keyFrameCount === "number" ? options.keyFrameCount : 1;
		return this;		
	}

	bto.Sprite = Sprite;			

	Sprite.prototype = {
		hasMoved: hasMoved,
		resetMoved: resetMoved,
		drawSprite: drawSprite,
		addKeyFrame: addKeyFrame,
		moveSprite: moveSprite,
		getBounds: getBounds
	};	
	
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
	
	function moveSprite(movement, timestamp)
	{		
		this.position = movement.move(this.position, timestamp);		
		return this.position;
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

	function getBounds()
	{
		return { 
			left: this.position.x, 
			top: this.position.y,
			right: this.position.x + this.size.width, 
			bottom: this.position.y + this.size.height,
			};
	}
})();


