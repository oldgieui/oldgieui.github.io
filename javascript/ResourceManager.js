var ResourceManager = {
	SpritePool : {
		pool : {},
		loadCompleted : -3,
		/**
		 * pool에 스프라이트 추가하는 함수. GameObject를 받아서 그 id값과 SpriteSrc값으로 image 엘리먼트를 자동 생성해서 추가한다.
		 * @param {[type]} object [description]
		 */

		add : function(object){
			this.pool[object.id] = function(){
		 		var img = new Image();
		 		img.src = object.SpriteSrc;
		 		img.onload = function(){
 					ResourceManager.SpritePool.loadCompleted++;
 					//왜 this.SpritePool++로 하면 카운트가 안 올라가나?
 					//(this가 img가 됨)
 				};
 				return img;
 			}();
 		},
 		get : function(id){
			return this.pool[id];
		},
		isLoadCompleted : function(){
			var poolSize = Object.keys(this.pool).length;

			if (poolSize === this.loadCompleted) {
				return true;
			} else{
				return false;
			}
		},
		init : function(){
			for (var eachArray in ObjectManager.ObjectPool.pool){
				for (var i in ObjectManager.ObjectPool.pool[eachArray]){
					this.add(ObjectManager.ObjectPool.pool[eachArray][i]);
				}
			}
		}
	},

	// SoundPool : {

	// },

	init : function(){
		this.SpritePool.init();
	}
};

