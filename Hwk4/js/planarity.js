var planarity = {
		nodes: [], 			//array of current nodes
		edges: [], 			//array of current edges
		currentLevel: 0, 	//to select a graph
		thinLineThickness: 2,
		boldLineThickness: 6
	};


var levels =	[
{ "level" : 0,
		"nodes" : [ {"x" : 400, "y" : 160}, // nodes is an array of objects with
					{"x" : 380, "y" : 240}, // x and y properties
					{"x" : 85, "y" : 235},
					{"x" : 90, "y" : 75},
					{"x" : 200, "y": 350} ],
		"edges" : {
			"0" : { "connectedNodes" : [1,2] },
			"1" : { "connectedNodes" : [0,3] },
			"2" : { "connectedNodes" : [0,3] },
			"3" : { "connectedNodes" : [1,2] },
			"4" : { "connectedNodes" : [1,2,3] }
		}
},
{ "level" : 1,
		"nodes" : [ {"x" : 290, "y" : 160},
					{"x" : 380, "y" : 80}, 
					{"x" : 100, "y" : 200},
					{"x" : 190, "y" : 175},
					{"x" : 310, "y": 350} ],
		"edges" : {
			"0" : { "connectedNodes" : [0,2] },
			"1" : { "connectedNodes" : [1,2] },
			"2" : { "connectedNodes" : [0,1] },
			"3" : { "connectedNodes" : [1,2] },
			"4" : { "connectedNodes" : [1,0,3] }
		}
},
{  "level" : 2,
		"nodes" : [ {"x" : 600, "y" : 400}, 
					{"x" : 320, "y" : 330}, 
					{"x" : 750, "y" : 120},
					{"x" : 220, "y" : 90},
					{"x" : 175, "y": 240} ],
		"edges" : {
			"0" : { "connectedNodes" : [0,1] },
			"1" : { "connectedNodes" : [1,2,0] },
			"2" : { "connectedNodes" : [2,3] },
			"3" : { "connectedNodes" : [0,2] },
			"4" : { "connectedNodes" : [1,2,3] }
		}
}/*,
{  "level" : 3,
		"nodes" : [ {"x" : 600, "y" : 400}, 
					{"x" : 320, "y" : 330}, 
					{"x" : 750, "y" : 120},
					{"x" : 220, "y" : 90},
					{"x" : 175, "y" : 240},
					{"x" : 400, "y" : 70}, 
					{"x" : 230, "y" : 130}, 
					{"x" : 140, "y" : 290},
					{"x" : 670, "y" : 316},
					{"x" : 80, "y"  : 440},
					{"x" : 270, "y" : 200}, 
					{"x" : 530, "y" : 230}, 
					{"x" : 120, "y" : 360},
					{"x" : 440, "y" : 190},
					{"x" : 370, "y" : 490}  ],
		"edges" : {
			"0" : { "connectedNodes" : [0, 1, 10, 12, 8, 5, 7, 4] },
			"1" : { "connectedNodes" : [1,2,0, 7, 3, 6, 11, 12] },
			"2" : { "connectedNodes" : [2,3, 10, 8, 9, 5, 7, 6] },
			"3" : { "connectedNodes" : [0,2, 12, 11, 9, 10, 8, 5, 4,] },
			"4" : { "connectedNodes" : [1,2,3, 9, 0, 5, 4, 10, 8, 7]},
			"5" : { "connectedNodes" : [0,1, 9, 4, 6, 5, 2, 11] },
			"6" : { "connectedNodes" : [1,2,10, 9, 7, 4, 8, 12]},
			"7" : { "connectedNodes" : [2,3, 5, 8, 4, 9, 10, 7] },
			"8" : { "connectedNodes" : [0,2, 10, 7, 5, 11, 9] },
			"9" : { "connectedNodes" : [1,2,3, 7, 8, 12, 10, 9]},
			"10" : { "connectedNodes" : [0,1, 9, 5, 4, 10, 8] },
			"11" : { "connectedNodes" : [1,2,10, 11, 12, 6, 5, 8]},
			"12" : { "connectedNodes" : [2,3, 7, 9, 12, 9] },
			"13" : { "connectedNodes" : [10,2, 1, 5, 9, 8, 7] },
			"14" : { "connectedNodes" : [1,2,3, 8, 5, 4, 7, 9] }
		}
}*/
];

window.addEventListener('load', eventWindowLoaded, false);

var Debugger = function () { };
Debugger.log = function (message) {
	try {
		console.log(message);
	} catch (exception) {
		return;
	}
}

function eventWindowLoaded() {

	canvasApp();
}

