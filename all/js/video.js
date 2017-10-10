$(function(){
	
	var $video = $("#myvideo").get(0);
	var control = $(".control");
	var onoff = true;
	var video_process ;
	var localon;
	var video = document.getElementById("myvideo");
	var big = document.getElementById("Manping");
	var small = document.getElementById("Xiaoping");
	
	$("#start").click(function(){
		$("#pause").show();
		$(this).hide();
		$video.play();
		changeMusicActive();
		video.addEventListener('timeupdate',function(){
			process();
		})
	});
	$("#pause").click(function(){
		$("#start").show();
		$(this).hide();
		$video.pause();
	})
	$('#stop').click(function(){
		$("#start").show();
		$("#pause").hide();
		video.load();
	});
	//big   small 
	big.addEventListener("click",function(){
		$(this).hide();
		$("#Xiaoping").show();
		if (video.requestFullscreen) {
	      video.requestFullscreen(); 
	    } 
	    else if (video.msRequestFullscreen) { 
	      video.msRequestFullscreen(); 
	    } 
	    else if (video.mozRequestFullScreen) { 
	      video.mozRequestFullScreen(); 
	    } 
	    else if (video.webkitRequestFullScreen) { 
	      video.webkitRequestFullScreen(); 
	    } 
	})
	var pastvol ;
	$(".no_sound").click(function(){
		pastvol = $(".voice-block").height();
		$(this).hide();
		$(".has_sound").show();
		video.volume = 0;
		
	});
	$(".has_sound").click(function(){
		$(this).hide();
		$(".no_sound").show();
		video.volume = pastvol;
	});
	
	$(".has_sound").mouseenter(function(){
		$(".voice-bar").css("display","block");
		$(document).click(function(){
			$(".voice-bar").css("display","none");
		})
	});
	

	function changeMusicActive(){
		clearTimeout(st);
		musicStart();
		
		localon = video.currentTime;
		
		//jindu
		var m = parseInt(localon / 60) < 10 ? "0"+ parseInt(localon/60):parseInt(localon/60);
		var s = parseInt(localon % 60) < 10 ? "0"+ parseInt(localon%60):parseInt(localon%60);
		$('.time .min').text(m);
		$('.time .sec').text(s);
		var percent = video.currentTime / video.duration;
		$("#drag").css('width',$('.process').width()* percent);
		var st = setTimeout(function(){
			musicTime();
		},500);
	}
	function process(){
		localon = video.currentTime;
		var m = parseInt(localon / 60) < 10 ? "0"+ parseInt(localon/60):parseInt(localon/60);
		var s = parseInt(localon % 60) < 10 ? "0"+ parseInt(localon%60):parseInt(localon%60);
		$('.time .min').text(m);
		$('.time .sec').text(s);
		
		var percent = video.currentTime / video.duration;
		$("#drag").css('width',$('.process').width()* percent);
		if(localon >= video_process){
			$video.load();
			$("#drag").css("width","0");
		}
	}
	//时间进度；
	function musicTime(){
		var time = null ;
		video_process = video.duration;
		
		$(".overmin").text(parseInt(video_process/60));
		$(".oversec").text(parseInt(video_process%60));
		
	}
	//歌曲开始
	function musicStart(){
		$video.load();
		$video.play();
	}
	
});
