

/** @typedef {import('../redux/courseSlice').State} State */


/**
 * This function does two things:
 * - Create a copy of the {@link State} object passed in as parameter.
 * - Remove all the `meta` tags from the copied {@link State} object
 * This is pure function. Parameter is not mutated.
 * 
 * __IMPORTANT: The way to clone object used does not support Dates, functions, undefined, Infinity, 
 * RegExps, Maps, Sets, Blobs, FileLists, ImageDatas, sparse Arrays, Typed Arrays__
 * 
 * @param {State} state The {@link State} of courseSlice to remove all `meta` properties from.
 * @returns {Object} The {@link State} copy with `meta` properties removed.
 */
export function obtainStateWithoutMeta(state) {
    const copy = JSON.parse( JSON.stringify(state) );
    return removeMetaFromObjectInplace(copy);
}


/**
 * Recursively remove all the `meta` tags from an object. This is specifically used in the
 * {@link State} object from courseSlice.js to produce a clean json object representing courses.
 * __This is impure function. Parameter are mutated__
 * 
 * __IMPORTANT: The way to clone object used does not support Dates, functions, undefined, Infinity, 
 * RegExps, Maps, Sets, Blobs, FileLists, ImageDatas, sparse Arrays, Typed Arrays__
 * 
 * @param {State} object The object (Usually {@link State}) of courseSlice to remove all `meta` properties from.
 * @returns {Object} The {@link State} with `meta` properties removed. Note that due to implace operation, the original object
 *      will be returned
 */
function removeMetaFromObjectInplace(object) {
    for (let key in object) {
        if (key === 'meta')
            delete object[key];
        else if ( typeof(object[key]) === 'object' )
            removeMetaFromObjectInplace(object[key]);
    }
    return object;
}




export const generateEmptyCourse = (id)=> {
    return {
        id,
        meta: {
            nextSectionID: 0,
        },
        name: "Untitled Course",
        code: "",
        sections: {}
    };
}

export const generateEmptySection = (id)=> {
    return {
        id,
        meta: {
            nextTimeID: 0
        },
        section: "",
        lecturer: "",
        times: {}
    }
}

export const generateEmptyTime = (id)=> {
    return {
        id,
        dayOfWeek: 0,
        beginTime: 8,
        endTime: 9
    }
}


export function downloadJSONFromObject(object, filename) {
    const dataString = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(object, null, 4));
    const anchorElem = document.createElement('a');
    anchorElem.setAttribute('href', dataString);
    anchorElem.setAttribute('download', filename);
    anchorElem.click();
}