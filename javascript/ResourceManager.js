var ObjectPool = {
	pool : {},
	add : function(object){
		if (this.pool[object.type] === undefined) {
			this.pool[object.type] = [];
		}
		this.pool[object.type].push(object);
	}
};

var SpritePool = {
	//pool을 private하게 쓰고 싶으면 어떻게 해야 하는가?
	// init : function(){
	// 	this.pool = {};
	// 	this.loadCompleted = 0;
	// },
	
	pool : {},
	loadCompleted : 0,
	/**
	 * pool에 스프라이트 추가하는 함수. GameObject를 받아서 그 id값과 SpriteSrc값으로 image 엘리먼트를 자동 생성해서 추가한다.
	 * @param {[type]} object [description]
	 */
	add : function(object){
 		this.pool[object.id] = function(){
 			var img = new Image();
 			img.src = object.SpriteSrc;
 			// console.log(img);
 			img.onload = function(){
 				SpritePool.loadCompleted++;
 				//왜 this.SpritePool++로 하면 카운트가 안 올라가나?
 				//(this가 img가 됨)
 			};
 			return img;
 		}();
 	},
	get : function(id){
		// console.log(id);
 		return this.pool[id];
 	},
 	isLoadCompleted : function(){
 		var poolSize = Object.keys(this.pool).length;
 		// console.log(poolSize);
 		if (poolSize === this.loadCompleted) {
 			return true;
 		} else{
 			return false;
 		}
 	},
 	init : function(){
 		for (var eachArray in ObjectPool.pool){
 			for (var i in ObjectPool.pool[eachArray]){
 				this.add(ObjectPool.pool[eachArray][i]);
 			}
 		}
 	}
};
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

var SoundPool = {

};

