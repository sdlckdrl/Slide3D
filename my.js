$(function(){

	jQuery(".slide").slide3D({
	    speed: 1000,
	    btnGo: $(".navi>.btn_area>li>a"),
	    btnNext : $(".navi>.control .next"),
	    btnPrev : $(".navi>.control .prev"),
	    btnStop : $(".navi>.control .pause"),
	    vertical : false,
//  	easing : "easeInOutElastic",
 	    auto:5000,
		start : 1
	});

});