var ingredient = function(name, recipe, image, stackable, rawData) {
    this.name = name;
    this.recipe = recipe;
    this.image = image;
    this.stackable = stackable;
    this.rawData = rawData;

    return this;
}

var ingredients = {
	list: [],
	air: 0,
	init: function() {
		ingredients.load();
	},
	load: function() {
		$.ajax({
			url: 'src/ingredients.json',
			success: function(data) {
				ingredients.createIngredientsFromJson(data);
			}
		});
	},
	createIngredientsFromJson: function(data) {
		for(ingredientKey in data) {
			var ingData = data[ingredientKey];
			var ing = new ingredient(
				ingData.l_name,
				ingData.recipe,
				ingData.image,
				ingData.stackable,
				ingData
			);
			ingredients.list.push(ing);
		}
	}
}

// var bo = {
// 	'nil': 'nil',
// 	'woodPlank': 'woodPlank',
// 	'stick': 'stick'
// }
// ingredients.nil = new ingredient(
//     'nil',
//     null,
//     ''
// );
// ingredients.woodPlank = new ingredient(
//     'woodPlank',
//     null, 
//     ''
// );
// ingredients.stick = new ingredient(
//     'stick',
//     [ingredients.woodPlank, ingredients.nil, ingredients.nil,
// 	ingredients.woodPlank, ingredients.nil, ingredients.nil,
// 	ingredients.nil, ingredients.nil, ingredients.nil],
//     ''
// );
// ingredients.axe = new ingredient(
//     'axe',
//     [ingredients.woodPlank, 	ingredients.woodPlank, ingredients.nil,
// 	ingredients.nil, 		ingredients.stick, ingredients.nil,
// 	ingredients.nil, 		ingredients.stick, ingredients.nil],
//     ''
// );
// var nilTable = [
// 	[bo.nil,	bo.nil,	bo.nil],
// 	[bo.nil,	bo.nil,	bo.nil],
// 	[bo.nil,	bo.nil,	bo.nil]
// ];