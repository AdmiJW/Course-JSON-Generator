import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { obtainStateWithoutMeta } from "../logic/utils";


// Slice Structure:
/*
{
    meta: { 
        nextCourseID: 
        app_version:
    }
    currentSelectedCourse:
    id: {
        meta: {
            nextSectionID:
        }
        id:
        name:
        code:
        sections: {
            id: {
                meta: {
                    nextTimeID: 
                }
                section:
                lecturer:
                times: {
                    id: {
                        id:
                        dayOfWeek:
                        beginTime:
                        endTime:
                    }
                }
            }
        }
    }
}
*/



/**
 * Single Time object
 * @typedef {Object} Time
 * @property {number} id
 * @property {number} dayOfWeek
 * @property {number} beginTime
 * @property {number} endTime
 */

/**
 * Single Section object
 * @typedef {Object} Section
 * @property {{ nextTimeID }} meta
 * @property {number} id
 * @property {string} section
 * @property {string} lecturer
 * @property {Object.<number, Time>} times
 */

/**
 * Single Course object
 * @typedef {Object} Course
 * @property {{ nextSectionID }} meta
 * @property {number} id
 * @property {string} name
 * @property {string} code
 * @property {Object.<number, Section>} sections
 */

/**
 * State
 * @typedef State
 * @type {Object.<number, Course>}
 * @property {{ nextTimeID, app_version }} meta
 * @property {number} currentSelectedCourse id of course selected
 */


const APP_VERSION = '1.0.0';    // ! Used to keep track of saved file from outdated application



