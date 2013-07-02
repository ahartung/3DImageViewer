
// http://jsfiddle.net/QpAcf/

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
    	drop: loadFileOnDrop,
    });
}

/**
 * Handles a dropped file: Creates renderers and toggle menu if none exist.
 * Always adds new object. Toggles visibility of volumes if necessary.
 * @param {Event} event	Drop event
 * @param {Object} ui Dropped object
 * @return {undefined}
 */
function loadFileOnDrop(event, ui) {
	var file = ui.draggable.attr('data-file');
    var filetype = getFileObjectType(file);
    
    // check to see if object has already been created and rendered...
    // don't want to recreate and rerender
    // keep desired functionality though -- set viewer to be dropped file
    var droppedObj = getObjFromList(file);
    if (droppedObj) {
        // set to be visible
        droppedObj.visible = true;
        if (filetype == 'volume' && currentVolObject != droppedObj) {
            toggleVolumeVisibility(droppedObj);
        }
        // make it 'selected'
        goog.dom.getElement(filetype + 'ButtonFor' + file).checked = 'checked';
        return;
    }
    
    // dropped file is a new object, create it and add it
	var show2D = filetype == 'volume';
	var newObj = createXObject(file);
    
    // create renderers if they don't exist yet
    if (! threeDrenderer) {
        createRenderers(newObj, 'vDiv', 'xDiv', 'yDiv', 'zDiv');
        initMenu();
        initCollapsible();
    }
    
    threeDrenderer.add(newObj);
    setOnShowtime3D(newObj, show2D);
    
    var c;
    if (filetype == 'volume') {
        c = voluContent;
        if (currentVolObject) {
            currentVolObject.visible = false;
            // deal with scrolling still
        }
        currentVolObject = newObj;
    }
    else if (filetype == 'mesh') c = meshContent;
    else if (filetype == 'fiber') c = fibrContent;
    
    currentObjects.push(newObj);
    addFileToFolder(c, file, filetype);
}


