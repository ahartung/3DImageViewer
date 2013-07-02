
/**
 * Add a single opacity slider, a single threshold slider, and a single volume
 * rendering checkbox option for the Volumes folder.
 * @param {undefined}
 * @return {undefined}
 */
// using a wrapper for the slider allows it to be smoothly hidden/shown via accordion
function setupVolumeOptions() {
    // create opacity slider
    var oWrapper = goog.dom.createDom('div', { 'id': 'opacityWrapper', 'class': 'wrapper' });
    goog.dom.appendChild(oWrapper, goog.dom.createDom('div', { 'id': 'opacitySliderVol' }));
    goog.dom.append(voluContent, [
        goog.dom.createDom('div', { 'class': 'label', 'innerHTML': 'opacity' }),
        oWrapper
    ]);
    
    // create threshold slider
    var tWrapper = goog.dom.createDom('div', { 'id': 'threshWrapper', 'class': 'wrapper' });
    goog.dom.appendChild(tWrapper, goog.dom.createDom('div', { 'id': 'threshSlider' }));
    goog.dom.append(voluContent, [
        goog.dom.createDom('div', { 'class': 'label', 'innerHTML': 'threshold' }),
        tWrapper
    ]);

    // create volume rendering option
    var outerRendDiv = goog.dom.createDom('div', { 'id': 'outerRendDiv' });
    addButtonAndLabel(outerRendDiv, 'renderButtonForVolumes', 'volume rendering');  // create button and label
    goog.dom.appendChild(voluContent, outerRendDiv);  // add to folder's contents
    addRenderingButtonListener();                     // listen for changes
    
    /*
    // create visibility option
    var outerVisDiv = goog.dom.createDom('div', { 'id': 'outerVisDiv' });
    addButtonAndLabel(outerVisDiv, 'visButtonForVolumes', 'visible');
    goog.dom.appendChild(voluContent, outerVisDiv);
    addVisButtonListener();
    */

}

/**
 * Create a checkbox button and label.
 * @param {Element} parent Outer div element containing button and label
 * @param {String} name Unique name for button
 * @param {String} label Visible label
 * @return {undefined} 
 */
function addButtonAndLabel(parent, name, label) {
    goog.dom.append(parent, [
        goog.dom.createDom('input', {
            'id': name,
            'type': 'checkbox' }),
        goog.dom.createDom('label', { 
            'class': 'label',
            'for': name,
            'innerHTML': label })
    ]);
}

/**
 * Sets the volume rendering property of the currently displayed volume object
 * when the associated button changes.
 * @param {undefined}
 * @return {undefined}
 */
function addRenderingButtonListener() {
    $(document.getElementById('renderButtonForVolumes')).change( function() {
        if (this.checked) { currentVolObject.volumeRendering = true; } // add rendering
        else { currentVolObject.volumeRendering = false; } // remove rendering
    });
}

/**
 * Sets the visibility property of the currently displayed volume object when
 * the associated button changes.
 * @param {undefined}
 * @return {undefined}
 */
function addVisButtonListener() {
    $(document.getElementById('visButtonForVolumes')).change( function() {
        if (this.checked) { currentVolObject.visible = true; }
        else { currentVolObject.visible = false; }
    });
}


