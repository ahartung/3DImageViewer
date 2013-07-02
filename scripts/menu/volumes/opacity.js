/**
 * Set up single volume folder's opacity slider.
 * @param {undefined}
 * @return {undefined}
 */
function initVolOpacitySlider() {
    // set attributes
    $('#opacitySliderVol').slider({
		orientation: 'horizontal',
		min: 0,
        max: 1,
        step: 0.01,
        value: 1,
		slide: updateOpacity,
		change: updateOpacity
    });
}

/**
 * Change opacity of currently displayed volume object when slider changes.
 * @param {Event} event
 * @param {Object} ui
 * @return {undefined}
 */
function updateOpacity(event, ui) {
    currentVolObject.opacity = ui.value;
}
