/** 
 * Returns file extension.
 * @param {String} file Filename or filepath
 * @return {String} All lowercase file extension
 */
function getFileExt(file) {
    // extract all letters following last period
    var ext = file.slice(file.lastIndexOf(".") + 1, file.length);
    // .nii.gz files will be wrongly stripped to .gz, check and correct for it
    if (ext == "gz") ext = "nii." + ext;
    return ext.toLowerCase();
}

/**
 * Creates and returns X object (mesh, volume, ...), as determined by
 * file extension. https://github.com/xtk/X/wiki/X%3AFileformats
 * @param {String} ext Extension of file
 * @return {Object} X object
 */
function getXTKObjName(ext) {
    var obj;
    switch(ext) {
        // surface models / mesh files
        case ("stl"):       // tested - link supported, UNKNOWN local
        case ("vtk"):       // tested - link supported, not local supported
        case ("obj"):       // tested - UNKNOWN link, local supported
        case ("fsm"):       //    // freesurfer
        case ("inflated"):  //    // freesurfer
        case ("smoothwm"):  // tested - link supported // freesurfer
        case ("pial"):      //    // freesurfer
        case ("orig"):      //    // freesurfer
            obj = new X.mesh();
            break;
        
        // DICOM / volume files
        case ("nrrd"):      // tested - file supported
        case ("nii"):       // tested - file supported
        case ("nii.gz"):    // tested - failed: Uncaught Error: Unsupported NII data type: 4096 (xtk.js:370)
        case ("mgh"):       // tested - file supported
        case ("mgz"):       // tested - file supported
        case ("dicom"):     // 
        case ("dcm"):       // tested - file supported
            obj = new X.volume();
            break;
        
        // tractography files
        case ("trk"):       // tested - file supported
            obj = new X.fibers();
            break;
        /*
        // scalar overlay files
        case ("crv"):
        case ("label"):
            obj = new X. ...;
            break;
        */
        default:
            window.alert("haven't added support for ." + ext + " files yet");
            break;
    }
    return obj;
};

/**
 * Returns true iff file extension is associated with volume objects.
 * @param {String} file Filename or filepath
 * @return {boolean} T iff file ext = volume object
 */
function isVolume(file) {
    var ext = getFileExt(file);
    var volumeExts = ['nrrd', 'nii', 'nii.gz', 'mgh', 'mgz', 'dicom', 'dcm'];
    
    var isVol = false;
    for (var i=0; i < volumeExts.length; ++i) {
        if (volumeExts[i] == ext) {
            isVol = true;
            break;
        }
    }
    
    return isVol;
};
