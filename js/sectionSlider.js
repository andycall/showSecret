
function sectionSlider(container){
	if(!container) return;
	var slides,index, sliderPos,bodyWidth,bodyHeight,innerWidth,mySlider,topFixedInner,headerBar;
	index = 1;
	var slide = container.children[0];
	slides = slide.children;
	length = slides.length;
	// 添加floatBox
	// 所有display:none;
	function setup(){
		window.mySlider.kill();

		bodyWidth = document.documentElement.clientWidth;
		bodyHeight = document.documentElement.clientHeight;
	
		mySlider = $$('slider');
		
		headerBar = getClass('header-bar')[0];

		topFixedInner = getClass('top-fixed-inner')[0];


		// 设置 container 的 width
		slide.style.width = length * bodyWidth + 'px';

		// 除了当前主页面,其他页面隐藏,以及添加floatBox 类
		for(var i = 0 ; i < length; i += 1){
			// console.log(slides[i]);
			addClass(slides[i],'FloatBox');
			slides[i].setAttribute('sec-index',i);
			slides[i].style.width = bodyWidth + 'px';
			if(slides[i].getAttribute('id') !== 'manBox'){
				slides[i].style.display = 'block';
			}
		}

		mySlider.style.width = bodyWidth + 'px';

		slide.style.right= bodyWidth + 'px';
		// window.scroll(bodyWidth,0);
		topFixedInner.style.position = 'relative';
		topFixedInner.style.width = bodyWidth + 'px';
	}
	
	function kill(){
		window.mySlider = new Slider(document.getElementById('slider'), {
			startSlide: 0,
			speed: 400,
			auto: 0,
			continuous: true,
			disableScroll: false,
			stopPropagation: false,
			callback: function(index,elem){
				changeSlider(index,elem);
				changeHeight(index,elem);
			},
			transitionEnd: function(index,elem){}
		});

		clearAllsection();
		removeClass(slide,'animate');
		slide.style.right = 0;
		topFixedInner.style.position = 'fixed';
		topFixedInner.style.width = "100%";
		mySlider.style.width = "auto";

	}

	function next(){
		if(!(slide.getAttribute('class') == 'animate')){
			addClass(slide,'animate');
		}
		if(index == 1){
			slide.style.right = 2 * bodyWidth +'px';
		}
			// ....
	}

	function previous(){
		if(!(slide.getAttribute('class') == 'animate')){
			addClass(slide,'animate');
		}
		if(index == 1){
			slide.style.right = 0;
		}
	}

	function ReturnBack(){
		if(!(slide.getAttribute('class') == 'animate')){
			addClass(slide,'animate');
		}
		slide.style.right = bodyWidth + 'px';
	}


	return {
			setup: function(){
				setup();
			},
			next : function(){
				next();
			},
			previous : function(){
				previous();
			},
			ReturnBack: function(){
				ReturnBack();
			},
			kill: function(){
				kill();
			}
		}

}

