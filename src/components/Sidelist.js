import { useSelector, useDispatch } from 'react-redux';
import { courseActions } from '../redux/courseSlice';

function Sidelist(props) {

    const { isMobileSideListOpen } = props;
    const dispatch = useDispatch();
    const courses = useSelector((state)=> state.courses);

    const courseListJSX = [];
    for (let key in courses) {
        if (isNaN(key)) continue;

        const course = courses[key];
        courseListJSX.push(
            <li className={`sidelist--item ${course.id === courses.meta.currentSelectedCourse? 'sidelist--item--selected': ''}`} 
                key={course.id} 
                onClick={()=> dispatch(courseActions.setCurrentSelectedCourse({ courseID: course.id })) }>
                    <p className='sidelist--name'>{ course.name }</p>
                    <p className='sidelist--code'>{ course.code }</p>
            </li>  
        );
    }


    return (
    <div className={`sidelist ${isMobileSideListOpen? 'show': ''}`}>
        <ul className='sidelist-list' >
            { courseListJSX }
        </ul>
        
        <button className='sidelist--add' aria-label='Add blank course' title='Add blank course' onClick={()=> dispatch(courseActions.addCourse())}>
            +
        </button>
    </div>
    );
}

export default Sidelist;