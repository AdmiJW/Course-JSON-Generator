import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { courseActions } from "./redux/courseSlice";

import Sidelist from "./components/Sidelist";
import CourseEditor from "./components/CourseEditor";

function App() {

    const dispatch = useDispatch();
    const [isMobileSideListOpen, setIsMobileSideListOpen] = useState(false);
    const [commandField, setCommandField] = useState('');


    return (
    <Fragment>
    <main>
        <Sidelist isMobileSideListOpen={isMobileSideListOpen} />
        <CourseEditor />
    </main>


    <div className='controls'>
        <input type='text' className='controls--input controls--command' aria-label='Field to type in command' title='Field to type in command'
            placeholder='Enter command here...' value={commandField} 
            onChange={(e)=> setCommandField(e.target.value) } 
            onKeyDown={(e)=> {
                if (e.key === 'Enter') dispatch(courseActions.executeCommand(commandField));
            }} />

        <button type='button' className='controls--btn controls--save' aria-label='Save into Local Storage' title='Save into Local Storage'
            onClick={()=> dispatch(courseActions.saveDataIntoLocalStorage())} >
                <i className="far fa-save"></i>
        </button>
        <button type='button' className='controls--btn controls--load' aria-label='Load from Local Storage' title='Load from Local Storage'
            onClick={()=> dispatch(courseActions.loadDataFromLocalStorage())} >
                <i className="fas fa-database"></i>
        </button>
        <button type='button' className='controls--btn controls--savefile' aria-label='Load state from file' title='Load state from file'
            onClick={()=> dispatch(courseActions.uploadStateSaveFile()) } >
                <i className="fas fa-file-import"></i>
        </button>
        <button type='button' className='controls--btn controls--loadfile' aria-label='Save state as file' title='Save state as file'
            onClick={()=> dispatch(courseActions.downloadStateSaveFile()) } >
                <i className="fas fa-file-export"></i>
        </button>

        <button type='button' className='controls--btn controls--download' aria-label='Download' title='Download'
            onClick={()=> dispatch(courseActions.downloadCleanData())}>
                <i className="fas fa-file-download"></i>
        </button>
        <button type='button' className='controls--btn controls--mobileview' aria-label='List' title='List' 
            onClick={()=> setIsMobileSideListOpen(!isMobileSideListOpen)} >
                <i className="fas fa-list-ul"></i>
        </button>
    </div>
    </Fragment>

    );
}

export default App;
