"use strict";

(function ()
{	
    $(document).ready(handleDocumentReady);
//	window.onerror = handleErrors;
	window.onkeydown = handleKeyDown;
	
	var context;
	var images = [];
	var circleImage, bgImage, luigiImage;
	
	var viewPort = new bto.ViewPort({});
	var block = new bto.Sprite({ position: { x: 5, y: 5 }, size: { width: 20*3, height: 34*3 }, zoom: 3, keyFrameCount: 3 });
	var koopa = new bto.Sprite({ position: { x: 480, y: 370 }, size: { width: 75, height: 76 }, zoom: 1, keyFrameCount: 1 });
	koopa.movement = new bto.VectorMovement({ speedX: -40 });
	
    return;

    
    function handleErrors(msg, url, line, col, error) 
    {
        var extra = !col ? '' : '\ncolumn: ' + col;
        extra += !error ? '' : '\nerror: ' + error;
        console.log("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);
        return true;
    }

    function handleDocumentReady()
    {
		console.log('Loading sprites');
		
		var canvas = $('#main-canvas')[0];
		context = canvas.getContext('2d');
		
		circleImage = loadImage("images/sprites_final.png");		
		bgImage = loadImage("images/background_a.png");
		luigiImage = loadImage("images/luigi_sprite.png");
		
		block.image = luigiImage;
		koopa.image = loadImage("images/koopa_troopa.png");
    }
	
	function loadImage(src)
	{
		var result = new Image();
		result.loaded = false;
		images.push(result);
		result.addEventListener("load", handleImageLoaded, false);		
		result.src = src;	
		return result;		
	}
	
	function handleImageLoaded(event)
	{
		var image = event.target;
		image.loaded = true;
		
		var pending = images.filter(function(x) { return !x.loaded; });
		if (pending.length === 0)
			animate();
	}
		
	function handleKeyDown(e)
	{
		var key = e.keyCode ? e.keyCode : e.which;
//		console.log('Key pressed ' + key);
		
		switch (key)
		{
			case 37: moveX(block, false);	break;
			case 38: moveY(block, true);	break;
			case 39: moveX(block, true);	break;
			case 40: moveY(block, false);	break;
		}
	}

	function moveY(sprite, up)
	{
		var bounds = sprite.getBounds();
		var yDiff = 5;
		if (up)
		{
			yDiff = -1 * yDiff;
			bounds.top += yDiff;
			yDiff += Math.max(0, 0 - bounds.top);									// limits smaller than viewPort's top edge (of zero)
		}
		else
		{
			bounds.bottom += yDiff;
			yDiff += Math.min(0, viewPort.size.height - bounds.bottom);				// limits larger than viewPort height
		}
		
		if (yDiff === 0)
			return;
		
		sprite.position.y += yDiff;
	}
	
	function moveX(sprite, right)
	{
		var bounds = sprite.getBounds()
		var xDiff = 5;
		if (right)
		{
			bounds.right += xDiff;
			xDiff += Math.min(0, viewPort.size.width - bounds.right);				// limits larger than viewPort width
		}
		else
		{
			xDiff = -1 * xDiff;
			bounds.left += xDiff;
			xDiff += Math.max(0, 0 - bounds.left);									// limits smaller than viewPort's left edge (of zero)
		}
		
		if (xDiff === 0)
			return;
		
		sprite.position.x += xDiff;
		sprite.addKeyFrame();
	}
	
	function animate() 
	{
		context.clearRect(0, 0, viewPort.viewable.width, viewPort.viewable.height);

		var vpTranslate = viewPort.setTranslate(block.getBounds());
		context.translate(vpTranslate.x, vpTranslate.y);
		
		var bgShift = -1 * vpTranslate.x;
		var bgShiftRepeat = bgShift % (viewPort.viewable.width * 2);
		context.drawImage(bgImage, 
			bgShiftRepeat, -1*vpTranslate.y, viewPort.viewable.width, viewPort.viewable.height, 
			bgShift, 	   -1*vpTranslate.y, viewPort.viewable.width, viewPort.viewable.height
			);

		var timestamp = Date.now();
		
		block.drawSprite(context);

		koopa.moveSprite(koopa.movement, timestamp);
		
		
		koopa.drawSprite(context);
		
		context.setTransform(1, 0, 0, 1, 0, 0);		// clears transform
		window.requestAnimationFrame(animate);
	}		
	
})();
