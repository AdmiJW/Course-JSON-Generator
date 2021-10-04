import { generateEmptyCourse, generateEmptySection, generateEmptyTime } from './utils';


// Maps valid dayOfWeek token to the unified value
const dayOfWeekMapper = {
    "SUN": 0, "MON": 1, "TUE": 2, "WED": 3, "THU": 4, "FRI": 5, "SAT": 6,
    0:0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6
};
const timeMapper = {
    0:0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10, 11:11, 12:12, 
    13:13, 14:14, 15:15, 16:16, 17:17, 18:18, 19:19, 20:20, 21:21, 22:22, 23:23,
    "02":8, "03":9, "04":10, "05":11, "06":12, "07":13, "08":14, "09":15, "010":16, "011":17, "012":18, "013":19, "014":20,
    "12AM":0, "1AM":1, "2AM":2, "3AM":3, "4AM":4, "5AM":5, "6AM":6, "7AM":7, "8AM":8, "9AM":9, "10AM":10, "11AM":11, 
    "12PM": 12, "1PM":13, "2PM":14, "3PM":15, "4PM":16, "5PM":17, "6PM":18, "7PM":19, "8PM":20, "9PM":21, "10PM":22, "11PM":23
};



export function addCourseCommandHandler(tokens, courseID) {
    if (tokens.length < 3) return { error: `Error in parsing Course (ID: ${courseID}). Expected 3 tokens: courseName, courseCode, n_sections`};
    const courseName = tokens.shift();
    const courseCode = tokens.shift();
    const n_sections = Number(tokens.shift() );

    if (isNaN(n_sections) || n_sections < 0) 
        return { error: `Error in parsing Course (ID: ${courseID}). n_sections should be a valid integer greater than 0`};

    const course = generateEmptyCourse(courseID);
    course.name = courseName;
    course.code = courseCode;
    course.meta.nextSectionID = n_sections;
    for (let i = 0; i < n_sections; ++i) {
        const res = addSectionCommandHandler(tokens, i);
        if (res.error) return res;
        course.sections[i] = res.payload;
    }
    return { ok: true, payload: course };
}

function addSectionCommandHandler(tokens, sectionID) {
    if (tokens.length < 4) return { error: `Error in parsing Section (ID: ${sectionID}). Expected 4 tokens: 'S', sectionNo, lecturerName, n_times`};
    const check = tokens.shift();
    if (check !== 'S') return { error: `Error in parsing Section (ID: ${sectionID}). Expected token 'S', got ${check} instead`};
    const sectionNo = tokens.shift();
    const lecturerName = tokens.shift();
    const n_times = Number(tokens.shift() );

    if (isNaN(n_times) || n_times < 0) 
        return { error: `Error in parsing Section (ID: ${sectionID}). n_times should be a valid integer greater than 0`};

    const section = generateEmptySection(sectionID);
    section.section = sectionNo;
    section.lecturer = lecturerName;
    section.meta.nextTimeID = n_times;
    for (let i = 0; i < n_times; ++i) {
        const res = addTimeCommandHandler(tokens, i);
        if (res.error) return res;
        section.times[i] = res.payload;
    }
    return { ok: true, payload: section };
}


function addTimeCommandHandler(tokens, timeID) {
    if (tokens.length < 4) return { error: `Error in parsing Time (ID: ${timeID}). Expected 4 tokens: 'T', dayOfWeek, beginTime, endTime`};
    const check = tokens.shift();
    if (check !== 'T') return { error: `Error in parsing Time (ID: ${timeID}). Expected token 'T', got ${check} instead`};
    const dayOfWeek = dayOfWeekMapper[ tokens.shift() ];
    const beginTime = timeMapper[ tokens.shift() ];
    const endTime = timeMapper[ tokens.shift() ];

    // Check Ranges
    if ( dayOfWeek === undefined )
        return { error: `Error in parsing Time (ID: ${timeID}). dayOfWeek argument should be integer in [0-7] or shortforms` +
                        ` like "SUN", "THU".... Got ${dayOfWeek} instead`};
    if ( beginTime === undefined )
        return { error: `Error in parsing Time (ID: ${timeID}). beginTime argument should be integer in [0-23] or 12 hour format "12AM" (case sensitive). ` + 
                        `Got ${beginTime} instead`};
    if ( endTime === undefined )
        return { error: `Error in parsing Time (ID: ${timeID}). endTime argument should be integer in [0-23] or 12 hour format "12AM". (case sensitive). ` + 
                        `Got ${endTime} instead`};

    const time = generateEmptyTime(timeID);
    time.dayOfWeek = dayOfWeek;
    time.beginTime = beginTime;
    time.endTime = endTime;
    return { ok: true, payload: time };
}