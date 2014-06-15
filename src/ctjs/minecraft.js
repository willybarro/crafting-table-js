var ingredient = function(name, recipe, image) {
    this.name = name;
    this.recipe = recipe;
    this.image = image;

    return this;
}

var bo = {
	'nil': 'nil',
	'woodPlank': 'woodPlank',
	'stick': 'stick'
}
var ingredients = {};
ingredients.nil = new ingredient(
    'nil',
    null,
    ''
);
ingredients.woodPlank = new ingredient(
    'woodPlank',
    null, 
    ''
);
ingredients.stick = new ingredient(
    'stick',
    [ingredients.woodPlank, ingredients.nil, ingredients.nil,
	ingredients.woodPlank, ingredients.nil, ingredients.nil,
	ingredients.nil, ingredients.nil, ingredients.nil],
    ''
);
ingredients.axe = new ingredient(
    'axe',
    [ingredients.woodPlank, 	ingredients.woodPlank, ingredients.nil,
	ingredients.nil, 		ingredients.stick, ingredients.nil,
	ingredients.nil, 		ingredients.stick, ingredients.nil],
    ''
);
var nilTable = [
	[bo.nil,	bo.nil,	bo.nil],
	[bo.nil,	bo.nil,	bo.nil],
	[bo.nil,	bo.nil,	bo.nil]
];

var table = {
	match: function(innerTable)
	{
        innerTable = table.planify(innerTable);

		var retObject = ingredients.nil;
		for(objectName in ingredients) {
			var object = ingredients[objectName];
			var matches = 0;

            // If it is a base object, ignore
            if(object.recipe == null) {
                continue;
            }

			for(var i = 0; i < object.recipe.length; i++) {
                if(object.recipe[i].name == innerTable[i].name) {
					matches++;
				}
			}

			if(matches == object.recipe.length) {
				return ingredients[objectName];
			}
		}

		return retObject;
	},
    planify: function(table) {
        var plannified = [];
        var firstObjectFound = false;
        for(var i = 0; i < table.length; i++) {
            if(table[i].name != 'nil') {
                firstObjectFound = true;
            }

            if(firstObjectFound) {
                plannified.push(table[i]);
            }
        }

        // Fill table with nil objects
        for(var i = plannified.length; i < 9; i++) {
            plannified.push(ingredients.nil);
        }

        return plannified;
    }
}