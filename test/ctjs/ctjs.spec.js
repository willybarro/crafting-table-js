describe('Matcher', function() {
	// it('Planify a list of ingredients', function() {
	// 	var testInnerObject = [
	// 	    ingredients.nil, ingredients.nil, ingredients.nil,
	// 	    ingredients.nil, ingredients.nil, ingredients.woodPlank,
	// 	    ingredients.nil, ingredients.nil, ingredients.woodPlank
	// 	];

	// 	var testOuterObject = [
	// 	    ingredients.woodPlank, ingredients.nil, ingredients.nil, ingredients.woodPlank
	// 	];

	// 	expect(table.planify(testInnerObject)).toBe(testOuterObject);
	// });

	it('Matches a stick with ingredients in the exact position', function() {
		var testObject = [
		    ingredients.woodPlank, ingredients.nil, ingredients.nil,
		    ingredients.woodPlank, ingredients.nil, ingredients.nil,
		    ingredients.nil, ingredients.nil, ingredients.nil
		];

		expect(table.match(testObject)).toBe(ingredients.stick);
	});

	it('Matches a stick with ingredients in a offseted but still valid position (1)', function() {
		var testObject = [
		    ingredients.nil, ingredients.woodPlank, 	ingredients.nil,
		    ingredients.nil, ingredients.woodPlank, 	ingredients.nil,
		    ingredients.nil, ingredients.nil, 		ingredients.nil
		];

		expect(table.match(testObject)).toBe(ingredients.stick);
	});

	it('Matches a stick with ingredients in a offseted but still valid position (2)', function() {
		var testObject = [
		    ingredients.nil, ingredients.nil, 		ingredients.nil,
		    ingredients.woodPlank, ingredients.nil, 	ingredients.nil,
		    ingredients.woodPlank, ingredients.nil, 	ingredients.nil
		];

		expect(table.match(testObject)).toBe(ingredients.stick);
	});

	it('Do not match a stick with all ingredients but in a wrong position', function() {
		var testObject = [
		    ingredients.nil, ingredients.woodPlank, 	ingredients.woodPlank,
		    ingredients.nil, ingredients.nil, 		ingredients.nil,
		    ingredients.nil, ingredients.nil, 		ingredients.nil
		];

		expect(table.match(testObject)).toBe(ingredients.nil);
	});
});