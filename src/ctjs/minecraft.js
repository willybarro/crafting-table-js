var table = {
    ingredients: [],
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
                if(object.recipe[i].id_mc == innerTable[i].id_mc) {
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
            if(table[i] !== 0) {
                firstObjectFound = true;
            }

            if(firstObjectFound) {
                plannified.push(table[i]);
            }
        }

        // Fill table with nil objects
        for(var i = plannified.length; i < 9; i++) {
            plannified.push(ingredients.air);
        }

        return plannified;
    }
}