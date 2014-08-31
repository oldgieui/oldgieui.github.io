var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

function GameObject(setting){
	// debugger;
	// if (typeof setting.type != "string") {
	// 	console.log("GameObject.type is not a string");
	// 	return;
	// }
	// else if (typeof setting.id != "string") {
	// 	console.log("GameObject.id is not a string");
	// 	return;
	// } else if (typeof setting.vecX != "number" || typeof setting.vecY != "number") {
	// 	console.log("vecX or vecY is not a number");
	// 	return;
	// } else if (typeof setting.accelX != "number" || typeof setting.accelY != "number") {
	// 	console.log("accelX or accelY is not a number");
	// 	return;
	// } else if (setting.sprite instanceof Sprite !== true){
	// 	console.log("You need a Sprite instance");
	// 	return;
	// } else if (typeof setting.update != "function") {
	// 	console.log("You need an update method");
	// 	return;
	// } 
	GameObject.obj = {
		"type" : setting.type,
		"id" : setting.id,
		"width" : setting.width,
		"height" : setting.height,
		"posX" : setting.posX,
		"posY" : setting.posY,
		"vecX" : setting.vecX,
		"vecY" : setting.vecY,
		"accelX" : setting.accelX,
		"accelY" : setting.accelY,
		"spriteId" : setting.spriteId,
		"update" : setting.update,
		"render" : setting.render
		//render는 오브젝트 성격에 따라 정지된 이미지일 수도 있고 애니메이션일 수도 있으므로 각자 알아서 함수 갖고 있도록 한다.
	};		
}
GameObject.prototype.getType = function() {
	return GameObject.obj.type;
};
GameObject.prototype.setType = function(type) {
	GameObject.obj.type = type;
};
GameObject.prototype.getId = function() {
	return GameObject.obj.id;
};
GameObject.prototype.setId = function(id) {
	GameObject.obj.id = id;
};
GameObject.prototype.getWidth = function(){
	return GameObject.obj.width;
};
GameObject.prototype.setWidth = function(width){
	GameObject.obj.width = width;
};
GameObject.prototype.getHeight = function(){
	return GameObject.obj.height;
};
GameObject.prototype.setHeight = function(height){
	GameObject.obj.height = height;
};
GameObject.prototype.getPosX = function() {
	return GameObject.obj.posX;
};
GameObject.prototype.setPosX = function(posX) {
	GameObject.obj.posX = posX;
};
GameObject.prototype.getPosY = function() {
	return GameObject.obj.posY;
};
GameObject.prototype.setPosY = function(posY) {
	GameObject.obj.posY = posY;
};
GameObject.prototype.getVecX = function() {
	return GameObject.obj.vecX;
};
GameObject.prototype.setVecX = function(vecX) {
	GameObject.obj.vecX = vecX;
};
GameObject.prototype.getVecY = function() {
	return GameObject.obj.vecY;
};
GameObject.prototype.setVecY = function(vecY) {
	GameObject.obj.vecY = vecY;
};
GameObject.prototype.getAccelX = function() {
	return GameObject.obj.accelX;
};
GameObject.prototype.setAccelX = function(accelX) {
	GameObject.obj.accelX = accelX;
};
GameObject.prototype.getAccelY = function() {
	return GameObject.obj.accelY;
};
GameObject.prototype.setAccelY = function(accelY) {
	GameObject.obj.accelY = accelY;
};
GameObject.prototype.getSpriteId = function() {
	return GameObject.obj.spriteId;
};
GameObject.prototype.setSpriteId = function(spriteId) {
	GameObject.obj.spriteId = spriteId;
};
GameObject.prototype.setUpdate = function(updateFunc) {
	GameObject.obj.update = updateFunc;
};
GameObject.prototype.setRender = function(renderFunc) {
	GameObject.obj.render = renderFunc;
};
GameObject.prototype.render = function() {
	GameObject.obj.render();
};
//함수 밖에서 prototype 사용해서 메소드 생성하면 실행이 안 됨. (obj가 not defined 됨)
	//
	//
//new 선언할 때 입력하는 setting object의 프로퍼티들 값이 특정 타입이 아니면 아예 생성하지 않게 하고 싶은데 어떻게 해야 할까. if 처리했더니 빈 오브젝트로 생성됨...

