import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { courseActions } from '../redux/courseSlice';

/** @typedef {import('../redux/courseSlice').State} State */

import Section from './Section';


function CourseEditor() {
    /** @type State */
    const courses = useSelector((state)=> state.courses);
    const dispatch = useDispatch();
    const [ deleteConfirmation, setDeleteConfirmation ] = useState(false);


    // No selection - Return empty section
    if (courses.meta.currentSelectedCourse === null) {
        return <section className='editor'></section>;
    }

    const courseID = courses.meta.currentSelectedCourse;
    const course = courses[courseID];
    const { name, code, sections } = course;

    
    const sectionsJSX = [];
    for (let key in sections) {
        if (isNaN(key)) continue;

        const section = sections[key];
        sectionsJSX.push(
            <Section key={section.id} courseID={courseID} section={section} />
        );
    }

    const onDelete = ()=> {
        if (deleteConfirmation === false) {
            setDeleteConfirmation(true);
            setTimeout(() => {
                setDeleteConfirmation(false);
            }, 3000);
        }
        else {
            dispatch(courseActions.removeCourse({ courseID }));
            setDeleteConfirmation(false);
        }
    }


    return (
    <section className='editor'>
        {/* Course Name & Course Code */}
        <input type='text' className='editor__coursename' value={name} placeholder='Course Name'
            onChange={(e)=> dispatch(courseActions.changeCourseName({ courseID, name: e.target.value})) } />
        <input type='text' className='editor__coursecode' value={code} placeholder='Course Code'
            onChange={(e)=> dispatch(courseActions.changeCourseCode({ courseID, code: e.target.value})) } />
        
        {/* Button Group */}
        <div className='editor__btngrp'>
            <button type='button' className='editor__addsection'
                onClick={()=> dispatch(courseActions.addSection({ courseID })) } >
                    Add Section
            </button>
            <button type='button' className={`editor__removecourse ${deleteConfirmation? 'warn': ''}`}
                onClick={ onDelete } >
                    {`${deleteConfirmation? 'Confirm Delete?': 'Delete'}`}
            </button>
        </div>

        {/* Sections */}
        <ul className='sections'>
            { sectionsJSX }
        </ul>
    </section>
    );
}

export default CourseEditor;