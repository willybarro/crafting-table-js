var ctjs = {
    init: function() {
        // 
        ctjs.craftingTable.init();
        ctjs.inventory.init();
    },
    
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


// Initialize our code
$(function() {
    ctjs.init();
});