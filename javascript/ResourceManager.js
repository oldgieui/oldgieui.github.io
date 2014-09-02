var ObjectArray = {
	//array를 private하게 쓰려면? 
	array : [],
	add : function(object){
		this.array.push(object);
	},
	get : function(num){
		return this.array[num];
	},
	length : function(){
		return this.array.length;
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
 		this.pool[object.getId()] = function(){
 			var img = new Image();
 			img.src = object.getSpriteSrc();
 			// console.log(img);
 			img.onload = function(){
 				SpritePool.loadCompleted++;
 				//왜 this.SpritePool++로 하면 카운트가 안 올라가나?
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
 		for (var i = 0; i < ObjectArray.length(); i++) {
 			this.add(ObjectArray.get(i));
 		}
 	}
};

var SoundPool = {

};

