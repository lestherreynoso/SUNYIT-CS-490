var planarity = {
		nodes: [], 			//array of current nodes
		edges: [], 			//array of current edges
		currentLevel: 0 	//to select a graph
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
}
];