$(function(){

	$(".slide1").slide3D({
	    speed: 1000,
	    btnGo: $("#aaa .btngo"),
	    btnNext : $("#aaa .btnnext"),
	    btnPrev : $("#aaa .btnprev"),
	    vertical : true,
  	    //easing : "easeInOutElastic",
  	    auto:3000
	});

	jQuery(".slide2").slide3D({
	    speed: 1000,
	    btnGo: $("#bbb .btngo"),
	    btnNext : $("#bbb .btnnext"),
	    btnPrev : $("#bbb .btnprev"),
	    vertical : false,
//  	easing : "easeInOutElastic",
// 	    auto:3000
		start : 7
	});

});