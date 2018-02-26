"use strict";

(function ()
{	
    $(document).ready(handleDocumentReady);
//	window.onerror = handleErrors;
	window.onkeydown = handleKeyDown;
	
	var context;
	var images = [];
	var circleImage, bgImage, luigiImage;
	
	var shift = 0;
	var frameWidth = 300;
	var frameHeight = 300;
	var totalFrames = 24;
	var currentFrame = 0;
	var bgShift = 0;
	
	var block = new bto.Sprite({ position: { x: 5, y: 5 }, size: { width: 20*3, height: 34*3 }, zoom: 3, keyFrameCount: 3 });
	var koopa = new bto.Sprite({ position: { x: 400, y: 370 }, size: { width: 75, height: 76 }, zoom: 1, keyFrameCount: 1 });
	
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
		var y = sprite.position.y;
		if (up)
			y = y - sprite.speed;
		else
			y = y + sprite.speed;
		
		if (y < 0 || y + sprite.size.height > context.canvas.height)
			return;
		
		sprite.position.y = y;
	}
	
	function moveX(sprite, right)
	{
		var x = sprite.position.x;
		if (right)
			x = x + sprite.speed;
		else
			x = x - sprite.speed;
		
		if (x < 0 || x + sprite.size.width > context.canvas.width)
			return;
		
		sprite.position.x = x;
		sprite.addKeyFrame();
	}
	
	function clearSprite(sprite)
	{
		context.clearRect(sprite.oldPosition.x, sprite.oldPosition.y, sprite.size.width, sprite.size.height);
	}
	
	function drawSprite(sprite)
	{		
//		context.drawImage(luigiImage, sprite.keyFrame*20, 0, 20, 34, sprite.position.x, sprite.position.y, 20*3, 34*3);
		sprite.drawSprite(context);
	}
	
	function animate() 
	{
		context.clearRect(0, 0, 640, 480);
		
		context.drawImage(bgImage, bgShift, 0, 640, 480, 0, 0, 640, 480);
		bgShift++;
		if (bgShift >= 640*2)
			bgShift = 0;
		
//		if (block.hasMoved())
//			clearSprite(block);
		
		// draw each frame + place them in the middle
//		context.clearRect(120, 25, 300, 300);
//		context.drawImage(circleImage, shift, 0, frameWidth, frameHeight, 120, 25, frameWidth, frameHeight);
//		shift += frameWidth + 1;
/*
		// Start over
		if (currentFrame == totalFrames) 
		{
			shift = 0;
			currentFrame = 0;
		}
		currentFrame++;
*/
//		if (block.hasMoved())
		
		block.drawSprite(context);
		
		koopa.drawSprite(context);
		
		block.resetMoved();
		window.requestAnimationFrame(animate);
	}		
	
})();
