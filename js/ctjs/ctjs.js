var ctjs = {
    init: function() {
        // 
        ctjs.initCraftingTable();
    },
    initCraftingTable: function() {
        var craftingTable = document.querySelector('#crafting-table');

        // Create grid elements
        for(var i=0; i<9; i++) {
            var gridElm = new ctjs.gridElement();
            craftingTable.appendChild(gridElm);

            if(i == 0) {
                gridElm.attachIngredient(new ctjs.ingredientElement());
            }
        }

    },
    ingredientElement: function() {
        var elm = document.createElement('img');
        elm.className = 'ingredient';
        elm.src = 'http://hydra-media.cursecdn.com/minecraft.gamepedia.com/d/d3/Grid_Oak_Wood_Planks.png?version=a3f9f595f866696034eff1e38067789c';
        var grid = elm.parentNode;
        elm.getGrid = function() {
            if(grid !== null && typeof grid.isGrid == 'boolean') {
                return grid;
            } else {
                return null;
            }
        }

        // Make this element draggable
        ctjs.drag.bind(elm);

        return elm;
    },
    gridElement: function() {
        var grid = document.createElement('span');
        var hasIngredient = false;
        var ingredient = null;

        grid.isGrid = true;
        grid.className = 'grid';

        grid.attachIngredient = function(ingredientToAttach) {
            grid.hasIngredient = true;

            // Detach from the original grid
            var originalGrid = ingredientToAttach.getGrid();
            if(originalGrid !== null) {
                originalGrid.detachIngredient();
            }

            // Attach to new grid
            grid.innerHTML = '';
            grid.appendChild(ingredientToAttach);
            console.log(ingredientToAttach);
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
};

ctjs.grid = {

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