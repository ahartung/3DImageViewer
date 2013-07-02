
goog.require('goog.ui.Component');
goog.require('goog.ui.Slider');

/**
 * Set properties and starting values of x/y/zSliders and x/y/zIndexBoxes.
 * Only called once *volume* has loaded.
 * @param {Object} obj X object sliders will control
 * @return {undefined}
 */
function initSliceSliders() {
    $("#xSlider, #ySlider, #zSlider").slider({
		orientation: "horizontal",
		min: 0,
        value: 0,
		slide: updateOnSlide,
		change: updateOnSlide
    });
    
    $('.indexBox').change( function() {
        gotoIndex($(this).attr('id'));
    });
    
    // set slider maximums for each plane
    $('#xSlider').slider('option', 'max', currentVolObject.dimensions[2]-1);
    $('#ySlider').slider('option', 'max', currentVolObject.dimensions[1]-1);
    $('#zSlider').slider('option', 'max', currentVolObject.dimensions[0]-1);
    
    // midpoints of each plane ...
    var xHalf = ~~($('#xSlider').slider('option', 'max')/2);
    var yHalf = ~~($('#ySlider').slider('option', 'max')/2);
    var zHalf = ~~($('#zSlider').slider('option', 'max')/2);
    
    // set slider values to be midpoints for each plane
    $('#xSlider').slider('option', 'value', xHalf);
    $('#ySlider').slider('option', 'value', yHalf);
    $('#zSlider').slider('option', 'value', zHalf);
    
    // set up index input boxes to be midpoints for each plane
    $('#xIndexBox').val(xHalf);
    $('#yIndexBox').val(yHalf);
    $('#zIndexBox').val(zHalf);
    
    // set up reaction functions for scrolling
    twoDrendererX.onScroll = updateXonScroll;
    twoDrendererY.onScroll = updateYonScroll;
    twoDrendererZ.onScroll = updateZonScroll;
}

/*
// undesirable -- hard to compare volumes by switching back and forth.
// index via percentage may work better
function updateSliceSliders() {
    // keep indices the same as last (unless they are out of bounds)
    var xmax = currentVolObject.dimensions[2]-1;
    var ymax = currentVolObject.dimensions[1]-1;
    var zmax = currentVolObject.dimensions[0]-1;
    
    if ($('#xSlider').slider('option', 'max') > xmax) {
        $('#xSlider').slider('option', 'max', xmax);
        $('#xSlider').slider('option', 'value', xmax);
        $('#xIndexBox').val(xmax);
    } else {
        $('#xSlider').slider('option', 'value', currentVolObject.sliceX);
    }
    
    if ($('#ySlider').slider('option', 'max') > ymax) {
        $('#ySlider').slider('option', 'max', ymax);
        $('#ySlider').slider('option', 'value', ymax);
        $('#yIndexBox').val(ymax);
    } else {
        $('#ySlider').slider('option', 'value', currentVolObject.sliceY);
    }
    
    if ($('#zSlider').slider('option', 'max') > zmax) {
        $('#zSlider').slider('option', 'max', zmax);
        $('#zSlider').slider('option', 'value', zmax);
        $('#zIndexBox').val(zmax);
    } else {
        $('zSlider').slider('option', 'value', currentVolObject.sliceZ);
    }
    
}
*/
/**
 * Updates X slider value and displayed X index on scrolling.
 * @param {undefined}
 * @return {undefined}
 */
var updateXonScroll = function() {
    $('#xSlider').slider('option', 'value', currentVolObject.indexX);
    $('#xIndexBox').val(currentVolObject.indexX);
};

/**
 * Updates Y slider value and displayed X index on scrolling.
 * @param {undefined}
 * @return {undefined}
 */
var updateYonScroll = function() {
    $('#ySlider').slider('option', 'value', currentVolObject.indexY);
    $('#yIndexBox').val(currentVolObject.indexY);
};

/**
 * Updates Z slider value and displayed X index on scrolling.
 * @param {undefined}
 * @return {undefined}
 */
var updateZonScroll = function() {
    $('#zSlider').slider('option', 'value', currentVolObject.indexZ);
    $('#zIndexBox').val(currentVolObject.indexZ);
};

/**
 * Updates volume object's currently displayed slices and index boxes to match
 * slider's position. Called when slider slides or changes.
 * @param {Event} event Slide or change event
 * @param {Object} ui Slider object
 * @return {undefined}
 */
// TODO: only update the one plane that needs to be updated (ui.value)
function updateOnSlide(event, ui) {
    // update volume's current indices
	currentVolObject.indexX = $('#xSlider').slider('value');
	currentVolObject.indexY = $('#ySlider').slider('value');
	currentVolObject.indexZ = $('#zSlider').slider('value');
    currentVolObject.modified();
    
    // update index box's current indices
    $('#xIndexBox').val(currentVolObject.indexX);
    $('#yIndexBox').val(currentVolObject.indexY);
    $('#zIndexBox').val(currentVolObject.indexZ);
}

/**
 * Changes current indices of volume to match inputted indices. Also updates
 * slider's value. Called when index input box changes. Only called when there
 * is a renderer visible, and when that renderer is displaying a volume.
 * @param {string} id Div ID of index box that changed
 * @return {undefined}
 */
function gotoIndex(id) {
	if (! threeDrenderer) { window.alert('You must select a volume first!'); return; }
    if (! currentVolObject) { window.alert('volume must be loaded'); return; }
    
	var l = 0;
    var h;
    
    id = '#' + id[0];
    if (id == '#x') { h = currentVolObject.dimensions[2]; }
    if (id == '#y') { h = currentVolObject.dimensions[1]; }
    if (id == '#z') { h = currentVolObject.dimensions[0]; }
    
    var sliceNum = $(id + 'IndexBox').val();
    
    // bounds and type checking
    if (sliceNum < l || sliceNum > h || isNaN(sliceNum)) {
        $(id + 'IndexBox').val( $(id + 'Slider').slider('value') );
    } else {
        // update volume's current indices
        if (id == '#x') { currentVolObject.indexX = sliceNum; }
        if (id == '#y') { currentVolObject.indexY = sliceNum; }
        if (id == '#z') { currentVolObject.indexZ = sliceNum; }
        currentVolObject.modified();
        
        // update slider's value
        $(id + 'Slider').slider('option', 'value', sliceNum); 
    }
}
