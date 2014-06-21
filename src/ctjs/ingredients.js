var Ingredient = function(id, name, full_name, recipe, image, stackable, rawData) {
	var pub = this;
	pub.equals = function(ingredient) {
		return this.name == ingredient.name;
	}

	this.id = id;
	this.name = name;
	this.recipe = recipe;
    this.full_name = full_name;
    this.image = 'img/icons/' + this.name.replace(/_/g, '') + '_icon32.png';
    this.stackable = stackable;
    this.rawData = rawData;
}

var Ingredients = function(ingredients) {
	var namedList = {};
	var numericList = {};
	var pub = this;
	pub.air = new Ingredient(0, 'air');
	pub.getList = function() {
		return numericList;
	}
	pub.setList = function(inList) {
		numericList = inList;

		// Populate name-indexed list
		for(i in inList) {
			var ing = inList[i];
			namedList[ing.name] = ing;
		}
	}
	var normalizeIngredientName = function(name) {
		return name.toLowerCase().replace(/\s/g, '_');
	}
	pub.get = function(name) {
		if(typeof namedList[name] === 'undefined') {
			throw new Error('Ingredient not found by name: ' + name);
		} else {
			return namedList[name];
		}
	}
	pub.getById = function(id) {
		if(typeof numericList[id] !== 'undefined') {
			return numericList[id];
		} else {
			throw new Error('Ingredient not found by id: ' + id);
		}
	}
	pub.setListFromJson = function(data) {
		var newList = [];
		for(ingredientKey in data) {
			var ingData = data[ingredientKey];
			if(typeof(ingData.l_name) !== 'string') {
				continue;
			}

			var normalizedName = normalizeIngredientName(ingData.l_name);
			var ing = new Ingredient(
				ingData.id_mc,
				normalizedName,
				ingData.l_name,
				ingData.recipe,
				ingData.image,
				ingData.stackable,
				ingData
			);
			newList[ingData.id_mc] = ing;

			// Although we have an air object set by default, if the inner json 
			// has air ingredient we set it anyway.
			if(normalizedName == 'air') {
				pub.air = ing;
			}
		}

		pub.setList(newList);
	}

	// Initialization
	pub.setListFromJson(ingredients);
}