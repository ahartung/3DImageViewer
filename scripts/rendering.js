// include all X-classes used -- only required when using xtk-deps.js
goog.require('X.renderer3D');
goog.require('X.renderer2D');
goog.require('X.volume');
goog.require('X.mesh');
goog.require('X.fibers');

var firstVolObj = true;

var threeDrenderer;
var twoDrendererX;
var twoDrendererY;
var twoDrendererZ;

/**
 * Creates and returns a new X object (object depends on file type).
 * @param {string} file File name or path
 * @return {Object} X object
 */
function createXObject(file) {
	var ext = getFileExt(file);
    obj = getXTKObjName(ext);
    
    // associate file 
    if (ext == "dcm" || ext == "dicom") {
        var dicomFiles = [];
        var numFiles = 160;     // TODO read this in at some point
        for (var i=1; i <= numFiles; ++i) {
            var q;
            if (i < 10) q = '00' + i;
            else if (i < 100) q = '0' + i;
            else q = i;
            dicomFiles.push(q);
        }
        obj.file = dicomFiles.sort().map(function(obj) {
            return file.slice(0, -4) + obj + ".dcm";
        });
    } else {
        obj.file = file;
    }
    
    return obj;
}

/**
 * Creates and initializes 3D renderer.
 * @param {string} vID Div ID of element to place renderer in.
 * @return {undefined}
 */
function create3D(vID) {
    // create and initialize a 3D renderer
    threeDrenderer = new X.renderer3D();
    threeDrenderer.container = vID;
    threeDrenderer.init();
}

/**
 * Creates and initializes three 2D renderers.
 * @param {string} xID Div ID of element to place X renderer in
 * @param {string} yID Div ID of element to place Y renderer in
 * @param {string} zID Div ID of element to place Z renderer in
 * @return {undefined}
 */
function create2D(xID, yID, zID) {
    // create and initialize three 2D renderers
    twoDrendererX = new X.renderer2D();
    twoDrendererY = new X.renderer2D();
    twoDrendererZ = new X.renderer2D();
    twoDrendererX.container = xID;
    twoDrendererY.container = yID;
    twoDrendererZ.container = zID;
    twoDrendererX.orientation = 'X';
    twoDrendererY.orientation = 'Y';
    twoDrendererZ.orientation = 'Z';
    twoDrendererX.init();
    twoDrendererY.init();
    twoDrendererZ.init();
}

/**
 * Create all 4 renderers and add X object to 3D renderer. Called when a 3D file
 * is dropped into a viewport not yet displaying 3D images.
 * @param {Object} object X object
 * @param {string} vID Viewer div id
 * @param {string} xID X plane div id
 * @param {string} yID Y plane div id
 * @param {string} zID Z plane div id
 * @return {undefined}
 */
function createRenderers(object, vID, xID, yID, zID) {
    
    // add in the elements for the renderers
    var v = goog.dom.createDom('div', { 'id': vID, 'class': 'threeD'});
    var x = goog.dom.createDom('div', { 'id': xID, 'class': 'twoD' });
    var y = goog.dom.createDom('div', { 'id': yID, 'class': 'twoD' });
    var z = goog.dom.createDom('div', { 'id': zID, 'class': 'twoD' });
    goog.dom.append(goog.dom.getElement('viewDiv'), [v, x, y, z]);
    
    // add in the elements for the sliders and index boxes
    goog.dom.append(x, [goog.dom.createDom('div', { 'id': 'xSlider', 'class': 'slice' }),
                        goog.dom.createDom('input', { 'id': 'xIndexBox', 'class': 'indexBox' })]);
    goog.dom.append(y, [goog.dom.createDom('div', { 'id': 'ySlider', 'class': 'slice' }),
                        goog.dom.createDom('input', { 'id': 'yIndexBox', 'class': 'indexBox' })]);
    goog.dom.append(z, [goog.dom.createDom('div', { 'id': 'zSlider', 'class': 'slice' }),
                        goog.dom.createDom('input', { 'id': 'zIndexBox', 'class': 'indexBox' })]);
    
    create3D(vID);
    create2D(xID, yID, zID);
    threeDrenderer.render();
};

/**
 * Destroys all 4 renderers. Called when a 2D file is dropped into a viewport
 * currently displaying 3D images.
 * @param {undefined}
 * @return {undefined}
 */
function destroyRenderers() {
    threeDrenderer.destroy();
    twoDrendererX.destroy();
    twoDrendererY.destroy();
    twoDrendererZ.destroy();
}

/**
 * Sets the .onShowtime() method of the 3D renderer. If we want to show the 2D
 * renderers, they are prepped and rendered, and the sliders are initialized.
 * @param {Object} object X object to be displayed
 * @param {boolean} show2D True if we want to show 2D renderers
 * @return {undefined}
 */
function setOnShowtime3D(object, show2D) {
    if (show2D) {
        threeDrenderer.onShowtime = function() {
            if (firstVolObj) {
                setupVolumeOptions();
                initSliceSliders();
                firstVolObj = false;
            }
            update2Drenderers(object);
            initVolOpacitySlider();
            initThreshSlider();
            
        };
    } else {
        threeDrenderer.onShowtime = function() { };
    }
}

/**
 * Adds the provided object to each of the 2D renderers and renders. Calls
 * the slice slider init function to re-init sliders and index boxes for new object.
 * @param {Object} X object to be added
 * @return {undefined}
 */
function update2Drenderers(object) {
    twoDrendererX.add(object);
    twoDrendererX.render();
    
    twoDrendererY.add(object);
    twoDrendererY.render();
    
    twoDrendererZ.add(object);
    twoDrendererZ.render();
    
    updateSlices();
//    object.modified;
}

//goog.dom.getElement('buttonX').onclick = function() { }

