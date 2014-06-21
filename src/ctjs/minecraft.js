var Table = function(ingredients) {
    if(!ingredients) {
        throw new Error('Ingredients can not be undefined.');
    }

    var pub = this;
	pub.match = function(innerTable)
    {
        innerTable = pub.planify(innerTable);

		var retObject = null;
        var ingList = ingredients.getList();
		for(objectName in ingList) {
			var object = ingredients.getById(objectName);
            var currentRecipe = object.recipe;
			var matches = 0;

            // If it is a base object, ignore
            if(currentRecipe == null) {
                continue;
            }
            currentRecipe = pub.convertNumericToObjectRecipe(currentRecipe);
            currentRecipe = pub.planify(currentRecipe);

            for(a in currentRecipe) {
                if(currentRecipe[a].id == innerTable[a].id) {
                    matches++;
                }
            }

			if(matches == currentRecipe.length) {
				retObject = ingredients.getById(objectName);
			}
		}

		return retObject;
	}
    pub.planify = function(table) {
        var plannified = [];
        var firstObjectFound = false;
        for(var i = 0; i < table.length; i++) {
            if(typeof(table[i]) == 'object' && table[i].name !== 'air') {
                firstObjectFound = true;
            }

            if(firstObjectFound) {
                plannified.push(table[i]);
            }
        }

        // Fill table with air objects
        for(var i = plannified.length; i < 9; i++) {
            plannified.push(ingredients.air);
        }

        return plannified;
    }
    pub.convertNumericToObjectRecipe = function(recipe) {
        var outRecipe = [];
        for(a in recipe) {
            outRecipe.push(ingredients.getById(recipe[a]));
        }

        return outRecipe;
    }
}