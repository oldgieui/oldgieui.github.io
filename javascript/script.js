var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var FPS = 60;
var oldTime = Date.now();
var newTime;



// Sprite.prototype.render = function() {
// 	sprite.context.drawImage(this.sprite.image, 0, 0, this.sprite.width, this.sprite.height, 0, 0, this.sprite.width, this.sprite.height);
// };

// function ObjectArray(){
//  	var instance;

// 	ObjectArray = function ObjectArray(){
// 		return instance;
// 	};

// 	ObjectArray.prototype = this;
// 	//프로토타입을 변경하면 어떻게 되는가?

// 	instance = new ObjectArray();

// 	instance.constructor = ObjectArray;
// 	//constructor - 생성자 포인터 - 가 의미하는 바가 정확히 뭐지 

// 	var arr = []; 
// 	//instance.arr로 하면 사용불가 
// 	instance.add = function(obj){
// 		arr.push(obj);
// 	};
// 	instance.get = function(num){
// 		return arr[num];
// 	};
// 	instance.length = function(){
// 		return arr.length;
// 	};

// 	return instance;
// }

/**
 * 게임에 사용할 스프라이트는 모두 여기 보관함. 초기 사용시에 init을 따로 돌릴 것이다. 
 * 초기화한 결과, 스프라이트 풀에는 id값과 이미지 로드된 엘리먼트들이 들어간 오브젝트가 포함된다. 스프라이트를 실제 사용할 때 id값으로 불러다 사용하면 됨.
 * 풀에 모든 스프라이트 리소스가 로드되었는지 확인 후 게임이 시작되도록 만들어야 함.
 // */
 // function SpritePool(){
 // 	var instance; 
 // 	SpritePool = function SpritePool(){
 // 		return instance;
 // 	};
 // 	SpritePool.prototype = this;

 // 	instance = new SpritePool();
 // 	instance.constructor = SpritePool;

 // 	var pool = {};
 // 	var loadCompleted = 0;
 // 	instance.add = function(id, imgSrc){
 // 		pool[id] = function(){
 // 			var img = new Image();
 // 			img.src = imgSrc;
 // 			img.onload = function(){
 // 				loadCompleted++;
 // 			};
 // 			return img;
 // 		}();
 // 	};
 // 	instance.getSprite = function(id){
 // 		return pool[id];
 // 	};
 // 	instance.isLoadCompleted = function(){
 // 		var poolSize = Object.keys(pool).length;
 // 		if (poolSize === loadCompleted) {
 // 			return true;
 // 		} else{
 // 			return false;
 // 		}
 // 	};
 // 	instance.getPool = function(){
 // 		return pool;
 // 	};

 // 	return instance;
 // }

 function Update(dTime){
 	// var instance;

 	// Update = function Update(){
 	// 	return instance;
 	// };
 	// Update.prototype = this;

 	// instance = new Update();
 	// instance.constructor = Update;

 	for (var i = 0; i < ObjectArray.length(); i++) {
 		// console.log(dTime);
 		// console.log(ObjectArray.get(i));
 		ObjectArray.get(i).update(dTime);
 	}
 }

 function Render(){
 	// var instance;

 	// Render = function Render(){
 	// 	return instance;
 	// };
 	// Render.prototype = this;

 	// instance = new Render();
 	// instance.constructor = Render;

 	context.clearRect(0, 0, canvas.width, canvas.height);
 	for (var i = 0; i < ObjectArray.length(); i++) {
 		ObjectArray.get(i).render();
 	}
 }

 function gameLoop(){
 	newTime = Date.now();
 	var dTime = (newTime - oldTime)*0.001;
 	oldTime = newTime;
 	Update(dTime);
 	console.log(dTime);
 	Render();
 }

var Background = new GameObject({
	"type" : "object",
 	"id" : "Background",
 	"width" : 800,
 	"height" : 600,
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
 		context.drawImage(SpritePool.get(this.id), 0, 0, this.width, this.height, this.posX, this.posY, this.width, this.height);
 	}
});

 var pc = new GameObject({
 	"type" : "character",
 	"id" : "pc",
 	"width" : 31,
 	"height" : 74,
 	"posX" : 400,
 	"posY" : 450,
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
 			this.vecX = -120;
 		}
 		else if (keyState.right === true && keyState.left === false) {
 			this.vecX = 120;
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
 		if (this.posX <= canvas.width - this.width && this.posX >= 0) {
 			this.posX = this.posX + ((this.vecX + (this.vecX * this.accelX)) * dTime);
 		}
 	},
 	"render" : function(){
 		// console.log(SpritePool.get(this.id));
 		console.log("posX : " + this.posX + " posY : " + this.posY);
 		context.drawImage(SpritePool.get(this.id), 0, 0, this.width, this.height, this.posX, this.posY, this.width, this.height);
 	}
 });


 function initSpritePool(){
 	// console.log(pc);
 	// SpritePool().add("pc", "image/STAND_R_00.png");
 	// console.log(Background);
 	// SpritePool().add("Background", "image/BGimage.png");
 	// SpritePool.add(Background);
 	// SpritePool.add(pc);
 	SpritePool.init();
 }

 function initObjectArray(){
 	ObjectArray.add(Background);
 	ObjectArray.add(pc);
 }

 window.addEventListener("load", function(){

 	/*
 	1. 인스턴스 생성(게임관련)
 	1.1 만들어진 인스턴스를 어레이에 보관.
 	2. 렌더링 시작 !
 	3. 루프를 돈다.
 	 */

	// debugger;
	initObjectArray();
	initSpritePool();
	context.font = "50px serif";
	context.fillText("Loading.....", 280, 300);
	var t = setInterval(function(){
		console.log("image loading....");
		if (SpritePool.isLoadCompleted()){
			clearInterval(t);
			console.log("complete.");
			context.drawImage(SpritePool.get(Background.getId()), 0, 0);
			// Render();
			setInterval(function(){
				gameLoop();
			}, 1000/FPS);
		}
	}, 10);
}, false);