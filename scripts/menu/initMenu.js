
goog.require('goog.ui.Zippy');

var menuContent;
var voluContent;
var meshContent;
var fibrContent;

/**
 * Creates a toggle menu div element with 3 folders. Sets menu to be draggable.
 * @param {undefined}
 * @return {undefined}
 */
function initMenu() {
    // create menu
    var m = goog.dom.createDom('div', { 'id': 'menuDiv' });
    goog.dom.appendChild(goog.dom.getElement('vDiv'), m);
    
    // create primary header and content
    var mHeader = goog.dom.createDom('div', {
        'id': 'mHeader',
        'class': 'collapsibleHeader',
        'innerHTML': 'hide menu' });
    menuContent = goog.dom.createDom('div', {
        'id': 'menuContent',
        'class': 'collapsibleContent' });
    goog.dom.append(m, [mHeader, menuContent]);
    
    voluContent = addFolderToMenu('volumes');
    meshContent = addFolderToMenu('meshes');
    fibrContent = addFolderToMenu('fibers');
    
    // be able to move menu around viewer
    $('#menuDiv').draggable({
        containment: 'parent'
    })
}

/**
 * Sets the folder headers and menu header to all be collapsible by clicking.
 * Toggles menu header text between show/hide menu.
 * @param {undefined}
 * @return {undefined}
 */
function initCollapsible() {
    // all headers cause collapse
    $('.collapsibleHeader').click( function() {
        $($(this).children()[0]).toggleClass('ui-icon-triangle-1-e ui-icon-triangle-1-s');
        $(this).next('.collapsibleContent').slideToggle('medium');
    });
    
    // for whole menu toggle only: change text from show / hide
    $('#mHeader').click( function() {
        this.innerHTML = (this.innerHTML == 'show menu') ? 'hide menu' : 'show menu';
    });
}


