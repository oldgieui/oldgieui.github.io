var ControlManager = {
	init : function(){
		var e = event ? event : window.event;
		document.body.addEventListener("keydown", function(e){
			var keyCode = (e.which)? e.which : e.keyCode;
			ControlManager.toggleKeyDown(keyCode);
		}, false);
		document.body.addEventListener("keyup", function(e){
			var keyCode = (e.which)? e.which : e.keyCode;
			ControlManager.toggleKeyUp(keyCode);
		}, false);
	},
	/**
	 * 현재 키 입력 상태를 확인하기 위한 오브젝트. 지금은 방향키와 스페이스바만 받음. 다른 키 처리가 필요하면 적당히 등록해서 쓴다. 
	 * @type {Object}
	 * 이 오브젝트에 대한 접근 권한이 활짝 열려 있는 게 마음에 안 드는데 어떻게 해야 적절하게 private처럼 쓸 수 있을까...
	 */
	KeyMap : {
		"up" : false,
		"down" : false,
		"left" : false,
		"right" : false,
		"spacebar" : false
	},
	/**
	 * 키가 눌렸을 때 키 코드 값을 받아서 KeyMap의 요소 값들을 True로 바꾼다. keydown event시에 발동하도록 EventListener를 등록해야 함.
	 * @param  {[type]} keyCode [description]
	 * @return {[type]}         [description]
	 */
	toggleKeyDown : function(keyCode){
		//브라우저마다 키 코드가 다를 수 있으므로 여기서 맵핑한다.
		// console.log(e.which);
		// e.preventDefault();
		var str = "keydown : ";
		switch(keyCode){
            // case 119: //w
            // case 12616:
            case 38:
            	this.KeyMap.up = true;
	            console.log(str + "up");
            	break;
            // case 97: //a
            // case 12609:
            case 37:
            	this.KeyMap.left = true;
	            console.log(str + "left");
            	break;
            // case 115: //s
            // case 12596:
            case 40:
            	this.KeyMap.down = true;
				console.log(str + "down");
            	break;
            // case 100: //d
            // case 12615:
            case 39:
            	this.KeyMap.right = true;
				console.log(str + "right");
            	break;
            case 32 :
            	this.KeyMap.spacebar = true;
            	console.log(str + "spacebar");
            	break;
            default:
				console.log(str + keyCode);
        }
        // console.log(this.KeyMap);
    },
    /**
     * 키를 눌렀다 뗐을 때 키 코드 값을 받아서 KeyMap의 요소 값들을 false로 바꾼다. keyup event시에 발동하도록 EventListener를 등록해야 함.
     * @param  {[type]} keyCode [description : event 객체로부터 keyCode를 뽑아서 넣어야함]
     * @return {[type]}         [description]
     */
    toggleKeyUp : function(keyCode){
    	var str = "keyup : ";
    	switch(keyCode){
    		case 38:
            	this.KeyMap.up = false;
	            console.log(str + "up");
            	break;
            case 37:
            	this.KeyMap.left = false;
	            console.log(str + "left");
            	break;
            case 40:
            	this.KeyMap.down = false;
				console.log(str + "down");
            	break;
            case 39:
            	this.KeyMap.right = false;
				console.log(str + "right");
            	break;
            case 32 :
            	this.KeyMap.spacebar = false;
            	console.log(str + "spacebar");
            	break;
            default:
				console.log(str + keyCode);
    	}
    },
    /**
     * 현재 KeyMap을 확인해서 값이 True인 것들만 합쳐서 반환함. (합친 값을 사용하므로 왼쪽 + 위 / 오른쪽 + 스페이스바 같은 동시입력 처리 가능)
     * @return {[type]} [description]
     */
    //이거 필요 없네.... 그냥 KeyMap을 바로 쓰면 되네..... 이거 만든다고 뻘짓 실컷 했는데 망함............
    getCurrentKeyState : function(){
    	var state = [];
    	for (var i in this.KeyMap){
    		if (this.KeyMap[i] === true) {
    			state.push(i);
    		}
    		// console.log( i + " : " + this.KeyMap[i]);
    	}
    	return state;
    },
    getKeyMap : function(){
    	return this.KeyMap;
    }
};

ControlManager.init();


// //미친 시발 방향키는 keypress가 안 되고 keydown만 뜬다 으아아아ㅏ 아ㅏㅏ
// document.body.addEventListener("keydown", function(e){
// 	var keyCode = (e.which)? e.which : e.keyCode;
// 	ControlManager.toggleKeyDown(keyCode);
// }, false);
