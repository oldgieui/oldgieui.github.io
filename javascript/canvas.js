var canvas = {
	"init2d" : function (canvasId) {
		return document.getElementById(canvasId).getContext("2d");
	}
};

/**
 * 캔버스 사용법 파악, 스프라이트 삽입 기능 구현
 * gameloop 및 X축 이동 구현
 * Y축 이동 (점프 및 중력에 의한 낙하) 구현 
 * 충돌처리 및 게임 시스템 구현 
 * 스프라이트 애니메이션 구현
 * 
 *  
 * 
 */

