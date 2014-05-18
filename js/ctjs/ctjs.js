var ctjs = {
    drag: {
        config: {
            containment: '.crafting-holder'
        },
        bind: function(elem) {
            var draggie = new Draggabilly(elem, ctjs.drag.config);
            draggie.on('dragEnd', ctjs.drag.onDragEnd);
        },
        bindAllIngredients: function() {
            var elements = document.querySelectorAll('.ingredient');
            for(i in elements) {
                if(typeof elements[i] == "object") {
                    ctjs.drag.bind(elements[i]);
                }
            }
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
            console.log('ingredienttogrid');

            if(drg.isGrid(destElement)) {
                console.log('isgrid');

                if(drg.isGridEmpty(destElement)) {
                    console.log('isempty');
                    // Add to destination grid and mark that grid as full
                    drg.setGridFilled(destElement);
                    destElement.innerHTML = '';
                    destElement.appendChild(sourceElement);
                    drg.resetElementPosition(sourceElement);

                    // Remove from source grid and mark as empty
                    drg.setGridEmpty(sourceElement.parentNode);
                } else {
                    drg.resetElementPosition(sourceElement);
                }
            } else {
                drg.resetElementPosition(sourceElement);
            }
        },
        resetElementPosition: function(element) {
            ctjs.drag.moveIngredient(element, 0, 0);
        },
        setGridFilled: function(element) {
            element.setAttribute('grid-filled', 'true');
        },
        setGridEmpty: function(element) {
            element.setAttribute('grid-filled', 'false');
        },
        isGrid: function(element) {
            return element.getAttribute('grid') !== 'null';
        },
        isGridFilled: function(element) {
            return element.getAttribute('grid-filled') === 'true';
        },
        isGridEmpty: function(element) {
            return element.getAttribute('grid-filled') === 'false';
        }
    }
}