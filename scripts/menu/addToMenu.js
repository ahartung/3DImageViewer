
/**
 * Creates both a folder header div and a content div. Adds both to parent
 * element (the menu's main content div) and returns the folder content element.
 * @param {String} folderName Title of the folder (to be shown)
 * @return {Element} The newly created folder content
 */
function addFolderToMenu(folderName) {
    // header div containing both icon and label
    var folderHeader = goog.dom.createDom('div', {
        'id': folderName + 'Header',
        'class': 'collapsibleHeader folder', });
        
    // add icon and label to header
    goog.dom.append(folderHeader, [
        goog.dom.createDom('div', { 'class': 'arrow ui-icon ui-icon-triangle-1-s', 'style': 'display: inline-block' }),
        goog.dom.createDom('div', { 'innerHTML': folderName, 'style': 'display: inline-block' })
    ]);
    
    // content div for this header
    var folderContent = goog.dom.createDom('div', {
        'id': folderName + 'Content',
        'class': 'collapsibleContent' });
    
    // add a marker for volume content
    if (folderName == 'volumes') {
        goog.dom.appendChild(folderContent, goog.dom.createDom('span', { 'id': 'marker' }));
    }
    
    // add folder to the menu
    goog.dom.append(menuContent, [folderHeader, folderContent]);
    return folderContent;
}

