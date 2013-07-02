/**
 * Toggles the volume folder's sliders and checkboxes to match the values
 * of the currently displayed object. Called when the volume object that is 
 * displayed changes.
 * @param {Object} newObj X object that is newly selected
 * @return {undefined}
 */
function toggleVolumeVisibility(newObj) {
    currentVolObject.visible = false;
    currentVolObject = newObj;
    
    // set rendering option to match object property
    goog.dom.getElement('renderButtonForVolumes').checked =
        (currentVolObject.volumeRendering) ? 'checked' : '';
    
    // set threshold sliders to match object properties
    $('#threshSlider').slider('option', 'min', currentVolObject.min);
    $('#threshSlider').slider('option', 'max', currentVolObject.max);
    $('#threshSlider').slider('option', 'values', [currentVolObject.lowerThreshold, currentVolObject.upperThreshold]);
    
    // set opacity slider to match object property
    $('#opacitySliderVol').slider('option', 'value', currentVolObject.opacity);
    
    update2Drenderers(newObj);  // updates 2D renderers so that correct images are displayed
}

