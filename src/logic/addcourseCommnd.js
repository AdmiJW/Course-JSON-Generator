import { generateEmptyCourse, generateEmptySection, generateEmptyTime } from './utils';



export function addCourseCommandHandler(tokens, courseID) {
    if (tokens.length < 3) return { error: "Error in parsing Course. Expected 3 tokens: courseName, courseCode, n_sections"};
    const courseName = tokens.shift();
    const courseCode = tokens.shift();
    const n_sections = Number(tokens.shift() );

    if (isNaN(n_sections) || n_sections < 0) 
        return { error: "Error in parsing Course. n_sections should be a valid integer greater than 0"};

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
    if (tokens.length < 4) return { error: "Error in parsing Section. Expected 4 tokens: 'S', sectionNo, lecturerName, n_times"};
    const check = tokens.shift();
    if (check !== 'S') return { error: `Error in parsing Section. Expected token 'S', got ${check} instead`};
    const sectionNo = tokens.shift();
    const lecturerName = tokens.shift();
    const n_times = Number(tokens.shift() );

    if (isNaN(n_times) || n_times < 0) 
        return { error: "Error in parsing Section. n_times should be a valid integer greater than 0"};

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
    if (tokens.length < 4) return { error: "Error in parsing Time. Expected 4 tokens: 'T', dayOfWeek, beginTime, endTime"};
    const check = tokens.shift();
    if (check !== 'T') return { error: `Error in parsing Time. Expected token 'T', got ${check} instead`};
    const dayOfWeek = Number(tokens.shift() );
    const beginTime = Number(tokens.shift() );
    const endTime = Number(tokens.shift() );

    // Check Ranges
    if (isNaN(dayOfWeek) && (dayOfWeek < 0 || dayOfWeek >= 7))
        return { error: `Error in parsing Time. dayOfWeek argument should be integer in [0-7]. Got ${dayOfWeek} instead`};
    if (isNaN(beginTime) && (beginTime < 0 || beginTime >= 24))
        return { error: `Error in parsing Time. beginTime argument should be integer in [0-23]. Got ${beginTime} instead`};
    if (isNaN(endTime) && (endTime < 0 || endTime >= 24))
        return { error: `Error in parsing Time. endTime argument should be integer in [0-23]. Got ${endTime} instead`};

    const time = generateEmptyTime(timeID);
    time.dayOfWeek = dayOfWeek;
    time.beginTime = beginTime;
    time.endTime = endTime;
    return { ok: true, payload: time };
}