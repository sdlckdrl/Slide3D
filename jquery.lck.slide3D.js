/**
 **************************************************************************
 * 작성자	: 이창기
 * 최초작성일: 2013/06/01
 * 제	목	: Slide3D 1.0
			  큐브형태의 슬라이드넘기기
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
(function($) {
$.fn.slide3D = function(o) {
    o = $.extend({
        auto: null,
        forward : false,
        speed: 200,
        easing: null,
        
        btnGo: null,
        btnPrev: null,
        btnNext: null,
        start: 0,
        vertical: false,
		useCube : true 
    }, o || {});

    return this.each(function() {
    	var otherBrowser=null,html5Browser=null;
    	var browser = null;
    	var $div = $(this), $ul = $div.children("ul"), $li = $ul.children("li"), $tli = $li.clone();
    	var sizeCss=o.vertical?"height":"width"; 
    	var animCss=o.vertical?"top":"left";
    	var degree = 0;
    	var angle = -180;
        var move=0, isMove=false, beforePos=null, initPos=null;
    	var width = $div.innerWidth();
    	var height = $div.innerHeight();
    	var liSize = o.vertical ? height : width;		
    	var ulSize;
    	var percentPx = liSize/100;
    	var timer=null;

    	html5Browser = {
    		v : {fview:2, farr:1, rview:0, rarr:$tli.size()-1, curr:1},
			init : function(){
		    	$ul.prepend($tli.slice($tli.size()-1).clone()).append($tli.slice(0,1).clone());//앞뒤로 붙여주기
		    	$ul.children("li:gt(3)").remove();//4개 초과분은 삭제
		    	$li = $ul.children("li");//바뀐 목록 재설정
				
				$li.css({
	    			width: width,
	    			height: height
	        	}).each(function(i, obj){
	        		$(this).css({ 
	            		position:(i==3)?"relative":"absolute",
	        			float: (i==3)?"none":"left",
	        			rotateY: (o.vertical?0:(angle+=90))+"deg",
	        			rotateX: (o.vertical?(angle+=90):0)+"deg",
	        			translateZ: (o.vertical?height/2:width/2)+"px"
	        		});
	        	});
	        	
	            $ul.css({
	            	"position":"relative",
	            	"z-index": "1",
	            	"margin": "0px", 
	            	"padding": "0px", 
	            	"list-style-type": "none",
	            	"-webkit-transform-style" : "preserve-3d",
	            	"-moz-transform-style" : "preserve-3d",
	            	"-ms-transform-style" : "preserve-3d",
	            	"-o-transform-style" : "preserve-3d",
	            	"transform-style" : "preserve-3d",
	            	scale: [0.75, 0.75]
	            });
	            $div.css({
	            	origin: ['50%', '50%'],
	            	"z-index": "2",
	            	"-webkit-perspective": (o.vertical?height*2:width*2)+"px",
	            	"-moz-perspective": (o.vertical?height*2:width*2)+"px",
	            	"-ms-perspective": (o.vertical?height*2:width*2)+"px",
	            	"-o-perspective": (o.vertical?height*2:width*2)+"px",
	                "perspective": (o.vertical?height*2:width*2)+"px"
	            });

	    		$ul.bind("mousedown touchstart", this.DragStart)
	            	.bind("mousemove touchmove", this.DragMove)
	    			.bind("mouseup touchend touchcancel", this.DragEnd);
	            $ul.bind("mouseleave", this.DragEnd);
	            $(window).bind("resize orientationchange", this.resizeWindow);
    		},
    		DragStart : function(e){
            	if(e.type === 'mousedown'){
            		e.preventDefault();
    				e.stopPropagation();
            	}
            	initPos = pointerEventToXY(e);
            	beforePos=initPos;
            	move = 0;
            	isMove = true;
    		},
    		DragMove : function(e){
    			if(!isMove) return false;
        		var pos2 = pointerEventToXY(e);
        		if(o.vertical){
        			if(Math.abs(initPos.y-pos2.y)>3){	//스크롤 문제때문에 조금움직인후 죽임
            			e.preventDefault();
        				e.stopPropagation();
            		}
        			if(beforePos.y < pos2.y){
        				o.forward = true;
        			}else{
        				o.forward = false;
        			}
    				move = Math.abs(parseInt((pos2.y-initPos.y) / percentPx));
            		beforePos = pos2;
            		$ul.css({
            			rotateX: -(degree+(pos2.y-initPos.y) / percentPx)+'deg'
            		});
        		}else{
            		if(Math.abs(initPos.x-pos2.x)>3){	//스크롤 문제때문에 조금움직인후 죽임
            			e.preventDefault();
        				e.stopPropagation();
            		}
        			if(beforePos.x < pos2.x){
        				o.forward = true;
        			}else{
        				o.forward = false;
        			}
    				move = Math.abs(parseInt((pos2.x-initPos.x) / percentPx));
            		beforePos = pos2;
            		$ul.css({
            			rotateY: degree+(pos2.x-initPos.x) / percentPx+'deg'
            		});
        		}
    		},
    		DragEnd : function(){
    			if(!isMove)
            		return;
            	isMove = false;
            	if(20 < move){
            		html5Browser.rotateCalc();
            		$ul.animate({
	            		rotateY: (o.vertical?0:degree)+'deg',
	            		rotateX: (o.vertical?-degree:0)+'deg'
	            	},300, o.easing, html5Browser.endCheck);
            	}else{
        			$ul.animate({
	            		rotateY: (o.vertical?0:degree)+'deg',
	            		rotateX: (o.vertical?-degree:0)+'deg'
                	},300);
            	}
    		},
    		resizeWindow : function(){
            	width = $div.innerWidth();
            	percentPx = width/100;
            	$li.css({
        			"width": width
            	}).each(function(i, obj){
            		$(this).css({ 
	            		position:(i==3)?"relative":"absolute",
	        			float: (i==3)?"none":"left",
	        			rotateY: (o.vertical?0:(angle+=90))+"deg",
	        			rotateX: (o.vertical?(angle+=90):0)+"deg",
	        			translateZ: (o.vertical?height/2:width/2)+"px"
            		});
            	});
            	
            	$div.css({
	            	origin: ['50%', '50%'],
	            	"-webkit-perspective": (o.vertical?height*2:width*2)+"px",
	            	"-moz-perspective": (o.vertical?height*2:width*2)+"px",
	            	"-ms-perspective": (o.vertical?height*2:width*2)+"px",
	            	"-o-perspective": (o.vertical?height*2:width*2)+"px",
	                "perspective": (o.vertical?height*2:width*2)+"px"
	            });
    		},
    		rotateCalc : function(){
    			if($ul.is(":animated"))	return false;	//애니메이션중엔 다른 이벤트를 받지 않는다.
    			
    			if(o.forward){
    				degree += 90;
    				this.v.fview = this.v.fview==0 ? 3 : this.v.fview-1;
        			this.v.farr = this.v.farr==0 ? $tli.size()-1 : this.v.farr-1;

        			this.v.rview = this.v.rview==0 ? 3 : this.v.rview-1;
        			this.v.rarr = this.v.rarr==0 ? $tli.size()-1 : this.v.rarr-1;

        			this.v.curr = this.v.curr==1 ? $tli.size() : this.v.curr-1;
            		$li.slice(this.v.rview,this.v.rview+1).html($tli.slice(this.v.rarr,(this.v.rarr+1)).html());
    			}else{
    				degree -= 90;
    				this.v.fview = this.v.fview==3 ? 0 : this.v.fview+1;
        			this.v.farr = this.v.farr==$tli.size()-1 ? 0 : this.v.farr+1;

        			this.v.rview = this.v.rview==3 ? 0 : this.v.rview+1;
        			this.v.rarr = this.v.rarr==$tli.size()-1 ? 0 : this.v.rarr+1;

        			this.v.curr = this.v.curr==$tli.size() ? 1 : this.v.curr+1;
            		$li.slice(this.v.fview,this.v.fview+1).html($tli.slice(this.v.farr,(this.v.farr+1)).html());
    			}
    		},
    		go : function(n){
    			if($ul.is(":animated"))	return false;
    			
    			if(n != undefined){
					if(n ==  this.v.curr) return false;
	    			if(n > this.v.farr){
	    				o.forward = false;
	    				for ( var i = this.v.farr; i < n; i++) {
	                		html5Browser.rotateCalc();
	        			}
	    			}else if(n < this.v.farr+1){
	    				o.forward = true;
	    				for ( var i = this.v.farr; i > n; i--) {
	                		html5Browser.rotateCalc();
	    				}
	    			}
	    			$ul.animate({
	        			rotateY: (o.vertical)?0:degree+"deg",
	    	        	rotateX: (o.vertical)?-degree:0+"deg",
	            		scale: [0.1, 0.1]
	            	},o.speed/2).animate({
	            		scale: [0.75, 0.75]
	            	},o.speed/2, html5Browser.endCheck);
    			}else{
        			$ul.animate({
	        			rotateY: (o.vertical)?0:degree+"deg",
	    	    	    rotateX: (o.vertical)?-degree:0+"deg"
                	},o.speed, o.easing, html5Browser.endCheck);
    			}
				if(o.auto){
					clearTimeout(timer);
					timer = setTimeout(function(){
						html5Browser.rotateCalc();
						html5Browser.go();
	            	}, o.auto);
				}
    		},
    		first : function(n){
    			if(n > this.v.farr){
    				o.forward = false;
    				for ( var i = this.v.farr; i < n; i++) {
                		html5Browser.rotateCalc();
        			}
    			}else if(n < this.v.farr+1){
    				o.forward = true;
    				for ( var i = this.v.farr; i > n; i--) {
                		html5Browser.rotateCalc();
    				}
    			}
    			$ul.animate({
        			rotateY: (o.vertical)?0:degree+"deg",
    	        	rotateX: (o.vertical)?-degree:0+"deg"
            	},1, html5Browser.endCheck);
    		},
    		endCheck : function(){
    			if(o.btnGo){
    				html5Browser.btnChange(html5Browser.v.farr-1);
    			}
    		},
    		btnChange : function(i){
    			if($(o.btnGo).find("img[src*=_on]").size() > 0){
					$(o.btnGo).find("img[src]").not("eq("+(i)+")").each(function(i, o){
						$(this).attr("src", $(this).attr("src").replace("_on", "_off"));
					}).end().end().find("img[src]").eq(i).attr("src", $(o.btnGo).find("img[src]").eq(i).attr("src").replace("_off", "_on"));
				}else{
	    			$(o.btnGo).not("eq("+(otherBrowser.v-1)+")").css({"opacity":"0.5"})
	    			.end().eq(i).css({"opacity":"1"});
				}
    		}
    		
    	};

    	otherBrowser = {
    		v : 1,
    		init : function(){
    			degree -= o.vertical?height:width;
    			
		    	$ul.prepend($tli.slice($tli.size()-1).clone()).append($tli.slice(0,1).clone());//앞뒤로 붙여주기
		    	$li = $ul.children("li");//바뀐 목록 재설정
    			ulSize = liSize * $li.size();
		    	
    			$li.css({
	    			overflow: "hidden",
	    			width: width+"px",
	    			height:height+"px",
	    			position:"relative",
	    			float: o.vertical?"none":"left"
	        	});
    			
	    		$ul.css({position:"relative","z-index": "1",margin: "0", padding: "0", "list-style-type": "none"}).css(sizeCss,ulSize).css(animCss,degree+"px");
	    		
	            $div.css({overflow: "hidden", position: "relative", "z-index": "2", left: "0px"});
	    		$ul.bind("mousedown touchstart", this.DragStart)
	            	.bind("mousemove touchmove", this.DragMove)
	    			.bind("mouseup touchend touchcancel", this.DragEnd);
	            $ul.bind("mouseleave", this.DragEnd);
	            $(window).bind("resize orientationchange", this.resizeWindow);
	    		
    		},
    		DragStart : function(e){
            	if(e.type === 'mousedown'){
            		e.preventDefault();
    				e.stopPropagation();
            	}
            	initPos = pointerEventToXY(e);
            	beforePos=initPos;
            	move = 0;
            	isMove = true;
    		},
    		DragMove : function(e){
    			if(!isMove) return false;
        		var pos2 = pointerEventToXY(e);
        		if(o.vertical){
        			if(Math.abs(initPos.y-pos2.y)>3){	//스크롤 문제때문에 조금움직인후 죽임
            			e.preventDefault();
        				e.stopPropagation();
            		}
        			if(beforePos.y < pos2.y){
        				o.forward = true;
        			}else{
        				o.forward = false;
        			}
    				move = Math.abs(parseInt((pos2.y-initPos.y) / percentPx));
            		beforePos = pos2;
            		$ul.css({
	        			top: (pos2.y+degree)-initPos.y
            		});
        		}else{
	        		if(Math.abs(initPos.x-pos2.x)>3){	//스크롤 문제때문에 조금움직인후 죽임
	        			e.preventDefault();
	    				e.stopPropagation();
	        		}
	    			if(beforePos.x < pos2.x){
	    				o.forward = true;
	    			}else{
	    				o.forward = false;
	    			}
					move = Math.abs(parseInt((pos2.x-initPos.x) / percentPx));
	        		beforePos = pos2;
	        		$ul.css({
	        			left: (pos2.x+degree)-initPos.x
	        		});
        		}
    		},
    		DragEnd : function(){
    			if(!isMove)
            		return;
            	isMove = false;
            	if(20 < move){
            		otherBrowser.rotateCalc();
            		if(o.vertical){
            			$ul.animate({
    	            		top: degree+'px'
    	            	},300, otherBrowser.endCheck);
            		}else{
            			$ul.animate({
    	            		left: degree+'px'
    	            	},300, otherBrowser.endCheck);
            		}
            	}else{
            		if(o.vertical){
            			$ul.animate({
            				top: degree+'px'
                    	},300);
            		}else{
            			$ul.animate({
            				left: degree+'px'
                    	},300);
            		}
            	}
    		},
    		resizeWindow : function(){
    			width = $div.innerWidth();
    			height = $div.innerHeight();
    			liSize = o.vertical ? height : width;
            	percentPx = liSize/100;
            	$li.css({
	    			width: width+"px",
	    			height: height+"px"
	        	});
            	if(!o.vertical){
                	degree = -(width * otherBrowser.v);
            		$ul.css({left: degree});
            	}
	        	$ul.css({width: width*$li.size()});
    		},
    		rotateCalc : function(){
    			if($ul.is(":animated"))	return false;
    			
    			if(o.forward){
    				this.v = this.v==0 ? $li.size() : this.v-1;
    				degree += liSize;
    			}else{
    				this.v = this.v==$li.size() ? 0 : this.v+1;
    				degree -= liSize;
    			}
    		},
    		go : function(n){
    			if($ul.is(":animated"))	return false;
    			
    			if(n != undefined){
					if(n ==  this.v) return false;
        			if(n > this.v){
        				o.forward = false;
        				for ( var i = this.v; i < n; i++) {
                    		otherBrowser.rotateCalc();
            			}
        			}else if(n < this.v+1){
        				o.forward = true;
        				for ( var i = this.v; i > n; i--) {
                    		otherBrowser.rotateCalc();
        				}
        			}
    			}
				if(o.vertical){
        			$ul.animate({
        				top: degree+'px'
        			}, o.speed, o.easing, otherBrowser.endCheck);
    			}else{
        			$ul.animate({
        				left: degree+'px'
        			}, o.speed, o.easing, otherBrowser.endCheck);
    			}
				if(o.auto){
					clearTimeout(timer);
					timer = setTimeout(function(){
						otherBrowser.rotateCalc();
						otherBrowser.go();
	            	}, o.auto);
				}
    			
    		},
    		first : function(n){
    			if(n > this.v){
    				o.forward = false;
    				for ( var i = this.v; i < n; i++) {
                		otherBrowser.rotateCalc();
        			}
    			}else if(n < this.v+1){
    				o.forward = true;
    				for ( var i = this.v; i > n; i--) {
                		otherBrowser.rotateCalc();
    				}
    			}
    			if(o.vertical){
        			$ul.animate({
        				top: degree+'px'
        			}, 1, otherBrowser.endCheck);
    			}else{
        			$ul.animate({
        				left: degree+'px'
        			}, 1, otherBrowser.endCheck);
    			}
    		},
    		endCheck : function(){
    			if(otherBrowser.v == $li.size()-1){
					degree = -liSize;
					otherBrowser.v = 1;
					$ul.css(animCss, degree);
				}else if(otherBrowser.v == 0){
					degree = -(liSize * ($li.size()-2));
					otherBrowser.v = $li.size()-2;
					$ul.css(animCss, degree);
				}
    			if(o.btnGo){
    				otherBrowser.btnChange(otherBrowser.v-1);
    			}
    		},
    		btnChange : function(i){
    			if($(o.btnGo).find("img[src*=_on]").size() > 0){
					$(o.btnGo).find("img[src]").not("eq("+(i)+")").each(function(i, o){
						$(this).attr("src", $(this).attr("src").replace("_on", "_off"));
					})
					.end().end().find("img[src]").eq(i).attr("src", $(o.btnGo).find("img[src]").eq(i).attr("src").replace("_off", "_on"));
				}else{
	    			$(o.btnGo).not("eq("+(otherBrowser.v-1)+")").css({"opacity":"0.5"})
	    			.end().eq(i).css({"opacity":"1"});
				}
    		}
    	};

    	if(o.useCube && ($.browser.webkit || $.browser.safari || $.browser.mozilla)){
    		browser = html5Browser;
    	}else{
    		browser = otherBrowser;
    	}
    	
    	browser.init();
    	if(o.start>0){//처음보여줄 목록
    		browser.first(o.start);
    	}
    	
		if(o.btnGo){
			browser.btnChange(0);
	     	$(o.btnGo).each(function(i, el){
	     		$(el).click(function(e) {
	     			e.preventDefault();
	 				e.stopPropagation();
	 				browser.go(i+1);
	     		});
	     	});
		}
        if(o.btnPrev)
        	$(o.btnPrev).click(function(e) {
    			e.preventDefault();
				e.stopPropagation();
        		o.forward = true;
        		browser.rotateCalc();
        		browser.go();
        	});
        if(o.btnNext)
        	$(o.btnNext).click(function(e) {
    			e.preventDefault();
				e.stopPropagation();
        		o.forward = false;
        		browser.rotateCalc();
        		browser.go();
        	});
        if(o.auto){
        	timer = setTimeout(function(){
        		browser.rotateCalc();
        		browser.go();
        	}, o.auto);
        }
        
		function pointerEventToXY(e){
			var out = {x:0, y:0};
			if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
			var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				out.x = touch.pageX;
				out.y = touch.pageY;
			} else{
				out.x = e.pageX;
				out.y = e.pageY;
			}
			return out;
		};
        
    });
};
})(jQuery);