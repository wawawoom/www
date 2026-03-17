var i = 0;
var w = 496;
var h = w;
var u = 16;

var gup = function (name) {
    url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    if (results === null) {
    	return null;
    }
    else if (/^\d+$/.test(results[1])) {
    	return parseInt(results[1],10);
    }
    else {
    	return null;
    }
}

var s = gup('speed') || gup('vitesse') || 100;

var m = [
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
	[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
	[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
	[2,0,0,1,1,1,1,1,1,1,0,1,1,0,0,1,0,1,0,0,0,1,1,1,1,1,1,1,0,0,2],
	[2,0,0,1,0,0,0,0,0,1,0,1,1,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,0,2],
	[2,0,0,1,0,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,1,1,1,0,1,0,0,2],
	[2,0,0,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,0,0,0,1,0,1,1,1,0,1,0,0,2],
	[2,0,0,1,0,1,1,1,0,1,0,0,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,0,2],
	[2,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,1,1,0,1,0,1,0,0,0,0,0,1,0,0,2],
	[2,0,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,0,2],
	[2,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,2],
	[2,0,0,1,0,1,1,0,1,1,1,0,1,0,0,1,1,1,0,0,0,1,0,0,1,0,1,1,0,0,2],
	[2,0,0,1,1,0,0,0,1,0,1,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,2],
	[2,0,0,0,1,1,1,1,0,1,0,1,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,2],
	[2,0,0,1,1,1,1,0,1,0,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,1,0,0,0,0,2],
	[2,0,0,1,1,1,0,1,1,1,1,0,1,0,0,0,1,1,0,0,1,1,0,1,0,1,1,1,0,0,2],
	[2,0,0,0,1,0,1,1,0,0,1,1,0,0,1,0,0,0,1,0,0,1,1,1,0,0,0,1,0,0,2],
	[2,0,0,0,1,0,1,0,1,1,1,1,0,0,0,1,0,1,0,0,1,0,0,1,0,1,1,0,0,0,2],
	[2,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,1,1,0,0,0,1,0,0,2],
	[2,0,0,0,0,0,1,1,0,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,2],
	[2,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,1,0,0,0,1,0,1,0,1,0,0,2],
	[2,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,0,0,2],
	[2,0,0,1,0,0,0,0,0,1,0,1,1,0,0,1,0,0,1,1,0,0,0,1,0,0,1,1,0,0,2],
	[2,0,0,1,0,1,1,1,0,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,0,0,0,2],
	[2,0,0,1,0,1,1,1,0,1,0,1,0,0,0,1,1,0,1,0,0,1,0,1,1,1,1,1,0,0,2],
	[2,0,0,1,0,1,1,1,0,1,0,1,0,0,1,1,1,0,1,1,1,1,0,1,0,1,1,0,0,0,2],
	[2,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,1,0,1,0,1,0,0,0,0,2],
	[2,0,0,1,1,1,1,1,1,1,0,1,0,0,0,1,0,1,0,0,0,0,1,1,1,1,1,1,0,0,2],
	[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
	[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
	[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

var shuffle = function(array) {
  array.sort(() => Math.random() - 0.5);
}

var arrOnes = [];
for ( var i = 0; i < (w/u); i++ ) {
	for ( var j = 0; j < (w/u); j++ ) {
		if (m[i][j] === 1) {
			arrOnes.push({x:j, y:i})
		}
	}
}

//

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width = w;
ctx.canvas.height = h;

var imgLoads = 0;

var block = new Image();
block.onload = function () {
    imgLoads++;
    start();
}
block.src = "../img/block.gif";

var water = new Image();
water.onload = function () {
    imgLoads++;
    start();
}
water.src = "../img/water.gif";

var marble = new Image();
marble.onload = function () {
    imgLoads++;
    start();
}
marble.src = "../img/marble.gif";

var createGroups = function () {
	var groups = [];
	shuffle(arrOnes);

	var size = 8;
	var groups = [];

	for (var i=0; i < arrOnes.length; i += size) {
	    groups.push(arrOnes.slice(i,i+size));
	}

	return groups;
}

var flood = function () {
	// Draw Border and canvas
	for ( var a = 0; a < (w/u); a++ ) {
		for ( var b = 0; b < (w/u); b++ ) {
			var imageToDraw;
			if (m[a][b] === 0) imageToDraw = water;
			if (m[a][b] === 1) imageToDraw = water;
			if (m[a][b] === 2) imageToDraw = block;
			ctx.drawImage(imageToDraw, a*u, b*u);
		}
	}
}


var start = function () {	
	
	if (imgLoads < 3) return;
	
	i = 0;

	flood();

	var g = createGroups();
	//console.log(g.length);

	var si = setInterval(

		function() {
			
			flood();

			if (i === g.length) {
				clearInterval(si);
				start();
			}

			var blocksToDraw = g[i];
			for(var j = 0; j < blocksToDraw.length; j++) {
				ctx.drawImage(marble, blocksToDraw[j].x * u, blocksToDraw[j].y * u);
			}

			document.getElementById('txt').innerHTML = (i+1);

			i++;

		}, s
	)
}








