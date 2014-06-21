describe('Matcher', function() {
	var ings, table = null;
	beforeEach(function() {
		var mockIngredientsJson = [
			{"id_mc":"0","stackable":0,"l_name":"Air","ot_name":"Non-Solid Block","id_source_type":0,"image":"http:\/\/minecraftdatavalues.com\/images\/1\/0.png"},
			{"id_mc":"1","stackable":64,"l_name":"Stone","ot_name":"Solid Block","id_source_type":3,"image":"http:\/\/minecraftdatavalues.com\/images\/1\/1.png"},
			{"id_mc":"2","stackable":0,"l_name":"Grass","ot_name":"Solid Block","id_source_type":0,"image":"http:\/\/minecraftdatavalues.com\/images\/1\/2.png"},
			{"id_mc":"3","stackable":64,"l_name":"Dirt","ot_name":"Solid Block","id_source_type":2,"image":"http:\/\/minecraftdatavalues.com\/images\/1\/3.png"},
			{"id_mc":"4","stackable":64,"l_name":"Cobblestone","ot_name":"Solid Block","id_source_type":2,"image":"http:\/\/minecraftdatavalues.com\/images\/1\/4.png"},
			{"id_mc":"5","stackable":64,"l_name":"Wooden Plank","ot_name":"Solid Block","id_source_type":1,"image":"http:\/\/minecraftdatavalues.com\/images\/1\/5.png","recipe":[0,0,0,0,17,0,0,0,0]},
			{"id_mc":"17","stackable":64,"l_name":"Oak Wood","ot_name":"Solid Block","id_source_type":2,"image":"http:\/\/minecraftdatavalues.com\/images\/1\/17.png"},
			{"id_mc":"280","stackable":64,"l_name":"Stick","ot_name":"Raw Material","id_source_type":1,"image":"http:\/\/minecraftdatavalues.com\/images\/2\/280.png","recipe":[0,0,0,0,5,0,0,5,0]}
		];

		ings = new Ingredients;
		ings.setListFromJson(mockIngredientsJson);

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

		expect(table.match(testObject)).toBe(ings.get('stick'));
	});

	// it('Matches a stick with ingredients in a offseted but still valid position (1)', function() {
	// 	var testObject = [
	// 	    ings.air, ings.woodPlank, 	ings.air,
	// 	    ings.air, ings.woodPlank, 	ings.air,
	// 	    ings.air, ings.air, 		ings.air
	// 	];

	// 	expect(table.match(testObject)).toBe(ings.stick);
	// });

	// it('Matches a stick with ingredients in a offseted but still valid position (2)', function() {
	// 	var testObject = [
	// 	    ings.air, ings.air, 		ings.air,
	// 	    ings.woodPlank, ings.air, 	ings.air,
	// 	    ings.woodPlank, ings.air, 	ings.air
	// 	];

	// 	expect(table.match(testObject)).toBe(ings.stick);
	// });

	// it('Do not match a stick with all ingredients but in a wrong position', function() {
	// 	var testObject = [
	// 	    ings.air, ings.woodPlank, 	ings.woodPlank,
	// 	    ings.air, ings.air, 		ings.air,
	// 	    ings.air, ings.air, 		ings.air
	// 	];

	// 	expect(table.match(testObject)).toBe(ings.air);
	// });
});