describe('Ingredients Object', function() {
	it("Set list from json and see if it is correctly setted up", function() {
		var ings = new Ingredients(mockIngredients);

		var list = ings.getList();
		expect(typeof(list[0])).toEqual("object");
		expect(typeof(list[1])).toEqual("object");
	});

	it('Find an ingredient by its name using get', function() {
		var ings = new Ingredients(mockIngredients);

		expect(ings.get('air')).toNotEqual(null);
		expect(ings.get('wooden_plank')).toNotEqual(null);
		
		expect(function() { ings.get('air_non_existent'); }).toThrow();
	});

	it('Find an ingredient by its id', function() {
		var ings = new Ingredients(mockIngredients);

		expect(ings.getById(0)).toEqual(ings.air);
		expect(ings.getById(1)).toEqual(ings.get('stone'));

		expect(ings.getById(0)).toNotEqual(ings.wooden_plank);

		expect(function() { ings.getById(-1); }).toThrow();
	});

	it('Test ingredient equals function', function() {
		var ings = new Ingredients(mockIngredients);

		var air = ings.get('air');
		var wooden_plank = ings.get('wooden_plank');

		expect(air.equals(air)).toBe(true);
		expect(wooden_plank.equals(wooden_plank)).toBe(true);

		expect(air.equals(wooden_plank)).toBe(false);
	});

	it('Same-name ingredients with diferent ids should still work with getId', function() {
		var ings = new Ingredients(mockIngredients);

		var air = ings.get('air');
		var wooden_plank = ings.get('wooden_plank');

		expect(air.equals(air)).toBe(true);
		expect(wooden_plank.equals(wooden_plank)).toBe(true);

		expect(air.equals(wooden_plank)).toBe(false);
	});
});