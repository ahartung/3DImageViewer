
/**
 * Set properties and starting values of x/y/zSliders and x/y/zIndexBoxes.
 * Only called once *volume* has loaded.
 * @param {Object} obj X object sliders will control
 * @return {undefined}
 */
function initSliceSliders(obj) {
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
    $('#xSlider').slider('option', 'max', obj.dimensions[2]-1);
    $('#ySlider').slider('option', 'max', obj.dimensions[1]-1);
    $('#zSlider').slider('option', 'max', obj.dimensions[0]-1);
    
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

/**
 * Updates X slider value and displayed X index on scrolling.
 * @param {undefined}
 * @return {undefined}
 */
var updateXonScroll = function() {
    $('#xSlider').slider('option', 'value', currentObject._indexX);
    $('#xIndexBox').val(currentObject._indexX);
};

/**
 * Updates Y slider value and displayed X index on scrolling.
 * @param {undefined}
 * @return {undefined}
 */
var updateYonScroll = function() {
    $('#ySlider').slider('option', 'value', currentObject._indexY);
    $('#yIndexBox').val(currentObject._indexY);
};

/**
 * Updates Z slider value and displayed X index on scrolling.
 * @param {undefined}
 * @return {undefined}
 */
var updateZonScroll = function() {
    $('#zSlider').slider('option', 'value', currentObject._indexZ);
    $('#zIndexBox').val(currentObject._indexZ);
};

/**
 * Updates volume object's currently displayed slices and index boxes to match
 * slider's position. Called when slider slides or changes.
 * @param {Event} event Slide or change event
 * @param {Object} ui Slider object
 * @return {undefined}
 */
// TODO: only update the one plane that needs to be updated
function updateOnSlide(event, ui) {
    // update volume's current indices
	currentObject._indexX = $('#xSlider').slider('value');
	currentObject._indexY = $('#ySlider').slider('value');
	currentObject._indexZ = $('#zSlider').slider('value');
    currentObject.modified();
    
    // update index box's current indices
    $('#xIndexBox').val(currentObject._indexX);
    $('#yIndexBox').val(currentObject._indexY);
    $('#zIndexBox').val(currentObject._indexZ);
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
    if (! currentObject) { window.alert('volume must be loaded'); return; }
    
	var l = 0;
    var h;
    
    id = '#' + id[0];
    if (id == '#x') { h = currentObject.dimensions[2]; }
    if (id == '#y') { h = currentObject.dimensions[1]; }
    if (id == '#z') { h = currentObject.dimensions[0]; }
    
    var sliceNum = $(id + 'IndexBox').val();
    
    // bounds and type checking
    if (sliceNum < l || sliceNum > h || isNaN(sliceNum)) {
        $(id + 'IndexBox').val( $(id + 'Slider').slider('value') );
    } else {
        // update volume's current indices
        if (id == '#x') { currentObject._indexX = sliceNum; }
        if (id == '#y') { currentObject._indexY = sliceNum; }
        if (id == '#z') { currentObject._indexZ = sliceNum; }
        currentObject.modified();
        
        // update slider's value
        $(id + 'Slider').slider('option', 'value', sliceNum); 
    }
}
