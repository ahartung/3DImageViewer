
goog.require('goog.fx.DragDrop');
goog.require('goog.fx.DragDropGroup');

// http://jsfiddle.net/QpAcf/

  /*
  // !!! doesn't get execute when dragging! menu thing
  goog.events.listen(document.getElementById('drophere'), 'click',
                     function(e) { alert('click'); });
                     */
  //event.stopPropagation();

/**
 * Sets file placeholders to be draggable and droppable into the large viewer.
 * @param {undefined}
 * @return {undefined}
 */
function initDragAndDrop() {
    var viewer = new goog.fx.DragDrop('viewDiv', 'viewer');
    var images = new goog.fx.DragDropGroup();
    
    var nodes = goog.dom.getElement('fileDiv').childNodes;
    var len = nodes.length;
    for (i = 0; i < len; i++) {
        el = nodes[i];
        if ((el.nodeType == 1) && (el.firstChild.nodeName == 'IMG')) {
            images.addItem(el, el.firstChild.getAttribute('data-file'));
        }
    }
    
    images.addTarget(viewer);
    images.setSourceClass('source');
    images.setTargetClass('target');
    viewer.setSourceClass('source');
    viewer.setTargetClass('target');
    images.init();
    viewer.init();
    
    goog.events.listen(images, 'dragstart', dragStart);
    goog.events.listen(images, 'dragend', dragEnd);
    
    goog.events.listen(viewer, 'dragover', dragOver);
    goog.events.listen(viewer, 'dragout', dragOut);
    goog.events.listen(viewer, 'drop', loadFileOnDrop);
}

function dragOver(event) { goog.style.setOpacity(event.dropTargetItem.element, 0.75); }
function dragOut(event) { goog.style.setOpacity(event.dropTargetItem.element, 1.0); }
function dragStart(event) { goog.style.setOpacity(event.dragSourceItem.element, 0.75); }
function dragEnd(event) { goog.style.setOpacity(event.dragSourceItem.element, 1.0); }

/**
 * Handles a dropped file: Creates renderers and toggle menu if none exist.
 * Always adds new object. Toggles visibility of volumes if necessary.
 * @param {Event} event	Drop event
 * @return {undefined}
 */
function loadFileOnDrop(event) {
    goog.style.setOpacity(event.dropTargetItem.element, 1.0);
    
	var file = event.dragSourceItem.data;
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


