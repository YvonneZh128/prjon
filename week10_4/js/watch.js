window.onload = function() {
	var canvas = document.getElementById("mycanvas");
	var cxt = canvas.getContext("2d");
	

	function drawClock() {
		var now = new Date();
		var sec = now.getSeconds();
		var min = now.getMinutes();
		var hour = now.getHours();
		hour > 12 ? hour - 12 : hour;
		hour += (min / 60);

		//先清空画布
		cxt.clearRect(0, 0, canvas.width, canvas.height);

		//画表盘大圆 圆心：x=250 y=250
		cxt.lineWidth = 5
		cxt.strokeStyle = "#00343f";
		cxt.beginPath()
		cxt.arc(300, 300, 200, 0, Math.PI * 2, true)
		cxt.stroke()
		cxt.closePath()

		cxt.beginPath()
		cxt.arc(300, 300, 5, 0, Math.PI * 2, true)
		cxt.fillStyle = "#00343f"
		cxt.fill()
		cxt.closePath()

		//时刻度；
		for(var i = 0; i < 12; i++) {
			cxt.save();
			cxt.lineWidth = 5;
			cxt.strokeStyle = "#1db0b8";

			//原点
			cxt.translate(300, 300);
			//旋转角度
			cxt.rotate(30 * i * Math.PI / 180); //弧度   角度*Math.PI/180
			cxt.beginPath();
			cxt.moveTo(0, -175);
			cxt.lineTo(0, -195);
			cxt.stroke();
			cxt.closePath();
			cxt.restore();
		}

		//分刻度
		for(var i = 0; i < 60; i++) {
			cxt.save();
			cxt.lineWidth = 5;
			cxt.strokeStyle = "#1db0b8";
			cxt.translate(300, 300);
			cxt.rotate(i * 6 * Math.PI / 180);
			cxt.beginPath();
			cxt.moveTo(0, -185);
			cxt.lineTo(0, -195);
			cxt.stroke();
			cxt.closePath();
			cxt.restore();
		}

		//以下的时针、分针、秒针均要转动，所以在这里要设置其异次元空间的位置
		//根据当前的小时数、分钟数、秒数分别设置各个针的角度即可
		//-----------------------------时针-----------------------------
		cxt.save()
		cxt.lineWidth = 6
		cxt.strokeStyle = "#00343f"
		cxt.translate(300, 300)
		cxt.rotate(hour * 30 * Math.PI / 180)
		cxt.beginPath()
		cxt.moveTo(0, -100)
		cxt.lineTo(0, 10)
		cxt.stroke()
		cxt.closePath()
		cxt.restore()

		//-----------------------------分针-----------------------------
		cxt.save()
		cxt.translate(300, 300)
		cxt.rotate(min * 6 * Math.PI / 180)
		cxt.lineWidth = 4
		cxt.strokeStyle = "#00343f"
		cxt.beginPath()
		cxt.moveTo(0, -130)
		cxt.lineTo(0, 10)
		cxt.stroke()
		cxt.closePath()
		cxt.restore()
		//-----------------------------秒针-----------------------------
		cxt.save()
		cxt.translate(300, 300)
		cxt.rotate(sec * 6 * Math.PI / 180)
		cxt.lineWidth = 2
		cxt.strokeStyle = "#00343f"
		cxt.beginPath()
		cxt.moveTo(0, -150)
		cxt.lineTo(0, 10)
		cxt.stroke()
		cxt.closePath()
		cxt.restore()

		//显示
		cxt.font = "18px 微软雅黑";
		cxt.lineWidth = 2;
		cxt.fillStyle = "#00343f";
		hour = now.getHours();
		var str = hour > 10 ? hour : ("0" + hour) + ":" + (min > 10 ? min : ("0" + min))
		cxt.fillText(str, 275, 400);
	}

	drawClock();
	setInterval(drawClock, 1000);
}