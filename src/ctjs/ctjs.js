var ctjs = function() {
    ctjs.craftingTable.init();
    ctjs.inventory.init();
};

ctjs.craftingTable = {
    ingredients: [],
    init: function() {
        var craftingTable = document.querySelector('#crafting-table');
        var craftingTableOutput = document.querySelector('#crafting-table-output');

        // Create grid elements of the crafting table
        for(var i=0; i<9; i++) {
            var gridElm = new ctjs.grid.element();
            craftingTable.appendChild(gridElm);
            ctjs.craftingTable.ingredients.push(gridElm);
        }

        // Create output grid
        var outputElm = new ctjs.grid.element(true);
        craftingTableOutput.appendChild(outputElm);
    },
    getIngredientAt: function(index) {
        var ingredient = null;
        if(typeof ctjs.craftingTable.ingredients[index] !== 'undefined') {
            ingredient = ctjs.craftingTable.ingredients[index].getIngredient();
        }
        return ingredient;
    },
    glad: function(bol)
    {
        return !bol;
    }
}

ctjs.inventory = {
    ingredients: [],
    init: function(numGrid) {
        var inventory = document.querySelector('#inventory');
        var numGrid = numGrid || 60;

        for(var i=0; i<numGrid; i++) {
            var gridElm = new ctjs.grid.element();
            inventory.appendChild(gridElm);
            ctjs.inventory.ingredients.push(gridElm);

            if(i == 0) {
                gridElm.attachIngredient(new ctjs.ingredient.element());
            }
        }
    }
}

ctjs.grid = {
    element: function(large) {
        var grid = document.createElement('span');
        var hasIngredient = false;
        var ingredient = null;

        grid.isGrid = true;
        grid.className = 'grid' + (large ? '-large' : '');

        grid.attachIngredient = function(ingredientToAttach) {
            hasIngredient = true;
            ingredient = ingredientToAttach;

            // Detach from the original grid
            var sourceGrid = ingredientToAttach.getGrid();
            if(sourceGrid !== null) {
                sourceGrid.detachIngredient();
            }

            // Attach to this grid
            grid.appendChild(ingredientToAttach);
            ctjs.drag.resetElementPosition(ingredientToAttach);
        }
        grid.detachIngredient = function() {
            hasIngredient = false;
            ingredient = null;
        }
        grid.getIngredient = function() {
            return ingredient;
        }
        grid.hasIngredient = function() {
            return hasIngredient;
        }

        return grid;
    }
}

ctjs.ingredient = {
    element: function() {
        var elm = document.createElement('img');
        elm.className = 'ingredient';
        elm.src = 'http://hydra-media.cursecdn.com/minecraft.gamepedia.com/d/d3/Grid_Oak_Wood_Planks.png?version=a3f9f595f866696034eff1e38067789c';
        elm.getGrid = function() {
            var grid = elm.parentNode;
            if(grid !== null && typeof grid.isGrid == 'boolean') {
                return grid;
            } else {
                return null;
            }
        }

        // Make this element draggable
        ctjs.drag.bind(elm);

        return elm;
    }
}

ctjs.drag = {
    config: {
        containment: '.crafting-holder'
    },
    bind: function(elem) {
        var draggie = new Draggabilly(elem, ctjs.drag.config);
        draggie.on('dragEnd', ctjs.drag.onDragEnd);
    },
    onDragEnd: function(instance, event, pointer) {
        instance.element.style.display = 'none';
        var pointedElement = document.elementFromPoint(event.x, event.y);
        instance.element.style.display = '';

        ctjs.drag.ingredientToGrid(instance.element, pointedElement);
    },
    moveIngredient: function(element, left, top) {
        element.style.left = left;
        element.style.top = top;
    },
    ingredientToGrid: function(sourceElement, destElement) {
        var drg = ctjs.drag;

        if(!!destElement.isGrid) {
            if(destElement.hasIngredient()) {
                drg.resetElementPosition(sourceElement);
            } else {
                destElement.attachIngredient(sourceElement);
            }
        } else {
            drg.resetElementPosition(sourceElement);
        }
    },
    resetElementPosition: function(element) {
        ctjs.drag.moveIngredient(element, 0, 0);
    }
};










/**
 * Matcher
 */
var bo = {
    'nil': 'nil',
    'woodPlank': 'woodPlank',
    'stick': 'stick'
}
var objects = {
    nil: [
        [bo.nil,    bo.nil,             bo.nil],
        [bo.nil,    bo.nil,             bo.nil],
        [bo.nil,    bo.nil,             bo.nil]
    ],
    stick: [
        [bo.woodPlank,  bo.nil,         bo.nil],
        [bo.woodPlank,  bo.nil,         bo.nil],
        [bo.nil,        bo.nil,         bo.nil]
    ],
    axe: [
        [bo.woodPlank,  bo.woodPlank,   bo.nil],
        [bo.nil,        bo.stick,       bo.nil],
        [bo.nil,        bo.stick,       bo.nil]
    ]
};

var table = {
    defineObjectBoundaries: function(tb)
    {
        yFirstObject = -1;
        xFirstObject = -1;
        for(y in tb) {
            for(x in tb[y]) {
                if(tb[y][x] != bo.nil) {
                    if(xFirstObject == -1 || x < xFirstObject) {
                        xFirstObject = x;
                    }

                    if(yFirstObject == -1 || y < yFirstObject) {
                        yFirstObject = y;
                    }
                }
            }
        }

        return {x: parseInt(xFirstObject), y: parseInt(yFirstObject)};
    },
    pullItemsToLeftCorner: function(tab)
    {
        var boundaries = table.defineObjectBoundaries(tab);
        tab = table.offsetGetObject(tab, boundaries.x, boundaries.y);
        return tab;
    },
    match: function(innerTable)
    {   
        innerTable = table.pullItemsToLeftCorner(innerTable);

        var retObject = null;
        for(objectName in objects) {
            var object = objects[objectName];
            var matches = 0;

            for(var y = 0; y < 3; y++) {
                for(var x = 0; x < 3; x++) {
                    if(object[y][x] == innerTable[y][x]) {
                        matches++;
                    }
                }
            }

            if(matches == 9) {
                return objectName;
            }
        }

        return retObject;
    },
    offsetGetObject: function(object, offsetX, offsetY) {
        var newObject = objects.nil;
        for(var y = 0; y < object.length; y++) {
            for(var x = 0; x < object[y].length; x++) {
                if(object[y][x] != bo.nil) {
                    newObject[y - offsetY][x - offsetX] = object[y][x];
                }
            }
        }

        return newObject;
    }
}

var testObject = [
    [bo.nil, bo.nil, bo.nil],
    [bo.nil, bo.nil, bo.woodPlank],
    [bo.nil, bo.nil, bo.woodPlank]
];

var d = table.match(testObject);
console.log(d);