<div>Slide3D</div><div>=======</div><div><br></div><div>슬라이드 3D</div><div><br></div><div>큐브형태의 슬라이드 입니다.</div><div>ie,opera등 css3미지원 브라우져에서는 그냥 밀어내는 슬라이드로 작동합니다.</div><div>다음 모바일따라한거 ㅋ</div><div><br></div><div>HTML<span class="Apple-tab-span" style="white-space:pre">	</span>:</div><div>&lt;div class="slide"&gt;</div><div><span class="Apple-tab-span" style="white-space:pre">	</span>&lt;ul&gt;</div><div><span class="Apple-tab-span" style="white-space:pre">		</span>&lt;li&gt;내용1&lt;/li&gt;</div><div><span class="Apple-tab-span" style="white-space:pre">		</span>&lt;li&gt;내용2&lt;/li&gt;</div><div><span class="Apple-tab-span" style="white-space:pre">		</span>&lt;li&gt;내용3&lt;/li&gt;</div><div><span class="Apple-tab-span" style="white-space:pre">		</span>&lt;li&gt;내용4&lt;/li&gt;</div><div><span class="Apple-tab-span" style="white-space:pre">	</span>&lt;/ul&gt;</div><div>&lt;/div&gt;</div><div><span class="Apple-tab-span" style="white-space:pre">	</span></div><div>기능설명<span class="Apple-tab-span" style="white-space:pre">	</span>:&nbsp;</div><div>- 기본</div><div><span class="Apple-tab-span" style="white-space:pre">	</span>$(".slide").slide3D();</div><div><br></div><div><br></div><div>- 자동롤링</div><div>&nbsp;$(".slide").slide3D({</div><div>&nbsp;<span class="Apple-tab-span" style="white-space:pre">	</span>auto : 5000</div><div>&nbsp;});</div><div>&nbsp;</div><div>- 이전,다음 버튼</div><div>&nbsp;$(".slide").slide3D({</div><div>&nbsp;<span class="Apple-tab-span" style="white-space:pre">	</span>btnPrev : $('.prev'),</div><div>&nbsp;<span class="Apple-tab-span" style="white-space:pre">	</span>btnNext : $('.next') &nbsp;</div><div>&nbsp;});</div><div>&nbsp;</div><div>&nbsp;-바로 이동 버튼</div><div>&nbsp;(기본적으로 현재 보이는 item의 이미지파일명에 마지막_off,_on을 교체시킨다 이미지가 아닐경우 opacity로 선택된 항목을 구분할수있게끔 구현)</div><div>&nbsp;$(".slide").slide3D({</div><div>&nbsp;<span class="Apple-tab-span" style="white-space:pre">	</span>btnPrev : $('.prev'),</div><div>&nbsp;<span class="Apple-tab-span" style="white-space:pre">	</span>btnNext : $('.next') &nbsp;</div><div>&nbsp;});</div><div><br></div><div>- 방향설정(앞으로 뒤로? 딱히 단어를 할게 없어서 그냥 forward)</div><div>&nbsp;$(".slide").slide3D({</div><div>&nbsp;<span class="Apple-tab-span" style="white-space:pre">	</span>forward : true</div><div>&nbsp;});</div><div><br></div><div>- 롤링효과</div><div><span class="Apple-tab-span" style="white-space:pre">	</span>(jquery.easing.1.3.js plugin이 있어야지 됨 : easeInOutElastic,swing, 등등)</div><div>&nbsp;$(".slide").slide3D({</div><div>&nbsp;<span class="Apple-tab-span" style="white-space:pre">	</span>easing : "easeInOutElastic"</div><div>&nbsp;});</div><div><br></div><div>- 수직,수평</div><div>&nbsp;$(".slide").slide3D({</div><div>&nbsp;<span class="Apple-tab-span" style="white-space:pre">	</span>vertical : false</div><div>&nbsp;});</div><div><br></div><div>- 처음에 보여줄 item (1부터시작)</div><div>&nbsp;$(".slide").slide3D({</div><div><span class="Apple-tab-span" style="white-space:pre">	</span>start : 3</div><div>&nbsp;});</div><div><br></div><div>필수 jQuery plugin<span class="Apple-tab-span" style="white-space:pre">	</span></div><div><span class="Apple-tab-span" style="white-space:pre">			</span>: jquery-1.7.2.js</div><div><span class="Apple-tab-span" style="white-space:pre">			</span> &nbsp;jquery.transform-0.9.4.min.js&nbsp;</div><div>주의사항<span class="Apple-tab-span" style="white-space:pre">	</span>: jquery-1.8.2.js 에서는 jquery.transform 과 충돌난다 jquery.transform.js이 버젼업 되면 다시 적용해야할 듯</div><div><span class="Apple-tab-span" style="white-space:pre">			</span>div의 width,height 를 꼭 지정해줄것</div><div><br></div>