function canvasApp() {

	initGame();

	function Line(startCircle, endCircle, thickness) {
	this.startCircle = startCircle;
	this.endCircle = endCircle;
	this.thickness = thickness;
	}

	function Circle(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
};
function drawLine(context, x1, y1, x2, y2, thickness) {
	context.strokeStyle = "white";
	context.lineWidth = thickness;
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.stroke();
	context.closePath();

}
function drawCircle(context, x, y, radius){
	context.beginPath();
	context.strokeStyle = "white";
	context.lineWidth = 20;
	context.arc(x, y, radius, (Math.PI/180)*0, (Math.PI/180)*360, false);
	context.stroke();
	context.closePath();
}
function setupNodes() {

	planarity.nodes = [];
	var graph = levels[planarity.currentLevel];

	for (var i=0; i<graph.nodes.length; i++) {
		planarity.nodes.push(new Circle( graph.nodes[i].x, graph.nodes[i].y, 15));
	}
}
function connectNodes()	{
	var graph = levels[planarity.currentLevel];
	planarity.edges = [];
	for (var p in graph.edges)	{
			var startCircle = planarity.nodes[p];
			var neighbors = graph.edges[p].connectedNodes;
			for (var q in neighbors) {
					var endCircle = planarity.nodes[neighbors[q]];
					planarity.edges.push(new Line(startCircle, endCircle, 4));
						 }
					}
			}

function setupCurrentLevel() {
	setupNodes();
	connectNodes();
	updateLineIntersections();
	updateLevelProgress();
}
function draw() {

//get a reference to the canvas element
	var theCanvas = document.getElementById("canvasOne");
	//get a reference to 2d context
	var context = theCanvas.getContext("2d");

//clear the canvas
	context.fillStyle ="#000000";
	context.fillRect(0, 0,  context.canvas.width, context.canvas.height);
	
//loop through planarity.edges to draw the lines in the game state
	for (var i=0; i < planarity.edges.length; i++) {
		drawLine(context, planarity.edges[i].startCircle.x, planarity.edges[i].startCircle.y, planarity.edges[i].endCircle.x, planarity.edges[i].endCircle.y, planarity.edges[i].thickness);
}
	//loop through planarity.nodes to draw the circles in the game state
	for (var k=0; k<planarity.nodes.length; k++) {
		drawCircle(context, planarity.nodes[k].x, planarity.nodes[k].y, 10);
		}

}


function initGame() {
    setupCurrentLevel();

	var canvas = document.getElementById("canvasOne");
	var context = canvas.getContext("2d");
		
	canvas.onmouseup = function (e) {
		//mouse is released;no more target to consider
		planarity.target = undefined;
		//must update progress/regress
		checkLevelCompletion();
	};

	canvas.onmousedown = function (e) {
		var hitX = e.layerX || 0;
		var hitY = e.layerY || 0;
		for(var i = 0; i < planarity.nodes.length; i++) {
			var c = planarity.nodes[i].x;
			var d = planarity.nodes[i].y;
			var r = Math.pow(hitX - c, 2) + Math.pow(hitY - d, 2); 		//result
			var R = Math.pow(planarity.nodes[i].radius, 2);			//radius squared
			if (r <= R) {
				planarity.target = i;
				break;
			}
		}
	};
	canvas.onmousemove = function (e) {
		
		if (planarity.target != undefined) {
			var hitX = e.layerX || 0;
			var hitY = e.layerY || 0;
			var radius = planarity.nodes[planarity.target].radius;
			planarity.nodes[planarity.target] = new Circle(hitX, hitY, radius);
			connectNodes();
			updateLineIntersections();
			updateLevelProgress();
			}
	};
	
	setInterval(draw, 30);

}

function checkLevelCompletion(){
	var progressElement = document.getElementById("progress");
	if (progressElement.innerHTML == "100") {
		progressElement.innerHTML = 0;
		planarity.currentLevel++;
		if (planarity.currentLevel < levels.length) {
			setupCurrentLevel();
			}
		else 
		planarity.currentLevel = 0;
		  setupCurrentLevel();
		
	}


}
function updateLineIntersections(){
	for (var i = 0; i < planarity.edges.length; i++) {
		var line1 = planarity.edges[i];
		line1.thickness = planarity.thinLineThickness;
		for (var j = 0; j < i; j++) {
			var line2 = planarity.edges[j];
			if (isIntersecting(line1, line2)) {
				line1.thickness = planarity.boldLineThickness;
				line2.thickness = planarity.boldLineThickness;
			}

		}

	}
}


function updateLevelProgress()
{
	var progress = 0;
	for (var i=0;i<planarity.edges.length;i++) {
		if (planarity.edges[i].thickness == planarity.thinLineThickness) {
			progress++;
		}
	}
	var progressPercentage = Math.floor(progress/planarity.edges.length*100);
	
	var progressElement = document.getElementById("progress"); 
	progressElement.innerHTML =  progressPercentage;
	
	// display the current level
	var levelElement = document.getElementById("level"); 
	levelElement.innerHTML = planarity.currentLevel;
}

function isIntersecting(line1, line2)
{
	// convert line1 to equation Ax+By = C
	var a1 = line1.endCircle.y - line1.startCircle.y;
	var b1 = line1.startCircle.x - line1.endCircle.x;
	var c1 = a1 * line1.startCircle.x + b1 * line1.startCircle.y;
	
	// convert line2 equation Ax+By = C
	var a2 = line2.endCircle.y - line2.startCircle.y;
	var b2 = line2.startCircle.x - line2.endCircle.x;
	var c2 = a2 * line2.startCircle.x + b2 * line2.startCircle.y;
	
	// the determinant	
	var d = a1*b2 - a2*b1;
	
	// line 1 and line 2 are parallel when d is 0
	if (d == 0) {
		return false;
	}else {
		var x = (b2*c1 - b1*c2) / d;
		var y = (a1*c2 - a2*c1) / d;
					
		// check if the interception point is on both line segments
		
		if ( (isInBetween(line1.startCircle.x, x, line1.endCircle.x) ) &&
			 (isInBetween(line1.startCircle.y, y, line1.endCircle.y) ) &&
			 (isInBetween(line2.startCircle.x, x, line2.endCircle.x) ) &&
			 (isInBetween(line2.startCircle.y, y, line2.endCircle.y) )  )
		{
			return true;	
		}
	}
	
	return false;
}


function isInBetween(a, t, b) {

    // return false if t is very close to a or b.
	
	if (Math.abs(a-t) < 0.000001 || Math.abs(t-b) < 0.000001) {
		return false;
	}
	
	// return true when t is strictly between a and b
	return (a < t && t < b) || (b < t && t < a);
}

}
