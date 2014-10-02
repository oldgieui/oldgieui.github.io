updateTime = 0;
function Update(dTime){
	if (Utility.GameOver === true) {
		return;
	}
	else{
		updateTime++;
		for (var eachArray in ObjectManager.ObjectPool.pool){
			for (var i in ObjectManager.ObjectPool.pool[eachArray]){
				ObjectManager.ObjectPool.pool[eachArray][i].update(dTime);
			}
		}
	}
}
renderTime = 0;
function Render(){
	if (Utility.GameOver === true) {
		Utility.CanvasContext.fillText("Game Over", Utility.ScreenWidth * 0.25, Utility.ScreenHeight * 0.45);	
		return;
	}
	else {
		renderTime++;
		Utility.CanvasContext.clearRect(0, 0, Utility.ScreenWidth, Utility.ScreenHeight);
		for (var eachArray in ObjectManager.ObjectPool.pool){
			for (var i in ObjectManager.ObjectPool.pool[eachArray]){
				ObjectManager.ObjectPool.pool[eachArray][i].render();
			}
		}
	}
 }

 function gameLoop(){
 	Update(Utility.getDeltaTime());
 	Render();
 	window.requestAnimationFrame(gameLoop);
 }

 function initGameEnvironment(){
 	ControlManager.init();
 	Utility.initScreen(3/4);
 	ObjectManager.init();
	ResourceManager.init();
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
		if (ResourceManager.SpritePool.isLoadCompleted()){
			clearInterval(t);
			console.log("complete.");
			gameLoop();
		}
	}, 10);
}, false);