//=======================================
// Utilities
//=======================================
const generateEmptyCourse = (id)=> {
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

const generateEmptySection = (id)=> {
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

const generateEmptyTime = (id)=> {
    return {
        id,
        dayOfWeek: 0,
        beginTime: 8,
        endTime: 9
    }
}


function downloadJSONFromObject(object, filename) {
    const dataString = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(object, null, 4));
    const anchorElem = document.createElement('a');
    anchorElem.setAttribute('href', dataString);
    anchorElem.setAttribute('download', filename);
    anchorElem.click();
}

//=======================================
// Thunk
//=======================================
const uploadStateSaveFile = createAsyncThunk(
    'courses/uploadStateSaveFile',
    (arg)=> new Promise((resolve, reject)=> {
        // Simulate a click from <input type='file'>
        const pseudoUploader = document.createElement('input');
        pseudoUploader.setAttribute('type', 'file');
        pseudoUploader.setAttribute('accept', '.json');

        pseudoUploader.onchange = ()=> {
            const file = pseudoUploader.files[0];
            // Uploaded a non-json file or some other problems that the file is not registered.
            if (!file || file.type !== 'application/json')
                return reject("Unable to read save file. Make sure you uploaded the very same save file in .json format");

            // Read as text and parse to JSON
            const fr = new FileReader();
            fr.onload = ()=> {
                const loadedState = JSON.parse(fr.result);

                // Something is wrong with this json. We do not perform 100% check against schema, but this is least 
                // we could do.
                if (!loadedState || !loadedState.meta)
                    return reject("Corrupted/Incorrect save file. Failed to read save file");
                
                // Application version mismatch. Warn
                if (loadedState.meta.app_version !== APP_VERSION) 
                    console.warn("Saved data is from older version of application! Old version: ",
                                window.localStorage.getItem('app_version'));
                
                // Resolve the promise with loadedState
                resolve(loadedState);
            }
            
            fr.readAsText(file);
        };
        pseudoUploader.click();
    })
);



//=======================================
// Slice
//=======================================
const courseSlice = createSlice({
    name: 'courses',

    /** @type State */
    initialState: {
        meta: {
            nextCourseID: 0,
            app_version: APP_VERSION,
            currentSelectedCourse: null
        },
    },

    reducers: {
        setCurrentSelectedCourse: (state, action)=> {
            const { courseID } = action.payload;
            state.meta.currentSelectedCourse = courseID;
        },
        addCourse: (state)=> {
            const newID = state.meta.nextCourseID++;
            state[newID] = generateEmptyCourse(newID);
            state.meta.currentSelectedCourse = newID;
        },
        removeCourse: (state, action)=> {
            const { courseID } = action.payload;
            delete state[courseID];
            state.meta.currentSelectedCourse = null;
        },
        changeCourseName: (state, action)=> {
            const { courseID, name } = action.payload;
            state[courseID].name = name;
        },
        changeCourseCode: (state, action)=> {
            const { courseID, code } = action.payload;
            state[courseID].code = code;
        },
        addSection: (state, action)=> {
            const { courseID } = action.payload;
            const newID = state[courseID].meta.nextSectionID++;
            state[courseID].sections[newID] = generateEmptySection(newID);
        },
        removeSection: (state, action)=> {
            const { courseID, sectionID } = action.payload;
            delete state[courseID].sections[sectionID];
        },
        changeSection: (state, action)=> {
            const { courseID, sectionID, section } = action.payload;
            state[courseID].sections[sectionID].section = section;
        },
        changeLecturer: (state, action)=> {
            const { courseID, sectionID, lecturer } = action.payload;
            state[courseID].sections[sectionID].lecturer = lecturer;
        },
        addTime: (state, action)=> {
            const { courseID, sectionID } = action.payload;
            const newID = state[courseID].sections[sectionID].meta.nextTimeID++;
            state[courseID].sections[sectionID].times[newID] = generateEmptyTime(newID);
        },
        removeTime: (state, action)=> {
            const { courseID, sectionID, timeID } = action.payload;
            delete state[courseID].sections[sectionID].times[timeID];
        },
        changeDayOfWeek: (state, action)=> {
            const { courseID, sectionID, timeID, dayOfWeek } = action.payload;
            state[courseID].sections[sectionID].times[timeID].dayOfWeek = Number(dayOfWeek);
        },
        changeBeginTime: (state, action)=> {
            const { courseID, sectionID, timeID, beginTime } = action.payload;
            const time = state[courseID].sections[sectionID].times[timeID];
            time.beginTime = Number(beginTime);
            time.endTime = Math.max( Number(beginTime) + 1, time.endTime );
        },
        changeEndTime: (state, action)=> {
            const { courseID, sectionID, timeID, endTime } = action.payload;
            state[courseID].sections[sectionID].times[timeID].endTime = Number(endTime);
        },


        // Data Related Operations
        saveDataIntoLocalStorage: (state)=> {
            try {
                window.localStorage.setItem('app_version', state.meta.app_version);
                window.localStorage.setItem('saved_state', JSON.stringify(state) );
                window.alert('Successfully saved state to local storage');
            } catch (err) {
                window.alert('Error while saving to local storage. See console for more info');
                console.error(err);
            }
        },
        loadDataFromLocalStorage: (state)=> {
            try {
                if (window.localStorage.getItem('saved_state') === null)
                    throw new Error('no-save');

                if (window.localStorage.getItem('app_version') !== APP_VERSION)
                    console.warn("Saved data is from older version of application! Old version: ",
                                  window.localStorage.getItem('app_version'));
                                
                window.alert('Successfully loaded previous state from local storage');
                return JSON.parse(window.localStorage.getItem('saved_state'));
            } catch (err) {
                if (err.message === 'no-save') {
                    window.alert('No previous save file found');
                } else {
                    window.alert('Error while saving to local storage. See console for more info');
                }
                console.error(err);
            }
        },
        downloadStateSaveFile: (state)=> {
            downloadJSONFromObject(state, 'save.json');
        },
        downloadCleanData: (state)=> {
            const stateCopy = obtainStateWithoutMeta(state);
            downloadJSONFromObject(stateCopy, 'courses.json');
        },
    },

    // Extra reducers from Async thunk
    extraReducers: (builder)=> {
        builder.addCase(uploadStateSaveFile.fulfilled, (state, action)=> {
            window.alert('Successfully loaded state from file');
            return action.payload;
        });
        builder.addCase(uploadStateSaveFile.rejected, (state, action)=> {
            window.alert(action.error.message);
        });
    }
});

export const courseActions = { ...courseSlice.actions, uploadStateSaveFile };
export default courseSlice.reducer;