
goog.require('goog.dom');

var currentVolObject;
var currentObjects = [];

/**
 * Returns the already-created X object that matches the provided file.
 * @param {String} f Filename / filepath
 * @return {Object | undefined}
 */
function getObjFromList(f) {
    for (var i = 0; i < currentObjects.length; ++i) {
        if (currentObjects[i].file == f) return currentObjects[i];
    }
}

/**
 * Show / hide 2D div elements and make 3D div element larger / smaller to
 * accomodate changes.
 * @param {boolean} wantToSee True if we want to see the 2D div elements
 * @return {undefined}
 * /
function toggle2DVisibility(wantToSee) {
    var v = goog.dom.getElement('vDiv');
    var x = goog.dom.getElement('xDiv');
    var y = goog.dom.getElement('yDiv');
    var z = goog.dom.getElement('zDiv');
    
    var h = (wantToSee) ? '66.6%' : '100%';
    var o = (wantToSee) ? '1' : '0';
    
    v.style.height = h;
    x.style.opacity = o;
    y.style.opacity = o;
    z.style.opacity = o;
    
    // fire resize event to update canvas height
    var evt = document.createEvent('UIEvents');
    evt.initUIEvent('resize', true, false, window, 0);
    window.dispatchEvent(evt);
} */


/**
// add a handler for viewing mode detecting
//$(window).resize(detect_viewingmode);

 * Switches between portrait and landscape display, depending on width to height
 * ratio of doc. From slicedrop (http://slicedrop.com/js/jquery.frontpage.js)
 * /
function detect_viewingmode() {
    var d = goog.dom.getDocument();
    if (goog.dom.getDocumentWidth()*0.6 < goog.dom.getDocumentHeight()*0.8) {
        goog.dom.classes.remove(d, 'landscape');
        goog.dom.classes.add(d, 'portrait');
    } else {
        goog.dom.classes.remove(d, 'portrait');
        goog.dom.classes.add(d, 'landscape');
    }
};
// */