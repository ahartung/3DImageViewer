
/**
 * Sets file placeholders to be draggable and the large viewer to be droppable.
 * @param {undefined}
 * @return {undefined}
 */
function initDragAndDrop() {    
    $('.placeholder').draggable({
    	containment: 'document',
    	scroll: false,
		appendTo: 'body',
		helper: 'clone',
    });
    
    $('.canDrop').droppable({
    	hoverClass: 'hovered',
        accept: '.placeholder',
    	drop: onDrop,
    });
}


/**
 * Handles a dropped file: Creates renderers if none exist, removes current
 * object from renderer (if one exists), and adds new object.
 * @param {Event} event	Drop event
 * @param {Object} ui Dropped object
 * @return {undefined}
 */
function onDrop(event, ui) {
	var file = ui.draggable.attr('data-file');
	var show2D = isVolume(file);
	var newObj = createObject(file);
    
	if (threeDrenderer) { // renderers have been created
        threeDrenderer.remove(currentObject);
        threeDrenderer.add(newObj);
    } else { // renderers have not yet been created
        createRenderers(newObj, 'vDiv', 'xDiv', 'yDiv', 'zDiv');
    }
    
    setOnShowtime(newObj, show2D);
    toggle2DVisibility(show2D);
    
    currentObject = newObj;
}


