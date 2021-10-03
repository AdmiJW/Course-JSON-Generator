import { memo } from 'react';
import { useDispatch } from "react-redux";
import { courseActions } from "../redux/courseSlice";


import Timeslot from './Timeslot';


function Section(props) {

    const { courseID, section: sectionObj } = props;
    const { id: sectionID, section, lecturer, times } = sectionObj;
    const dispatch = useDispatch();


    const timeslotListJSX = [];
    for (let key in times) {
        if (isNaN(key)) continue;

        const time = times[key];
        timeslotListJSX.push(
            <Timeslot key={time.id} courseID={courseID} sectionID={sectionID} time={time} />
        );
    }


    return (
    <li className='section'>

        <div className='section--meta'>
            <input type='text' className='section--section' value={ section } placeholder='Section'
                onChange={(e)=> dispatch(courseActions.changeSection({ courseID, sectionID, section: e.target.value }))} />
            <input type='text' className='section--lecturer' value={ lecturer } placeholder='Lecturer Name'
                onChange={(e)=> dispatch(courseActions.changeLecturer({ courseID, sectionID, section: e.target.value }))} />
        </div>

        <div className='section--btngrp'>
            <button type='button' className='section--addtime'
                onClick={(e)=> dispatch(courseActions.addTime({ courseID, sectionID }))} >
                    Add Time
            </button>
            <button type='button' className='section--delete'
                onClick={(e)=> dispatch(courseActions.removeSection({ courseID, sectionID }))} >
                    Delete Section
            </button>
        </div>

        <ul className='section--times'>
            { timeslotListJSX }
        </ul>
    </li>
    );
}

export default memo(Section);