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

	//추후에 JSON 파일을 읽어와서 GameObject들을 동적으로 생성하는 기능을 넣자 
	init : function(){
		var Background = new this.GameObject({
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
			"update" : function(){},
			"render" : function(){
				Utility.CanvasContext.drawImage(ResourceManager.SpritePool.get(this.id), 0, 0, this.width, this.height);
			}
		});

		var pc = new this.GameObject({
			"type" : "character",
			"id" : "pc",
			"width" : Utility.ScreenWidth * 0.05,
			"height" : Utility.ScreenHeight * 0.07,
			"posX" : (Utility.ScreenWidth * 0.3),
			"posY" : (Utility.ScreenHeight * 0.85),
			"vecX" : 0,
			"vecY" : 0,
			"accelX" : 0,
			"accelY" : 0.5,
			"SpriteSrc" : "image/megaman.png",
			"isJumping" : false,
			"update" : function(dTime){
				var keyState = ControlManager.KeyMap;
				if (keyState.left === true && keyState.right === false) {
					this.vecX = -200;
				}
				else if (keyState.right === true && keyState.left === false) {
					this.vecX = 200;
				}
				else{
					this.vecX = 0;
				}

				if (keyState.spacebar === true && this.isJumping === false) {
					this.vecY = -10;
					this.isJumping = true;
				}


		 		// console.log(this.vecX);
		 		// if (keyState.spacebar === true && this.isJumping === false) {
		 		// 	this.isJumping = true;
		 		// 	//점프 관련은 나중에 추가하는 걸로
		 		// }
		 		//가속도가 어떻게 적용되는지 다시 알아볼것
		 		var xEnd = Utility.ScreenWidth - this.width;
		 		var yEnd = Utility.ScreenHeight - this.height * 2;
		 		if ((this.posX <= xEnd && this.posX >= 0) || (this.posX >= xEnd && this.vecX < 0) || (this.posX <= 0 && this.vecX > 0)) {
		 			this.posX = this.posX + ((this.vecX + (this.vecX * this.accelX)) * dTime);
		 		}
		 		if (this.posY <= yEnd && this.posY >= 0) {
		 			this.posY = this.posY + this.vecY;
		 			this.vecY = this.vecY + this.accelY;
		 		}
		 		else if (this.posY > yEnd) {
		 			this.posY = yEnd ;
		 			this.vecY = 0;
		 			this.isJumping = false;
		 		}
		 	},
		 	"render" : function(){
		 		Utility.CanvasContext.drawImage(ResourceManager.SpritePool.get(this.id), this.posX, this.posY, this.width, this.height);
		 	}
		});

		var ball = function(posX, posY){
			return {
				"type" : "enemy",
				"id" : "ball",
				"width" : Utility.ScreenWidth * 0.04,
				"height" : Utility.ScreenWidth * 0.04,
				"posX" : posX,
				"posY" : posY,
				"vecX" : 3,
				"vecY" : 2,
				"accelX" : 0,
				"accelY" : 0.1,
				"SpriteSrc" : "image/ball.jpg",
				"update" : function(dTime){
					var xEnd = Utility.ScreenWidth - this.width;
					var yEnd = Utility.ScreenHeight - this.height * 2;
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
						this.vecY = this.vecY * (-1) - this.vecY * (-1)%1;
					}
					else if (this.posY < 0) {
						this.posY = 0;
						this.vecY = this.vecY * (-0.9) - this.vecY * (-0.9)%1;
					}


					if (Utility.checkCollision(this, ObjectManager.ObjectPool.pool.character[0])) {
						console.log("hit!");
					}
				},
				"render" : function(){
					Utility.CanvasContext.drawImage(ResourceManager.SpritePool.get(this.id), this.posX, this.posY, this.width, this.height);
				}
			};
		};
		
		var ball1 = new this.GameObject(ball(Utility.ScreenWidth * 0.75 - Utility.ScreenWidth * 0.75 % 1, Utility.ScreenHeight * 0.35 - Utility.ScreenHeight * 0.35 % 1));
		var ball2 = new this.GameObject(ball(Utility.ScreenWidth * 0.25 - Utility.ScreenWidth * 0.25 % 1, Utility.ScreenHeight * 0.45 - Utility.ScreenHeight * 0.45 % 1));
		var ball3 = new this.GameObject(ball(Utility.ScreenWidth * 0.5 - Utility.ScreenWidth * 0.5 % 1, Utility.ScreenHeight * 0.1 - Utility.ScreenHeight * 0.1 % 1));
		var ball4 = new this.GameObject(ball(Utility.ScreenWidth * 0.9 - Utility.ScreenWidth * 0.9 % 1, Utility.ScreenHeight * 0.6 - Utility.ScreenHeight * 0.6 % 1));
		// var ball5 = new this.GameObject(ball(Utility.ScreenWidth * 0.1 - Utility.ScreenWidth * 0.1 % 1, Utility.ScreenHeight * 0.85 - Utility.ScreenHeight * 0.85 % 1));
	},
};

//new 선언할 때 입력하는 setting object의 프로퍼티들 값이 특정 타입이 아니면 아예 생성하지 않게 하고 싶은데 어떻게 해야 할까... 
//if 처리했더니 빈 오브젝트로 생성됨...

