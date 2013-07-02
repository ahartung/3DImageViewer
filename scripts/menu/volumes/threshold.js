/**
 * Set up single threshold slider for volume folder.
 * @param {undefined}
 * @return {undefined}
 */
function initThreshSlider() {
    // set attributes
    $('#threshSlider').slider({
		orientation: 'horizontal',
        range: true,
        min: currentVolObject.min,
        max: currentVolObject.max,
        step: 1,
        values: [currentVolObject.max * 0.05, currentVolObject.upperThreshold],
		slide: updateThreshold,
		change: updateThreshold
    });
    
    currentVolObject.lowerThreshold = currentVolObject.max * 0.05;
}

/**
 * Sets the threshold values of the currently displayed volume object when the
 * slider changes.
 * @param {Event} event
 * @param {Object} ui
 * @return {undefined}
 */
function updateThreshold(event, ui) {
    currentVolObject.lowerThreshold = ui.values[0];   // lower handle value
    currentVolObject.upperThreshold = ui.values[1];   // upper handle value
}

