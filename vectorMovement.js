var bto;
if (bto == null)
    bto = {};
else if (typeof bto != 'object')
    throw "BTO is not valid: " + (typeof bto);

(function ()
{	
	function VectorMovement(options)	
	{				
		bto.Movement.call(this, options);

		options = options || {};		
		
		// All speeds are pixels per second
		this.speedX = options.speedX || 0;
		this.speedY = options.speedY || 0;
		this.maxSpeedX = typeof options.maxSpeedX === "number" ?  options.maxSpeedX : -10000;
		this.maxSpeedY = typeof options.maxSpeedY === "number" ?  options.maxSpeedY : -10000;
		this.minSpeedX = typeof options.minSpeedX === "number" ?  options.minSpeedX : -10000;
		this.minSpeedY = typeof options.minSpeedY === "number" ?  options.minSpeedY : -10000;
		
		return this;		
	}	
	
	VectorMovement.prototype = {
		moveNext: moveNext
	};
	VectorMovement.prototype.__proto__ = bto.Movement.prototype;
	
	bto.VectorMovement = VectorMovement;
	
	function moveNext(position, duration)
	{
		return {
			x: position.x + Math.round(this.speedX * duration / 1000),
			y: position.y + Math.round(this.speedY * duration / 1000),
		}
	}	
})();


