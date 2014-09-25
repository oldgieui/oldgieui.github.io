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
        this.DirectTouch.init();
        
	},
    DirectTouch : {
        CurPos : {
            X : -1,
            Y : -1
        },
        TouchMap : {
            "up" : false,
            "down" : false,
            "left" : false,
            "right" : false,
            "doubleTouch" : false
        },
        init : function(){
            window.addEventListener("touchstart", function(e){
                e.preventDefault();
                ControlManager.DirectTouch.setCurPos(e);
            }, false);
            window.addEventListener("touchmove", function(e){
                e.preventDefault();
                // console.log(e);
                ControlManager.DirectTouch.setTouchDirection(e);
            }, false);
            window.addEventListener("touchend", function(e){
                ControlManager.DirectTouch.resetTouchMap(e);
            }, false);
        },
        setCurPos : function(e){
            this.CurPos.X = e.touches[0].clientX;
            this.CurPos.Y = e.touches[0].clientY;
        },
        setTouchDirection : function(e){
            var newX = e.changedTouches[0].clientX;
            var newY = e.changedTouches[0].clientY;
            var dirX = newX - this.CurPos.X;
            var dirY = newY - this.CurPos.Y;
            this.CurPos.X = newX;
            this.CurPos.Y = newY;
            // console.log(dirX + ", " + dirY);
            if (dirX > 1) {
                this.TouchMap.right = true;
                this.TouchMap.left = false;
            } else if(dirX < -1){
                this.TouchMap.right = false;
                this.TouchMap.left = true;
            } else{
                this.TouchMap.right = false;
                this.TouchMap.left = false;   
            }
            if (dirY < -2) {
                this.TouchMap.up = true;
                this.TouchMap.down = false;
            } else if(dirY > 2){
                this.TouchMap.up = false;
                this.TouchMap.down = true;
            } else{
                this.TouchMap.up = false;
                this.TouchMap.down = false;
            }


            if (e.touches.length >= 2) {
                this.TouchMap.doubleTouch = true;
            }
        },
        resetTouchMap : function(e){
            if (e.touches.length === 0) {
                this.TouchMap.up = false;
                this.TouchMap.down = false;
                this.TouchMap.left = false;
                this.TouchMap.right = false;
                this.TouchMap.doubleTouch = false;
            }
            else if (e.touches.length === 1) {
                this.TouchMap.doubleTouch = false;
            }
        }
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
		// //console.log(e.which);
		// e.preventDefault();
		var str = "keydown : ";
		switch(keyCode){
            // case 119: //w
            // case 12616:
            case 38:
            	this.KeyMap.up = true;
	            //console.log(str + "up");
            	break;
            // case 97: //a
            // case 12609:
            case 37:
            	this.KeyMap.left = true;
	            //console.log(str + "left");
            	break;
            // case 115: //s
            // case 12596:
            case 40:
            	this.KeyMap.down = true;
				//console.log(str + "down");
            	break;
            // case 100: //d
            // case 12615:
            case 39:
            	this.KeyMap.right = true;
				//console.log(str + "right");
            	break;
            case 32 :
            	this.KeyMap.spacebar = true;
            	//console.log(str + "spacebar");
            	break;
            default:
				//console.log(str + keyCode);
        }
        // //console.log(this.KeyMap);
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
	            //console.log(str + "up");
            	break;
            case 37:
            	this.KeyMap.left = false;
	            //console.log(str + "left");
            	break;
            case 40:
            	this.KeyMap.down = false;
				//console.log(str + "down");
            	break;
            case 39:
            	this.KeyMap.right = false;
				//console.log(str + "right");
            	break;
            case 32 :
            	this.KeyMap.spacebar = false;
            	//console.log(str + "spacebar");
            	break;
            default:
				//console.log(str + keyCode);
    	}
    },

    
};