var canvas = document.getElementById("canvas");

function GameObject(setting){
	if (typeof setting.type != "string") {
		console.log("GameObject.type is not a string");
		return;
	}
	else if (typeof setting.id != "string") {
		console.log("GameObject.id is not a string");
		return;
	} else if (typeof setting.vecX != "number" || typeof setting.vecY != "number") {
		console.log("vecX or vecY is not a number");
		return;
	} else if (typeof setting.accelX != "number" || typeof setting.accelY != "number") {
		console.log("accelX or accelY is not a number");
		return;
	} else if (setting.sprite instanceof Sprite !== true){
		console.log("You need a Sprite instance");
		return;
	} else if (typeof setting.update != "function") {
		console.log("You need an update method");
		return;
	} 
	var obj = {
		"type" : setting.type,
		"id" : setting.id,
		"vecX" : setting.vecX,
		"vecY" : setting.vecY,
		"accelX" :  setting.accelX,
		"accelY" : setting.accelY,
		"sprite" : setting.sprite,
		"update" : setting.update
	};		
	GameObject.prototype.getType = function() {
		return obj.type;
	};
	GameObject.prototype.setType = function(type) {
		obj.type = type;
	};
	GameObject.prototype.getId = function() {
		return obj.id;
	};
	GameObject.prototype.setId = function(id) {
		obj.id = id;
	};
	GameObject.prototype.getVecX = function() {
		return obj.vecX;
	};
	GameObject.prototype.setVecX = function(vecX) {
		obj.vecX = vecX;
	};
	GameObject.prototype.getVecY = function() {
		return obj.vecY;
	};
	GameObject.prototype.setVecY = function(vecY) {
		obj.vecY = vecY;
	};
	GameObject.prototype.getAccelX = function() {
		return obj.accelX;
	};
	GameObject.prototype.setAccelX = function(accelX) {
		obj.accelX = accelX;
	};
	GameObject.prototype.getAccelY = function() {
		return obj.accelY;
	};
	GameObject.prototype.setAccelY = function(accelY) {
		obj.accelY = accelY;
	};
	GameObject.prototype.setSprite = function(Sprite) {
		obj.sprite = Sprite;
	};
	GameObject.prototype.getSprite = function() {
		return obj.sprite;
	};
	GameObject.prototype.setUpdate = function(updateFunc) {
		obj.update = updateFunc;
	};
	//함수 밖에서 prototype 사용해서 메소드 생성하면 실행이 안 됨. (obj가 undefined가 됨)
}
//new 선언할 때 입력하는 setting object의 프로퍼티들 값이 특정 타입이 아니면 안 받도록 하고 싶은데 어떻게 해야 할까. if 처리했더니 빈 오브젝트로 생성됨...


function Sprite(setting){
	function createImage(imgSrc){
		var tempImg = new Image();
		tempImg.src = imgSrc;
		return tempImg;
	}

	var sprite = {
		// "context" : setting.context,
		"img" : createImage(setting.imgSrc),
		"width" : setting.width,
		"height" : setting.height,
		"posX" : setting.posX,
		"posY" : setting.posY
	};
	// Sprite.prototype.setContext = function(context) {
		// sprite.context = context;
	// }
	Sprite.prototype.getImg = function() {
		return sprite.img;
	};
	Sprite.prototype.setNewImg = function(img) {
		//이미지를 이미 생성한 경우 사용
		sprite.img = img;
	};
	Sprite.prototype.setNewImgSrc = function(imgSrc) {
		//소스만 지정해 주고 이미지를 새로 생성하려는 경우 사용
		sprite.img = createImage(imgSrc);
	};
	Sprite.prototype.getWidth = function(){
		return sprite.width;
	};
	Sprite.prototype.setWidth = function(width){
		sprite.width = width;
	};
	Sprite.prototype.getHeight = function(){
		return sprite.height;
	};
	Sprite.prototype.setHeight = function(height){
		sprite.height = height;
	};
	Sprite.prototype.getPosX = function() {
		return sprite.posX;
	};
	Sprite.prototype.setPosX = function(posX) {
		sprite.posX = posX;
	};
	Sprite.prototype.getPosY = function() {
		return sprite.posY;
	};
	Sprite.prototype.setPosY = function(posY) {
		sprite.posY = posY;
	};
}

// Sprite.prototype.render = function() {
// 	sprite.context.drawImage(this.sprite.img, 0, 0, this.sprite.width, this.sprite.height, 0, 0, this.sprite.width, this.sprite.height);
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

function Render(){
	var instance;

	Render = function Render(){
		return instance;
	};
	Render.prototype = this;

	instance = new Render();
	instance.constructor = Render;

	var context = canvas.getContext("2d");
	for (var i = 0; i < ObjectArray().length(); i++) {
		var sprite = ObjectArray().get(i).getSprite();
		context.drawImage(sprite.getImg(), sprite.getPosX(), sprite.getPosY(), sprite.getWidth(), sprite.getHeight());
		//캔버스로 그려야함 
		//스프라이트 객체가 render함수를 갖고 있고 이 Render에서는 그걸 실행만 시켜주는 방식으로 고쳐도 되겠다. 특히 애니메이션 들어가는 경우 해당 객체의 렌더 함수만 맞춰 놓으면 되고 여기서 애니메이션을 위한 처리를 따로 할 필요가 없어질 듯.
		//배경화면처럼 오브젝트 없이 스프라이트만 존재하는 경우를 위해서도 그게 낫겠네 
		//자고 일어나서 여기부터 고치자 
	}
}

function gameLoop(){
	Render();
}

