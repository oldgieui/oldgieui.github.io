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
	this.type = setting.type;
	this.id = setting.id;
	this.width = setting.width;
	this.height = setting.height;
	this.posX = setting.posX;
	this.posY = setting.posY;
	this.vecX = setting.vecX;
	this.vecY = setting.vecY;
	this.accelX = setting.accelX;
	this.accelY = setting.accelY;
	this.SpriteSrc = setting.SpriteSrc;
	this.update = setting.update;
	this.render = setting.render;

	// ObjectArray.add(this.obj);
	// 오브젝트 생성과 동시에 ObjectArray에 넣게 하고 싶었으나 이렇게 하면 프로토타입에 있는 메서드들이 적용이 안 되더라...
}

//new 선언할 때 입력하는 setting object의 프로퍼티들 값이 특정 타입이 아니면 아예 생성하지 않게 하고 싶은데 어떻게 해야 할까... 
//if 처리했더니 빈 오브젝트로 생성됨...

/**
 * child of GameObject
 * create Player character, Enemies..
 * @param {[type]} setting [description]
 */
function Character(setting){

}