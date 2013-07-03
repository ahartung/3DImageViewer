
goog.require('goog.ui.Component');
goog.require('goog.ui.Slider');
goog.require('goog.ui.LabelInput');

var xSlider;
var ySlider;
var zSlider;
var xBox;
var yBox;
var zBox;

/**
 * Set properties and starting values of x/y/zSliders and x/y/zIndexBoxes.
 * Only called once *volume* has loaded.
 * @param {Object} obj X object sliders will control
 * @return {undefined}
 */
function initSliceSliders() {
    createSliders();
    createIndexBoxes();
    
    updateSlices();
    
    addSliderListeners();
    addIndexBoxListeners();
    addScrollListeners();
}

function createSliders() {
    xSlider = new goog.ui.Slider;
    ySlider = new goog.ui.Slider;
    zSlider = new goog.ui.Slider;
    
    xSlider.decorate(goog.dom.getElement('xSlider'));
    ySlider.decorate(goog.dom.getElement('ySlider'));
    zSlider.decorate(goog.dom.getElement('zSlider'));
}

function createIndexBoxes() {
    xBox = new goog.ui.LabelInput;
    yBox = new goog.ui.LabelInput;
    zBox = new goog.ui.LabelInput;
    
    xBox.decorate(goog.dom.getElement('xIndexBox'));
    yBox.decorate(goog.dom.getElement('yIndexBox'));
    zBox.decorate(goog.dom.getElement('zIndexBox'));
}

/**
 * Updates volume object's currently displayed slices and index boxes to match
 * slider's position. Called when slider slides or changes.
 */
function addSliderListeners() {
    xSlider.addEventListener(goog.ui.Component.EventType.CHANGE, function() {
        currentVolObject.indexX = xSlider.getValue();
        xBox.setValue(currentVolObject.indexX);
        currentVolObject.modified();
    });
    
    ySlider.addEventListener(goog.ui.Component.EventType.CHANGE, function() {
        currentVolObject.indexY = ySlider.getValue();
        yBox.setValue(currentVolObject.indexY);
        currentVolObject.modified();
    });
    
    zSlider.addEventListener(goog.ui.Component.EventType.CHANGE, function() {
        currentVolObject.indexZ = zSlider.getValue();
        zBox.setValue(currentVolObject.indexZ);
        currentVolObject.modified();
    });
}

/**
 * Changes current indices of volume to match inputted indices. Also updates
 * slider's value. Called when index input box changes. Only called when there
 * is a renderer visible, and when that renderer is displaying a volume.
 */
function addIndexBoxListeners() {
    xBox.getElement().addEventListener(goog.ui.Component.EventType.CHANGE, function() {
        var sliceNum = new Number(xBox.getValue());
        if (sliceNum < 0 || sliceNum > currentVolObject.dimensions[2] || isNaN(sliceNum)) {
            xBox.setValue(xSlider.getValue());
        } else {
            currentVolObject.indexX = sliceNum;
            currentVolObject.modified();
            xSlider.setValue(sliceNum);
            xBox.setValue(sliceNum);
        }
    });
    
    yBox.getElement().addEventListener(goog.ui.Component.EventType.CHANGE, function() {
        var sliceNum = new Number(yBox.getValue());
        if (sliceNum < 0 || sliceNum > currentVolObject.dimensions[1] || isNaN(sliceNum)) {
            yBox.setValue(ySlider.getValue());
        } else {
            currentVolObject.indexY = sliceNum;
            currentVolObject.modified();
            ySlider.setValue(sliceNum);
        }
    });
    
    zBox.getElement().addEventListener(goog.ui.Component.EventType.CHANGE, function() {
        var sliceNum = new Number(zBox.getValue());
        if (sliceNum < 0 || sliceNum > currentVolObject.dimensions[0] || isNaN(sliceNum)) {
            zBox.setValue(zSlider.getValue());
        } else {
            currentVolObject.indexZ = sliceNum;
            currentVolObject.modified();
            zSlider.setValue(sliceNum); 
        }
    });
}

function addScrollListeners() {
    // set up reaction functions for scrolling
    twoDrendererX.onScroll = function() {
        xSlider.setValue(currentVolObject.indexX);
        xBox.setValue(currentVolObject.indexX);
    };
    twoDrendererY.onScroll = function() {
        ySlider.setValue(currentVolObject.indexY);
        yBox.setValue(currentVolObject.indexY);
    };
    twoDrendererZ.onScroll = function() {
        zSlider.setValue(currentVolObject.indexZ);
        zBox.setValue(currentVolObject.indexZ);
    };
}

function updateSlices() {
    currentVolObject.indexX = ~~(currentVolObject.indexX);
    currentVolObject.indexY = ~~(currentVolObject.indexY);
    currentVolObject.indexZ = ~~(currentVolObject.indexZ);
    
    xSlider.setMaximum(currentVolObject.dimensions[2]-1);
    ySlider.setMaximum(currentVolObject.dimensions[1]-1);
    zSlider.setMaximum(currentVolObject.dimensions[0]-1);
    
    xSlider.setValue(currentVolObject.indexX);
    ySlider.setValue(currentVolObject.indexY);
    zSlider.setValue(currentVolObject.indexZ);
    
    xBox.setValue(currentVolObject.indexX);
    yBox.setValue(currentVolObject.indexY);
    zBox.setValue(currentVolObject.indexZ);
}
