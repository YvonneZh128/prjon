$(function(){
	var audio = document.getElementsByTagName("audio")[0];
	var $audio = $("audio")[0];
	var onoff = true;
	var music_process ;
	var localon;
	
	//歌曲列表
	list_choice();
	//歌曲开始；
	var onoff1 ;
	
	$("#play").click(function(){
		$("#paused").show();
		$(this).hide();
		changeMusicActive();
		
	});
	$("#paused").click(function(){
		$("#play").show();
		$(this).hide();
		audio.pause();
		localon = audio.currentTime;
		var m = parseInt(localon / 60) < 10 ? "0"+ parseInt(localon/60):parseInt(localon/60);
		var s = parseInt(localon % 60) < 10 ? "0"+ parseInt(localon%60):parseInt(localon%60);
		$('.time .min').text(m);
		$('.time .sec').text(s);
	
		var percent = audio.currentTime / audio.duration;
		$(".wrap > p").css('width',$('.wrap').width()* percent);
		$("#drag").css("left",$('.wrap').width()* percent);
		rotateClear();
	});
//	$("#on").click(function(){
//		onoff1 = true; 
//		$("#on").html('&#xe629;');
//		if(audio !== null){
//			if($("#on").html('&#xe629;')){
//			}
//			if($("#on").html('&#xe625;')){
//				audio.pause();
//				
//			}
//			
//		}
//	});

	
	
	//歌曲列表
	var musiclist = [
		["music/演员 - 薛之谦.mp3","演员","薛之谦","演员"],
		["music/丑八怪 - 薛之谦.mp3","丑八怪","薛之谦","绅士"],
		["music/绅士 - 薛之谦.mp3","绅士","薛之谦","绅士"],
		["music/一半 - 薛之谦.mp3","一半","薛之谦","绅士"],
		["music/认真的雪 - 薛之谦.mp3","认真的雪","薛之谦","绅士"],
		["music/薛之谦 - 几个你.mp3","几个你","薛之谦","几个薛之谦"]
	];
	
	
	var $list_length = musiclist.length;
	var $index;
	
	//歌曲选择
	function changeMusicActive(){
		clearTimeout(st);
		rotateClear();
		onoff1 =  false;
		$("#on").html('&#xe629;');
		musicStart();
		
		//jindu
		localon = audio.currentTime;
		var m = parseInt(localon / 60) < 10 ? "0"+ parseInt(localon/60):parseInt(localon/60);
		var s = parseInt(localon % 60) < 10 ? "0"+ parseInt(localon%60):parseInt(localon%60);
		$('.time .min').text(m);
		$('.time .sec').text(s);
	
		var percent = audio.currentTime / audio.duration;
		$(".wrap > p").css('width',$('.wrap').width()* percent);
		$("#drag").css("left",$('.wrap').width()* percent);
		var st = setTimeout(function(){
			$(".circle_Pan").css("animation",'active 3s linear infinite .5s');
			$(".pan_point").css('transform','rotate(0deg)');
			musicTime();
		},500);
	}
	//歌曲列表
	function list_choice(){
		var liston = $(".list_on");
		var flag =false;
		liston.click(function(e){
			$(".music_list").css("display","block");
			e.stopPropagation();
			$(".music_list").click(function(e){
				if(e && e.stopPropagation){
					e.stopPropagation();
				}else{
					window.event.cancelBubble = true;
				}
			});
			$(document).click(function(e){
				e.stopPropagation();
				$(".music_list").css("display","none");
			});
		});
	
	}
	
	//清除旋转；
	function rotateClear(){
		$(".circle_Pan").css("animation","");
		$(".pan_point").css("transform","rotate(-20deg)");
	}
	//时间进度；
	function musicTime(){
		var time = null ;
		music_process = $audio.duration;
		
		$(".overmin").text(parseInt(music_process/60));
		$(".oversec").text(parseInt(music_process%60));
		
	}
	//歌曲开始
	function musicStart(){
		audio.load();
		audio.play();
	}
	//歌曲信息
	function changMusicInfo($index){
		
		audio.src = musiclist[$index][0];
		$(".music_title").text(musiclist[$index][1]);
		$(".singer").text(musiclist[$index][2]);
		$(".cd_on").text(musiclist[$index][3]);
	}
	//进度
	function process(){
		localon = audio.currentTime;
		var m = parseInt(localon / 60) < 10 ? "0"+ parseInt(localon/60):parseInt(localon/60);
		var s = parseInt(localon % 60) < 10 ? "0"+ parseInt(localon%60):parseInt(localon%60);
		$('.time .min').text(m);
		$('.time .sec').text(s);
		
		var percent = audio.currentTime / audio.duration;
		$(".wrap > p").css('width',$('.wrap').width()* percent);
		$("#drag").css("left",$('.wrap').width()* percent);
//			console.log($index);
		if(localon >= music_process){
			rotateClear();
			$index++;
			if($index > $list_length-1) $index = 0;
			changMusicInfo($index);
			musicStart();
			changeMusicActive();
		}
	}
	
	
	
	$(".center > li").click(function(){
		changeMusicActive();
		
		$index = $(this).index();
		changMusicInfo($index);
		
		musicStart();
		audio.addEventListener('timeupdate',function(){
			process();
		})
		
		//prev
		$('#prev').click(function(){
			$index--;
			if($index <0) $index = $list_length;
			changMusicInfo($index);
			musicStart();
			changeMusicActive();
		});
		//next
		$('#next').click(function(){
			$index++;
			if($index > $list_length) $index=0;
			changMusicInfo($index);
			musicStart();
			changeMusicActive();
			
		});
		
		//随机
		$('#free_on').click(function(e){
			$index = Math.floor(Math.random() * $list_length);
			changMusicInfo($index);
			musicStart();
			changeMusicActive();
		});
		
		//drag
		
		
		//sound
		audio.volume = 0.5;
		var paston ;
		$('.soundrag').click(function(){
			if(onoff){
				paston = $(this).parent().width();
				$(this).html('&#xe609;');
				audio.volume = 0;
				$(this).parent().width(0);
				$(this).css("left","0");
				
			}else{
				$(this).html('&#xe634;');
				audio.volume = parseInt(paston)/100;
				$(this).parent().width(paston);
			}
			onoff = !onoff;
			
		});
		$(".sounwrag>p").click(function(e){
			e = e ||event;
			var volW = $(this).offset().left + 100 - e.clientX;
			$(this).css("width",volW +"px");
			audio.volume = volW /100;
		});
		
	});
	
	
	
	
})



