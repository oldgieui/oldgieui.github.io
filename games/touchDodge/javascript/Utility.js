var Utility = {
	ScreenWidth : -1,
	ScreenHeight : -1,
	CanvasContext : undefined,
	FPS : 1000/60,
	GameOver : false,

	initScreen : function(screenRatio){
		if (screenRatio === undefined) {
			screenRatio = 9/16;
		}
		var height = window.innerHeight;
		var width = window.innerWidth;
		if (width > window.innerWidth) {
			width = window.innerWidth * 0.9;
			height = width * screenRatio;
		}
		var canvas = document.createElement("canvas");
		canvas.setAttribute("id", "GameScreen");
		canvas.setAttribute("width", width);
		canvas.setAttribute("height", height);
		canvas.style.left = ((window.innerWidth - width) / 2) + "px";
		canvas.style.position = "absolute";
		canvas.style.border="1px solid black";
		canvas.style.margin = "0px";
		canvas.style.padding = "0px";
		document.body.style.overflow = "hidden";
		document.body.style.padding = "0px";
		document.body.style.margin = "0px";
		document.body.appendChild(canvas);
		this.ScreenWidth = width;
		this.ScreenHeight = height;
		this.CanvasContext = canvas.getContext("2d");
	},

	/**
	 * only use this when you want set a read-only property. 
	 * point this function in your function scope.
	 * ex) 
	 * function ee(arg){
	 * 	  var val = arg;
	 * 	  //if you use function with closure to use val, there will be a memory leak problem.
	 * 	  //use getter
	 * 	  this.getVal = function(){
	 * 	  	return Utility.getter(val);
	 * 	  }
	 * }
	 * @return {[ty} [description]
	 */
	getter : function(arg){
		return arg;
	},

	getObjectPosition : function(obj){
		var position = {};
		position.top = obj.posY;
		position.bottom = position.top + obj.height;
		position.left = obj.posX;
		position.right = position.left + obj.width;
		return position;
	},

	checkCollision : function(objA, objB){
		var aPos = this.getObjectPosition(objA);
		var bPos = this.getObjectPosition(objB);

		if( (aPos.top < bPos.bottom) && 
			(aPos.bottom > bPos.top) && 
			(aPos.left < bPos.right) && 
			(aPos.right > bPos.left)){
			return true;
		}
		return false;
	},

	oldTime : Date.now(),

	getDeltaTime : function(){
		var newTime = Date.now();
		var deltaTime = (newTime - this.oldTime) * 0.001;
		this.oldTime = newTime;
		return deltaTime;
	},

	isTouchDevice : function(){
		return (
			('ontouchstart' in window) || 
			(navigator.MaxTouchPoints > 0) || 
			(navigator.msMaxTouchPoints > 0));
	},
};