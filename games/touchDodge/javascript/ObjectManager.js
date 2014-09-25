var ObjectManager = {
	GameObject : function(setting){
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

		ObjectManager.ObjectPool.add(this);
	},

	ObjectPool : {
		pool : {},
		add : function(object){
			if (this.pool[object.type] === undefined) {
				this.pool[object.type] = [];
			}
			this.pool[object.type].push(object);
		}
	},

	createBall : function(posX, posY, vecX, vecY, accelX, accelY){
		// debugger;
		new this.GameObject({
			"type" : "enemy",
			"id" : "ball",
			"width" : 15,
			"height" : 15,
			"posX" : posX,
			"posY" : posY,
			"vecX" : vecX,
			"vecY" : vecY,
 			"accelX" : accelX,
 			"accelY" : accelY,
			"SpriteSrc" : "image/ball.png",
			"update" : function(dTime){
				var xEnd = Utility.ScreenWidth - this.width;
				var yEnd = Utility.ScreenHeight - this.height;
				if (this.posX <= xEnd && this.posX >= 0) {
					this.posX = this.posX + this.vecX;
					this.vecX = this.vecX + this.accelX;
				}
				else if (this.posX > xEnd) {
					this.posX = xEnd;
					this.vecX = this.vecX * -1;
					this.accelX = this.accelX * (-1);
				}
				else if (this.posX < 0) {
					this.posX = 0;
					this.vecX = this.vecX * -1;
					this.accelX = this.accelX * (-1);
				}
				if (this.posY <= yEnd && this.posY >= 0) {
					this.posY = this.posY + this.vecY;
					this.vecY = this.vecY + this.accelY;
				}
				else if (this.posY > yEnd) {
					this.posY = yEnd;
					this.vecY = this.vecY * -1;
					this.accelY = this.accelY * (-1);
				}
				else if (this.posY < 0) {
					this.posY = 0;
					this.vecY = this.vecY * -1;
					this.accelY = this.accelY * (-1);
				}
				if (Utility.checkCollision(this, ObjectManager.ObjectPool.pool.character[0])) {
					Utility.GameOver = true;
				}
			},
			"render" : function(){
				Utility.CanvasContext.drawImage(ResourceManager.SpritePool.get(this.id), this.posX, this.posY, this.width, this.height);
			}
		});
	},

	addBall : function(){
		var posX = Math.floor(Math.random() * Utility.ScreenWidth);
		var posY = Math.floor(Math.random() * Utility.ScreenHeight);
		var vecX = Math.floor(Math.random() * 4 + 2);
		var vecY = Math.floor(Math.random() * 4 + 2);
		var accelX = Math.floor(Math.random() * 2) * 0.001;
		var accelY = Math.floor(Math.random() * 2) * 0.001;
		ObjectManager.createBall(posX, posY, vecX, vecY, accelX, accelY);
 		window.setTimeout(ObjectManager.addBall, 5000);
	},

	//추후에 JSON 파일을 읽어와서 GameObject들을 동적으로 생성하는 기능을 넣자 
	init : function(){
		var pc = new this.GameObject({
			"type" : "character",
			"id" : "pc",
			"width" : 23 * 1.0,
			"height" : 24 * 1.0,
			"posX" : (Utility.ScreenWidth * 0.3),
			"posY" : (Utility.ScreenHeight * 0.85),
			"vecX" : 0,
			"vecY" : 0,
			"accelX" : 0,
			"accelY" : 0,
			"SpriteSrc" : "image/spaceship.png",
			"update" : function(dTime){
				var keyState;
				if (Utility.isTouchDevice() === true) {
					keyState = ControlManager.DirectTouch.TouchMap;
				} else{
					keyState = ControlManager.KeyMap;
				}
				if (keyState.left === true && keyState.right === false) {
					this.vecX = -200;
				}
				else if (keyState.right === true && keyState.left === false) {
					this.vecX = 200;
				}
				else{
					this.vecX = 0;
				}
				if (keyState.up === true && keyState.down === false) {
					this.vecY = -200;
				}
				else if (keyState.down === true && keyState.up === false) {
					this.vecY = 200;
				}
				else{
					this.vecY = 0;
				}

				var xEnd = Utility.ScreenWidth - this.width;
				var yEnd = Utility.ScreenHeight - this.height;
				if ((this.posX <= xEnd && this.posX >= 0) || (this.posX >= xEnd && this.vecX < 0) || (this.posX <= 0 && this.vecX > 0)) {
					this.posX = this.posX + ((this.vecX + (this.vecX * this.accelX)) * dTime);
				}
				if ((this.posY <= yEnd && this.posY >= 0) || (this.posY >= yEnd && this.vecY < 0) || (this.posY <= 0 && this.vecY > 0)) {
					this.posY = this.posY + ((this.vecY + (this.vecY * this.accelY)) * dTime);
				}
			},
			"render" : function(){
				Utility.CanvasContext.drawImage(ResourceManager.SpritePool.get(this.id), this.posX, this.posY, this.width, this.height);
			}
		});
		this.addBall();
		// this.createBall(Utility.ScreenWidth * 0.75, Utility.ScreenHeight * 0.35, 3, 3, 0, 0);
		// this.createBall(Utility.ScreenWidth * 0.25, Utility.ScreenHeight * 0.45, 3, 3, 0, 0);
		// this.createBall(Utility.ScreenWidth * 0.5, Utility.ScreenHeight * 0.1, 3, 3, 0, 0);
		// this.createBall(Utility.ScreenWidth * 0.9, Utility.ScreenHeight * 0.6, 3, 3, 0, 0);
	},
};
