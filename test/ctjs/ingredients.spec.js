describe('Ingredients Object', function() {
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

	it("Set list from json and see if it is correctly setted up", function() {
		var ings = new Ingredients;
		ings.setListFromJson(mockIngredientsJson);

		expect(typeof(ings.getList().air)).toEqual("object");
		expect(typeof(ings.getList().stone)).toEqual("object");
		expect(typeof(ings.getList().wooden_plank)).toEqual("object");
	});

	it('Find an ingredient by its name using get', function() {
		var ings = new Ingredients;
		ings.setListFromJson(mockIngredientsJson);

		expect(ings.get('air')).toNotEqual(null);
		expect(ings.get('wooden_plank')).toNotEqual(null);
		
		expect(function() { ings.get('air_non_existent'); }).toThrow();
	});

	it('Find an ingredient by its id', function() {
		var ings = new Ingredients;
		ings.setListFromJson(mockIngredientsJson);

		expect(ings.getById(0)).toEqual(ings.air);
		expect(ings.getById(1)).toEqual(ings.get('stone'));

		expect(ings.getById(0)).toNotEqual(ings.wooden_plank);

		expect(function() { ings.getById(-1); }).toThrow();
	});

	it('Test ingredient equals function', function() {
		var ings = new Ingredients;
		ings.setListFromJson(mockIngredientsJson);

		var air = ings.get('air');
		var wooden_plank = ings.get('wooden_plank');

		expect(air.equals(air)).toBe(true);
		expect(wooden_plank.equals(wooden_plank)).toBe(true);

		expect(air.equals(wooden_plank)).toBe(false);
	});
});