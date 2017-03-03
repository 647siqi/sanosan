$(function(){
	/*将根元素字号大小设置为：屏宽与图宽的比；  
	由于chrom对10px以下的字不再缩小，而且手机屏  
	都比较小，所以作为默认字体大小又乘了100，这样  
	计算其他元素大小时，量出图上大小再除以100就可以了*/  
	function defaultfont() {  
	    var sw = $(window).width();  
	    var pw = 640;  
	    var f = 100*sw/pw;  
	    $('html').css('font-size', f+'px');  
	}  
	/*之所以要延时100ms再调用这个函数是因为  
	如果不这样屏幕宽度加载会有误差*/  
	defaultfont();  
	setTimeout(function(){  
	    defaultfont();  
	}, 100);


	//禁止横屏显示
	if(window.orientation!=0){
        var obj=document.getElementById('orientation');
        alert('横屏情况下不能正常显示，请竖屏!');
        
	}

	window.onorientationchange=function(){ 
	var obj=document.getElementById('orientation');

	if(window.orientation==0){
	                obj.style.display='none';
	        }else
	        {
	                alert('横屏情况下不能正常显示，请竖屏!');
	               
	        }
	};  

	//求助按钮
	$('.btn_help').click(function(){
		window.open("https://shop.m.suning.com/30000386.html");
	})

	var Score=0;//分数


	$(".content .container_01 .btn_start").click(function(){ //点击开始答题后出现的动画
		$(".container_01").find('div').each(function() {
			$(this).addClass($(this).attr("outclass"));
		});
		var btn_start=setInterval(function(){
			$('.container_01').remove();
			$('.container_02').css("visibility","visible");
			$('.container_02 .container_02_bg').find('div').each(function(){
				$(this).addClass($(this).attr("inclass"));
			})
			clearInterval(btn_start);
		},700)

		var c2_anime=setInterval(function(){
			$('.container_02 .container_02_bg').find('div').each(function(){
				if ($(this).attr("alclass")) {
					$(this).addClass($(this).attr("alclass"));
					$(this).removeClass($(this).attr("inclass"));
				};
			});
			next_question();
			clearInterval(c2_anime);
		},1200);
		
	})

	/*必须答题后才能选择跳转到下一题*/
	var Nindex=0;
	$('.content .container_02 .container_02_bg .btn_help_start .btn_start02').click(function(){

		if (Nindex==0) {
			next_question();
			Nindex++;
		}else{
			if($('.panel_font').eq(Nindex).find($('input')).is(':checked')){
				next_question();
				Nindex++;
			}else{
				alert("傻逼！做题啊！");
			}
		}
		
	});

	/*计算得分*/
	$('.panel_font').find($('input.right_answer')).each(function() {
		$(this).click(function() {
			Score+=20;
			if (Score>100) {Score=100;};
		});
	});


	function next_question(){
		var ifAllcl="ture";
		var Num=0;
		$('.panel_font').each(function(){
			if($(this).attr('isshow')=="1"){
				ifAllcl="false";
				if($(this).index()<$('.panel_font').length){
					$(this).attr('isshow','0');

					$('.panel_font').eq($(this).index()).attr("isshow","1");
					$('.panel_font').eq($(this).index()).css("z-index","2");
					Num=$(this).index();
					$(this).find('div').each(function(){
						$(this).removeClass($(this).attr('inclass'));
					})
				}else{
					ifAllcl='end';
				}
				return false;
			}
		});
		if(ifAllcl=="ture"){
			$('.panel_font').eq(0).attr('isshow','1');
			$('.panel_font').eq(0).css('z-index','2');
			$('.panel_font').eq(0).find('div').each(function(){
				$(this).addClass($(this).attr('inclass'));
			});
		}
		else if (ifAllcl=="false") {
			$('.container_02_bg .btn_start02').css("background-image","url(../images/btn_next.png)");
			$('.panel_font').eq(Num).find('div').each(function(){
				$(this).addClass($(this).attr('inclass'));
			});
		}
		else if(ifAllcl="end"){
			$('.panel_font').eq($('.panel_font').length-1).find('div').each(function() {
				$(this).removeClass($(this).attr('inclass'));
			});
			$('.container_02 .container_02_bg').find('div').each(function(){
				$(this).addClass($(this).attr("outclass"));
			})

			var container_02_in=setInterval(function(){
				$('.container_02').remove();
				clearInterval(container_02_in);
			},700)

			result_page();
		};
	}

	function result_page(){  //显示结果页面
		//定义各个分数段的超过百分比跟底部说明
		var font_100=[99,"我和爱豆就是天生一对"];
		var font_80=[80,"我要把爱豆搬回家"];
		var font_60=[50,"路人已转粉，马上买！"];
		var font_40=[20,"没用过不知道，不如买个试试"];
		var font_20=[0,"优惠辣么大，不买白不买"];

		var C3=$('.content .container_03');
		Score=Score<20?20:Score;
		
		C3.find('div.grade').find('span').text(Score);
		C3.find('div.fen').css('background-image','url(../images/fen_'+Score+'.png)');
		C3.find('div.exceed').find('span').text(eval("font_"+Score)[0]);
		C3.find('div.foot_font').text(eval("font_"+Score)[1]);
		if (Score<=40) {
			C3.find('div.btn_share').css('background-image','url(../images/btn_cry.png)');
		}else{
			C3.find('div.btn_share').css('background-image','url(../images/btn_bask.png)');
		};


		$('.btn_share').click(function(){
			$('.fenxiang').removeClass('fenxiang_hide');
			$('.fenxiang').addClass('fenxiang_show');
		});

		$('.fenxiang').click(function(){
			$(this).removeClass('fenxiang_show');
			$(this).addClass('fenxiang_hide');
		});


		$('.quan').click(function(){
			window.open("http://c.m.suning.com/hlsppr.html");
		});

		var in_C3=setInterval(function(){
			$('.content .container_03').find('div').each(function(){
				$('.content .container_03').css('visibility','visible');
				$(this).addClass($(this).attr('inclass'));
			});
			clearInterval(in_C3);
		},1000);

		var  anime_C3=setInterval(function(){
			$('.content .container_03').find('div').each(function(){
				if ($(this).attr('alclass')) {
					$(this).addClass($(this).attr('alclass'));
					$(this).removeClass($(this).attr('inclass'));
				};
			});
			clearInterval(anime_C3);
		},2400)
	}
	
})
