function getStyleValue(ele, key) {
	return parseInt(window.getComputedStyle(ele).getPropertyValue(key));
}

var scrollAnimation = {
	init : function(){
		this.curPos = 0;
		this.yMove = 0;
		this.container = document.getElementById("container");
		this.yRange = this.container.childElementCount;
		window.addEventListener("scroll", function(){
			scrollAnimation.run();
		}, false);
	},
	run : function(){
		var direction = window.scrollY - this.curPos;
		this.curPos = window.scrollY;
		if (direction < 0) {
			this.yMove += 1;
		} else if (direction > 0){
			this.yMove -= 1;
		}
		console.log(this.yMove);
		if (this.yMove > 0 ) {
			this.yMove = 0;
		}else if (this.yMove <= (this.yRange * -1)) {
			this.yMove = (this.yRange * -1) + 1;
		}
		this.container.style.webkitTransform ="translate3d(0px," + this.yMove * 100 + "%, 0px)";

	}
};

window.addEventListener("load", function(){
	// scrollAnimation.init();
}, false);

