describe('Matcher', function() {
	var ings, table = null;
	beforeEach(function() {
		ings = new Ingredients(mockIngredients);

		table = new Table(ings);
	});

	it('Planify a list of ingredient objects', function() {
		var testInnerObject = [
		    ings.air, ings.air, ings.air,
		    ings.air, ings.air, ings.get('wooden_plank'),
		    ings.air, ings.air, ings.get('wooden_plank')
		];

		var testOuterObject = [
		    ings.get('wooden_plank'), ings.air, ings.air,
		    ings.get('wooden_plank'), ings.air, ings.air,
		    ings.air, ings.air, ings.air
		];

		var planified = table.planify(testInnerObject);
		for(a in planified) {
			expect(planified[a].equals(testOuterObject[a]));
		}
	});

	it('Convert a list of ids into a list of ingredient object', function() {
		var testInnerObject = [
		    0, 0, 0,
		    0, 0, 5,
		    0, 0, 5
		];

		var testOuterObject = [
		    ings.air, ings.air, ings.air,
		    ings.air, ings.air, ings.get('wooden_plank'),
		    ings.air, ings.air, ings.get('wooden_plank')
		];

		expect(table.convertNumericToObjectRecipe(testInnerObject)).toEqual(testOuterObject);
	});

	it('Matches a stick with ingredients in the exact position', function() {
		var testObject = [
		    ings.get('wooden_plank'), ings.air, ings.air,
		    ings.get('wooden_plank'), ings.air, ings.air,
		    ings.air, ings.air, ings.air
		];

		expect(table.match(testObject)).toEqual(ings.get('stick'));
	});

	it('Matches a stick with ingredients in a offseted but still valid position (1)', function() {
		var testObject = [
		    ings.air, ings.get('wooden_plank'), ings.air,
		    ings.air, ings.get('wooden_plank'), ings.air,
		    ings.air, ings.air, ings.air
		];

		expect(table.match(testObject)).toEqual(ings.get('stick'));
	});

	it('Matches a stick with ingredients in a offseted but still valid position (2)', function() {
		var testObject = [
		    ings.air, ings.air, ings.air,
		    ings.get('wooden_plank'), ings.air, ings.air,
		    ings.get('wooden_plank'), ings.air, ings.air
		];

		expect(table.match(testObject)).toEqual(ings.get('stick'));
	});

	it('Do not match a stick with all necessary ingredients but in an invalid position', function() {
		var testObject = [
		    ings.air, ings.get('wooden_plank'), ings.get('wooden_plank'),
		    ings.air, ings.air, ings.air,
		    ings.air, ings.air, ings.air
		];

		expect(table.match(testObject)).toEqual(null);
	});

	it('Create a wooden plank from oak wood', function() {
		var testObject = [
		    ings.air, ings.get('oak_wood'), ings.air,
		    ings.air, ings.air, ings.air,
		    ings.air, ings.air, ings.air
		];

		expect(table.match(testObject)).toEqual(ings.get('wooden_plank'));
	});
});