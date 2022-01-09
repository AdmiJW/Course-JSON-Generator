import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { courseActions } from '../redux/courseSlice';

function Timeslot(props) {
    const { courseID, sectionID, time } = props;
    const { id: timeID, dayOfWeek, beginTime, endTime } = time;
    const dispatch = useDispatch();

    return (
    <li className='time'>

        <select className='time--dayofweek' value={dayOfWeek}
            onChange={(e)=> dispatch(courseActions.changeDayOfWeek({ courseID, sectionID, timeID, dayOfWeek: e.target.value }))}>
                <option value='0'>Sunday</option>
                <option value='1'>Monday</option>
                <option value='2'>Tuesday</option>
                <option value='3'>Wednesday</option>
                <option value='4'>Thursday</option>
                <option value='5'>Friday</option>
                <option value='6'>Saturday</option>
        </select>

        <select className='time--beginTime' value={beginTime}
            onChange={(e)=> dispatch(courseActions.changeBeginTime({ courseID, sectionID, timeID, beginTime: e.target.value }))}>
                <option value='8'>(02) 8.00 AM</option>
                <option value='9'>(03) 9.00 AM</option>
                <option value='10'>(04) 10.00 AM</option>
                <option value='11'>(05) 11.00 AM</option>
                <option value='12'>(06) 12.00 PM</option>
                <option value='13'>(07) 1.00 PM</option>
                <option value='14'>(08) 2.00 PM</option>
                <option value='15'>(09) 3.00 PM</option>
                <option value='16'>(10) 4.00 PM</option>
                <option value='17'>(11) 5.00 PM</option>
        </select>

        <p>To</p>

        <select className='time--endTime' value={endTime}
            onChange={(e)=> dispatch(courseActions.changeEndTime({ courseID, sectionID, timeID, endTime: e.target.value }))}>
                <option value='9' disabled={ beginTime > 9 }>(03) 9.00 AM</option>
                <option value='10' disabled={ beginTime > 10 }>(04) 10.00 AM</option>
                <option value='11' disabled={ beginTime > 11 }>(05) 11.00 AM</option>
                <option value='12' disabled={ beginTime > 12 }>(06) 12.00 PM</option>
                <option value='13' disabled={ beginTime > 13 }>(07) 1.00 PM</option>
                <option value='14' disabled={ beginTime > 14 }>(08) 2.00 PM</option>
                <option value='15' disabled={ beginTime > 15 }>(09) 3.00 PM</option>
                <option value='16' disabled={ beginTime > 16 }>(10) 4.00 PM</option>
                <option value='17' disabled={ beginTime > 17 }>(11) 5.00 PM</option>
                <option value='18' disabled={ beginTime > 18 }>(12) 6.00 PM</option>
                <option value='19' disabled={ beginTime > 18 }>(13) 7.00 PM</option>
        </select>

        <button type='button' className='time--delete'
            onClick={(e)=> dispatch(courseActions.removeTime({ courseID, sectionID, timeID }))}>
                Remove
        </button>
    </li>
    );  
}

export default memo(Timeslot);