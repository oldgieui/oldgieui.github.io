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
	this.obj = {
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
		"SpriteSrc" : setting.SpriteSrc,
		"update" : setting.update,
		"render" : setting.render
		//render는 오브젝트 성격에 따라 정지된 이미지일 수도 있고 애니메이션일 수도 있으므로 각자 알아서 함수 갖고 있도록 한다.
		//
	};
}
GameObject.prototype.getType = function() {
	return this.obj.type;
};
GameObject.prototype.setType = function(type) {
	this.obj.type = type;
};
GameObject.prototype.getId = function() {
	return this.obj.id;
};
GameObject.prototype.setId = function(id) {
	this.obj.id = id;
};
GameObject.prototype.getWidth = function(){
	return this.obj.width;
};
GameObject.prototype.setWidth = function(width){
	this.obj.width = width;
};
GameObject.prototype.getHeight = function(){
	return this.obj.height;
};
GameObject.prototype.setHeight = function(height){
	this.obj.height = height;
};
GameObject.prototype.getPosX = function() {
	return this.obj.posX;
};
GameObject.prototype.setPosX = function(posX) {
	this.obj.posX = posX;
};
GameObject.prototype.getPosY = function() {
	return this.obj.posY;
};
GameObject.prototype.setPosY = function(posY) {
	this.obj.posY = posY;
};
GameObject.prototype.getVecX = function() {
	return this.obj.vecX;
};
GameObject.prototype.setVecX = function(vecX) {
	this.obj.vecX = vecX;
};
GameObject.prototype.getVecY = function() {
	return this.obj.vecY;
};
GameObject.prototype.setVecY = function(vecY) {
	this.obj.vecY = vecY;
};
GameObject.prototype.getAccelX = function() {
	return this.obj.accelX;
};
GameObject.prototype.setAccelX = function(accelX) {
	this.obj.accelX = accelX;
};
GameObject.prototype.getAccelY = function() {
	return this.obj.accelY;
};
GameObject.prototype.setAccelY = function(accelY) {
	this.obj.accelY = accelY;
};
GameObject.prototype.getSpriteSrc = function() {
	return this.obj.SpriteSrc;
};
GameObject.prototype.setSpriteSrc = function(SpriteSrc) {
	this.obj.SpriteSrc = SpriteSrc;
};
GameObject.prototype.update = function(dTime) {
	this.obj.update(dTime);
};
GameObject.prototype.setUpdate = function(updateFunc) {
	this.obj.update = updateFunc;
};
GameObject.prototype.setRender = function(renderFunc) {
	this.obj.render = renderFunc;
};
GameObject.prototype.render = function() {
	this.obj.render();
};
//함수 밖에서 prototype 사용해서 메소드 생성하면 실행이 안 됨. (obj가 not defined 됨)
//-> 해결. this.obj로 명시해준다. 
	//
	//
//new 선언할 때 입력하는 setting object의 프로퍼티들 값이 특정 타입이 아니면 아예 생성하지 않게 하고 싶은데 어떻게 해야 할까. if 처리했더니 빈 오브젝트로 생성됨...


// var ObjectArray = {
// 	array : [],
// 	add : function(object){
// 		array.push(object);
// 	},
// 	get : function(num){
// 		return array[num];
// 	},
// 	length : function(){
// 		return arr.length;
// 	}
// };