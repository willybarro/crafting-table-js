var Ingredient = function(id, name, full_name, recipe, image, stackable, rawData) {
	var pub = this;
	pub.equals = function(ingredient) {
		return this.name == ingredient.name;
	}

	this.id = id;
	this.name = name;
	this.recipe = recipe;
    this.full_name = full_name;
    this.image = image;
    this.stackable = stackable;
    this.rawData = rawData;
}

var Ingredients = function(inList) {
	var namedList = {};
	var numericList = {};
	var pub = this;
	pub.air = new Ingredient(0, 'air');
	pub.getList = function() {
		return namedList;
	}
	pub.setList = function(inList) {
		namedList = inList;

		// Populate numeric-indexed list
		for(a in inList) {
			var ing = inList[a];
			numericList[ing.id] = ing;
		}
	}
	var normalizeIngredientName = function(name) {
		return name.toLowerCase().replace(' ', '_');
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
	var loadListFromAjax = function() {
		$.ajax({
			url: 'src/ingredients.json',
			success: function(data) {
				pub.setListFromJson(data);
			}
		});
	}
	pub.setListFromJson = function(data) {
		var newList = {};
		var newNumericList = [];
		for(ingredientKey in data) {
			var ingData = data[ingredientKey];
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
			newList[normalizedName] = ing;

			if(normalizedName == 'air') {
				pub.air = ing;
			}
		}

		pub.setList(newList);
	}

	// Initialize list
	if(typeof list !== "undefined") {
		pub.setList(list);
	}
}