function Update(dTime){
	for (var eachArray in ObjectPool.pool){
		for (var i in ObjectPool.pool[eachArray]){
			ObjectPool.pool[eachArray][i].update(dTime);
		}
	}
}

function Render(){
 	Utility.CanvasContext.clearRect(0, 0, Utility.ScreenWidth, Utility.ScreenHeight);
 	for (var eachArray in ObjectPool.pool){
		for (var i in ObjectPool.pool[eachArray]){
			ObjectPool.pool[eachArray][i].render();
		}
	}
	window.requestAnimationFrame(Render);
 }

 function gameLoop(){
 	Update(Utility.getDeltaTime());
 	Render();
 }

var Background = new GameObject({
	"type" : "object",
 	"id" : "Background",
 	"width" : Utility.ScreenWidth,
 	"height" : Utility.ScreenHeight,
 	"posX" : 0,
 	"posY" : 0,
 	"vecX" : 0,
 	"vecY" : 0,
 	"accelX" : 0,
 	"accelY" : 0,
 	"SpriteSrc" : "image/BGimage.png",
 	"update" : function(){
 		// console.log("deefasef");
 	},
 	"render" : function(){
 		// console.log(SpritePool.get(this.id));
 		//  console.log("posX : " + this.posX + " posY : " + this.posY);
 		Utility.CanvasContext.drawImage(SpritePool.get(this.id), 0, 0, this.width, this.height, this.posX, this.posY, this.width, this.height);
 	}
});

 var pc = new GameObject({
 	"type" : "character",
 	"id" : "pc",
 	"width" : 31,
 	"height" : 74,
 	"posX" : 200,
 	"posY" : 200,
 	"vecX" : 0,
 	"vecY" : 0,
 	"accelX" : 0,
 	"accelY" : -9.8,
 	"isJumping" : false,
 	"SpriteSrc" : "image/STAND_R_00.png",
 	"update" : function(dTime){
 		// debugger;
 		var keyState = ControlManager.KeyMap;
 		// console.log(keyState);
 		if (keyState.left === true && keyState.right === false) {
 			console.log("left pressed");
 			this.vecX = -180;
 		}
 		else if (keyState.right === true && keyState.left === false) {
 			this.vecX = 180;
 		}
 		else{
 			this.vecX = 0;
 		}
 		// console.log(this.vecX);
 		// if (keyState.spacebar === true && this.isJumping === false) {
 		// 	this.isJumping = true;
 		// 	//점프 관련은 나중에 추가하는 걸로
 		// }
 		//가속도가 어떻게 적용되는지 다시 알아볼것 
 		if (this.posX <= Utility.ScreenWidth - this.width && this.posX >= 0) {
 			this.posX = this.posX + ((this.vecX + (this.vecX * this.accelX)) * dTime);
 		}
 	},
 	"render" : function(){
 		 // console.log(SpritePool.get(this.id));
 		 // console.log("posX : " + this.posX + " posY : " + this.posY);
 		Utility.CanvasContext.drawImage(SpritePool.get(this.id), 0, 0, this.width, this.height, this.posX, this.posY, this.width, this.height);
 	}
 });

 function initObjectPool(){
 	ObjectPool.add(Background);
 	ObjectPool.add(pc);
 }

 function initGameEnvironment(){
 	Utility.initScreen(3/4);
 	initObjectPool();
	SpritePool.init();
 }

 window.addEventListener("load", function(){

 	/*
 	1. 인스턴스 생성(게임관련)
 	1.1 만들어진 인스턴스를 어레이에 보관.
 	2. 렌더링 시작 !
 	3. 루프를 돈다.
 	 */

	// debugger;
	initGameEnvironment();
	Utility.CanvasContext.font = Utility.ScreenWidth * 0.1 + "px serif";
	Utility.CanvasContext.fillText("Loading.....", Utility.ScreenWidth * 0.3, Utility.ScreenHeight * 0.45);
	var t = setInterval(function(){
		console.log("image loading....");
		if (SpritePool.isLoadCompleted()){
			clearInterval(t);
			console.log("complete.");
			// Utility.CanvasContext.drawImage(SpritePool.get(Background.id), 0, 0);
			// Render();
			setInterval(function(){
				// gameLoop();
				Update(Utility.getDeltaTime());
			}, Utility.FPS);
			Render();
		}
	}, 10);
}, false);