var bto;
if (bto == null)
    bto = {};
else if (typeof bto != 'object')
    throw "BTO is not valid: " + (typeof bto);

(function ()
{	
	function Movement(options)	
	{			
		options = options || {};
		
		this.startTimestamp = typeof options.startTimestamp === "number" ? options.startTimestamp : null;
		
		return this;		
	}	
	
	Movement.prototype = {
		move: move,
		moveInitial: moveInitial,
		moveNext: moveNext
	};
	
	function move(position, timestamp)
	{
		var result;
		if (typeof this.startTimestamp !== "number")
		{			
			this.startTimestamp = timestamp;
			result = this.moveInitial(position);
		}
		else
		{
			var duration = timestamp - this.latestTimestamp;
			result = this.moveNext(position, duration);
		}	
		this.latestTimestamp = timestamp;
		return result;
	}
	
	function moveInitial(position)
	{
		// blank
		return position;
	}
	
	function moveNext(position, duration)
	{
		// blank
		return position;
	}
	
	bto.Movement = Movement;
})();


