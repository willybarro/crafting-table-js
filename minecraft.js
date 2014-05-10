var bo = {
	'nil': 'nil',
	'woodPlank': 'woodPlank',
	'stick': 'stick'
}
var objects = {
	stick: [
		[bo.woodPlank, bo.nil, bo.nil],
		[bo.woodPlank, bo.nil, bo.nil],
		[bo.nil, bo.nil, bo.nil]
	],
	axe: [
		[bo.woodPlank, 	bo.woodPlank, bo.nil],
		[bo.nil, 		bo.stick, bo.nil],
		[bo.nil, 		bo.stick, bo.nil]
	]
};
var nilTable = [
	[bo.nil,	bo.nil,	bo.nil],
	[bo.nil,	bo.nil,	bo.nil],
	[bo.nil,	bo.nil,	bo.nil]
];

var table = {
	defineObjectBoundaries: function(tb)
	{
		yFirstObject = -1;
		xFirstObject = -1;
		for(y in tb) {
			for(x in tb[y]) {
				if(tb[y][x] != bo.nil) {
					if(xFirstObject == -1 || x < xFirstObject) {
						xFirstObject = x;
					}

					if(yFirstObject == -1 || y < yFirstObject) {
						yFirstObject = y;
					}
				}
			}
		}

		return {x: parseInt(xFirstObject), y: parseInt(yFirstObject)};
	},
	pullItemsToLeftCorner: function(tab)
	{
		var boundaries = table.defineObjectBoundaries(tab);
		tab = table.offsetGetObject(tab, boundaries.x, boundaries.y);
		return tab;
	},
	match: function(innerTable)
	{	
		innerTable = table.pullItemsToLeftCorner(innerTable);

		var retObject = null;
		for(objectName in objects) {
			var object = objects[objectName];
			var matches = 0;

			for(var y = 0; y < 3; y++) {
				for(var x = 0; x < 3; x++) {
					if(object[y][x] == innerTable[y][x]) {
						matches++;
					}
				}
			}

			if(matches == 9) {
				return objectName;
			}
		}

		return retObject;
	},
	offsetGetObject: function(object, offsetX, offsetY) {
		var newObject = nilTable;
		for(var y = 0; y < object.length; y++) {
			for(var x = 0; x < object[y].length; x++) {
				if(object[y][x] != bo.nil) {
					newObject[y - offsetY][x - offsetX] = object[y][x];
				}
			}
		}

		return newObject;
	}
}

var testObject = [
	[bo.nil, bo.nil, bo.nil],
	[bo.nil, bo.nil, bo.woodPlank],
	[bo.nil, bo.nil, bo.woodPlank]
];

var d = table.match(testObject);
console.log(d);