// Sprite.prototype.render = function() {
// 	sprite.context.drawImage(this.sprite.image, 0, 0, this.sprite.width, this.sprite.height, 0, 0, this.sprite.width, this.sprite.height);
// };

function ObjectArray(){
	var instance;

	ObjectArray = function ObjectArray(){
		return instance;
	};

	ObjectArray.prototype = this;
	//프로토타입을 변경하면 어떻게 되는가?

	instance = new ObjectArray();

	instance.constructor = ObjectArray;
	//constructor - 생성자 포인터 - 가 의미하는 바가 정확히 뭐지 

	var arr = []; 
	//instance.arr로 하면 사용불가 
	instance.add = function(obj){
		arr.push(obj);
	};
	instance.get = function(num){
		return arr[num];
	};
	instance.length = function(){
		return arr.length;
	};

	return instance;
}

/**
 * 게임에 사용할 스프라이트는 모두 여기 보관함. 초기 사용시에 init을 따로 돌릴 것이다. 
 * 초기화한 결과, 스프라이트 풀에는 id값과 이미지 로드된 엘리먼트들이 들어간 오브젝트가 포함된다. 스프라이트를 실제 사용할 때 id값으로 불러다 사용하면 됨.
 * 풀에 모든 스프라이트 리소스가 로드되었는지 확인 후 게임이 시작되도록 만들어야 함.
 */
 function SpritePool(){
 	var instance; 
 	SpritePool = function SpritePool(){
 		return instance;
 	};
 	SpritePool.prototype = this;

 	instance = new SpritePool();
 	instance.constructor = SpritePool;

 	var pool = {};
 	var loadCompleted = 0;
 	instance.add = function(id, imgSrc){
 		pool[id] = function(){
 			var img = new Image();
 			img.src = imgSrc;
 			img.onload = function(){
 				loadCompleted++;
 			};
 			return img;
 		}();
 	};
 	instance.getSprite = function(id){
 		return pool[id];
 	};
 	instance.isLoadCompleted = function(){
 		var poolSize = Object.keys(pool).length;
 		if (poolSize === loadCompleted) {
 			return true;
 		} else{
 			return false;
 		}
 	};
 	instance.getPool = function(){
 		return pool;
 	};

 	return instance;
 }

 function Update(){
 	var instance;

 	Update = function Update(){
 		return instance;
 	};
 	Update.prototype = this;

 	instance = new Update();
 	instance.constructor = Update;

 	for (var i = 0; i < ObjectArray().length(); i++) {
 		ObjectArray().get(i).update();
 	}
 }

 function Render(){
 	var instance;

 	Render = function Render(){
 		return instance;
 	};
 	Render.prototype = this;

 	instance = new Render();
 	instance.constructor = Render;

 	for (var i = 0; i < ObjectArray().length(); i++) {
 		ObjectArray().get(i).render();
 	}
 }

 function gameLoop(){
 	Update();
 	Render();
 }

 function initSpritePool(){
 	SpritePool().add("background", "image/BGimage.png");
 	SpritePool().add("pc", "image/STAND_R_00.png");
 }

 var pc = new GameObject({
 	"type" : "character",
 	"id" : "pc",
 	"width" : 31,
 	"height" : 74,
 	"posX" : 400,
 	"posY" : 500,
 	"vecX" : 0,
 	"vecY" : 0,
 	"accelX" : 0,
 	"accelY" : 0,
 	"spriteId" : "image/STAND_R_00.png",
 	"update" : function(){

 	},
 	"render" : function(){
 		context.drawImage(SpritePool().getSprite(this.id), 0, 0, this.width, this.height, this.posX, this.posY, this.width, this.height);
 	}
 });

 var tob = {
 	arr : {},
 	ff : function add(name, value){
 		this.arr[name] = value;
 	}
 };

 window.addEventListener("load", function(){
	// debugger;
	initSpritePool();
	context.font = "50px serif";
	context.fillText("Loading.....", 280, 300);
	var t = setInterval(function(){
		console.log("image loading....");
		if (SpritePool().isLoadCompleted()){
			console.log("complete.");
			context.drawImage(SpritePool().getSprite("background"), 0, 0);
			clearInterval(t);
		}
	}, 10);
}, false);