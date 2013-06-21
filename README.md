Slide3D
=======

슬라이드 3D

큐브형태의 슬라이드 입니다.
다음 모바일따라한거 ㅋ

/**
 **************************************************************************
 * 작성자  : 이창기
 * 최초작성일: 2013/06/01
 * 제	목	: Slide3D 큐브형태의 슬라이드넘기기
 * 			  ie,opera등 css미지원 브라우져에서는 그냥 밀어내는 슬라이드로 작동합니다.
 * 
 * HTML		:
 * 	
	<div class="slide">
		<ul>
			<li>2222</li>
			<li>22222222222</li>
			<li>333333333333333</li>
			<li>44444444</li>
		</ul>
	</div>
	
 * 기능설명	: 
 * - 기본
 * 	$(".slide").slide3D();
 * 
 * 
 * - 자동롤링
 *  $(".slide").slide3D({
 *  	auto : 5000
 *  });
 *  
 * - 이전,다음 버튼
 *  $(".slide").slide3D({
 *  	btnPrev : $('.prev'),
 *  	btnNext : $('.next')  
 *  });
 *  
 *  -바로 이동 버튼
 *  (기본적으로 현재 보이는 item의 이미지파일명에 마지막_off,_on을 교체시킨다 이미지가 아닐경우 opacity로 선택된 항목을 구분할수있게끔 구현)
 *  $(".slide").slide3D({
 *  	btnPrev : $('.prev'),
 *  	btnNext : $('.next')  
 *  });
 * 
 * - 방향설정(앞으로 뒤로? 딱히 단어를 할게 없어서 그냥 forward)
 *  $(".slide").slide3D({
 *  	forward : true
 *  });
 * 
 * - 롤링효과
 * 	(jquery.easing.1.3.js plugin이 있어야지 됨 : easeInOutElastic,swing, 등등)
 *  $(".slide").slide3D({
 *  	easing : "easeInOutElastic"
 *  });
 * 
 * - 수직,수평
 *  $(".slide").slide3D({
 *  	vertical : false
 *  });
 * 
 * - 처음에 보여줄 item (1부터시작)
 *  $(".slide").slide3D({
 *  	start : 3
 *  });
 * 
 * 필수 jQuery plugin	
 * 			: jquery-1.7.2.js
 * 	`		  jquery.transform-0.9.4.min.js 
 * 주의사항	: jquery-1.8.2.js 에서는 jquery.transform 과 충돌난다 jquery.transform.js이 버젼업 되면 다시 적용해야할 듯
 * 			div의 width,height 를 꼭 지정해줄것
 **************************************************************************
 */
