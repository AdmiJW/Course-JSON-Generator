(this["webpackJsonpjson-course-generator"]=this["webpackJsonpjson-course-generator"]||[]).push([[0],{21:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var o=n(1),r=n.n(o),a=n(6),i=n.n(a),c=n(4),s=n(2),l=n(3),u=n(5);function d(e){return m(JSON.parse(JSON.stringify(e)))}function m(e){for(var t in e)"meta"===t?delete e[t]:"object"===typeof e[t]&&m(e[t]);return e}var b=function(e){return{id:e,meta:{nextSectionID:0},name:"Untitled Course",code:"",sections:{}}},f=function(e){return{id:e,meta:{nextTimeID:0},section:"",lecturer:"",times:{}}},j=function(e){return{id:e,dayOfWeek:0,beginTime:8,endTime:9}};function v(e,t){var n="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e,null,4)),o=document.createElement("a");o.setAttribute("href",n),o.setAttribute("download",t),o.click()}var p={SUN:0,MON:1,TUE:2,WED:3,THU:4,FRI:5,SAT:6,0:0,1:1,2:2,3:3,4:4,5:5,6:6},h={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:11,12:12,13:13,14:14,15:15,16:16,17:17,18:18,19:19,20:20,21:21,22:22,23:23,"12AM":0,"1AM":1,"2AM":2,"3AM":3,"4AM":4,"5AM":5,"6AM":6,"7AM":7,"8AM":8,"9AM":9,"10AM":10,"11AM":11,"12PM":12,"1PM":13,"2PM":14,"3PM":15,"4PM":16,"5PM":17,"6PM":18,"7PM":19,"8PM":20,"9PM":21,"10PM":22,"11PM":23};function O(e,t){if(e.length<3)return{error:"Error in parsing Course (ID: ".concat(t,"). Expected 3 tokens: courseName, courseCode, n_sections")};var n=e.shift(),o=e.shift(),r=Number(e.shift());if(isNaN(r)||r<0)return{error:"Error in parsing Course (ID: ".concat(t,"). n_sections should be a valid integer greater than 0")};var a=b(t);a.name=n,a.code=o,a.meta.nextSectionID=r;for(var i=0;i<r;++i){var c=g(e,i);if(c.error)return c;a.sections[i]=c.payload}return{ok:!0,payload:a}}function g(e,t){if(e.length<4)return{error:"Error in parsing Section (ID: ".concat(t,"). Expected 4 tokens: 'S', sectionNo, lecturerName, n_times")};var n=e.shift();if("S"!==n)return{error:"Error in parsing Section (ID: ".concat(t,"). Expected token 'S', got ").concat(n," instead")};var o=e.shift(),r=e.shift(),a=Number(e.shift());if(isNaN(a)||a<0)return{error:"Error in parsing Section (ID: ".concat(t,"). n_times should be a valid integer greater than 0")};var i=f(t);i.section=o,i.lecturer=r,i.meta.nextTimeID=a;for(var c=0;c<a;++c){var s=x(e,c);if(s.error)return s;i.times[c]=s.payload}return{ok:!0,payload:i}}function x(e,t){if(e.length<4)return{error:"Error in parsing Time (ID: ".concat(t,"). Expected 4 tokens: 'T', dayOfWeek, beginTime, endTime")};var n=e.shift();if("T"!==n)return{error:"Error in parsing Time (ID: ".concat(t,"). Expected token 'T', got ").concat(n," instead")};var o=p[e.shift()],r=h[e.shift()],a=h[e.shift()];if(void 0===o)return{error:"Error in parsing Time (ID: ".concat(t,"). dayOfWeek argument should be integer in [0-7] or shortforms")+' like "SUN", "THU".... Got '.concat(o," instead")};if(void 0===r)return{error:"Error in parsing Time (ID: ".concat(t,'). beginTime argument should be integer in [0-23] or 12 hour format "12AM" (case sensitive). ')+"Got ".concat(r," instead")};if(void 0===a)return{error:"Error in parsing Time (ID: ".concat(t,'). endTime argument should be integer in [0-23] or 12 hour format "12AM". (case sensitive). ')+"Got ".concat(a," instead")};var i=j(t);return i.dayOfWeek=o,i.beginTime=r,i.endTime=a,{ok:!0,payload:i}}var D="1.0.0";var I=Object(u.b)("courses/uploadStateSaveFile",(function(e){return new Promise((function(e,t){var n=document.createElement("input");n.setAttribute("type","file"),n.setAttribute("accept",".json"),n.onchange=function(){var o=n.files[0];if(!o||"application/json"!==o.type)return t("Unable to read save file. Make sure you uploaded the very same save file in .json format");var r=new FileReader;r.onload=function(){var n=JSON.parse(r.result);if(!n||!n.meta)return t("Corrupted/Incorrect save file. Failed to read save file");n.meta.app_version!==D&&console.warn("Saved data is from older version of application! Old version: ",window.localStorage.getItem("app_version")),e(n)},r.readAsText(o)},n.click()}))})),S=Object(u.c)({name:"courses",initialState:{meta:{nextCourseID:0,app_version:D,currentSelectedCourse:null}},reducers:{setCurrentSelectedCourse:function(e,t){var n=t.payload.courseID;e.meta.currentSelectedCourse=n},addCourse:function(e){var t=e.meta.nextCourseID++;e[t]=b(t),e.meta.currentSelectedCourse=t},removeCourse:function(e,t){delete e[t.payload.courseID],e.meta.currentSelectedCourse=null},changeCourseName:function(e,t){var n=t.payload,o=n.courseID,r=n.name;e[o].name=r},changeCourseCode:function(e,t){var n=t.payload,o=n.courseID,r=n.code;e[o].code=r},addSection:function(e,t){var n=t.payload.courseID,o=e[n].meta.nextSectionID++;e[n].sections[o]=f(o)},removeSection:function(e,t){var n=t.payload,o=n.courseID,r=n.sectionID;delete e[o].sections[r]},changeSection:function(e,t){var n=t.payload,o=n.courseID,r=n.sectionID,a=n.section;e[o].sections[r].section=a},changeLecturer:function(e,t){var n=t.payload,o=n.courseID,r=n.sectionID,a=n.lecturer;e[o].sections[r].lecturer=a},addTime:function(e,t){var n=t.payload,o=n.courseID,r=n.sectionID,a=e[o].sections[r].meta.nextTimeID++;e[o].sections[r].times[a]=j(a)},removeTime:function(e,t){var n=t.payload,o=n.courseID,r=n.sectionID,a=n.timeID;delete e[o].sections[r].times[a]},changeDayOfWeek:function(e,t){var n=t.payload,o=n.courseID,r=n.sectionID,a=n.timeID,i=n.dayOfWeek;e[o].sections[r].times[a].dayOfWeek=Number(i)},changeBeginTime:function(e,t){var n=t.payload,o=n.courseID,r=n.sectionID,a=n.timeID,i=n.beginTime,c=e[o].sections[r].times[a];c.beginTime=Number(i),c.endTime=Math.max(Number(i)+1,c.endTime)},changeEndTime:function(e,t){var n=t.payload,o=n.courseID,r=n.sectionID,a=n.timeID,i=n.endTime;e[o].sections[r].times[a].endTime=Number(i)},saveDataIntoLocalStorage:function(e){try{window.localStorage.setItem("app_version",e.meta.app_version),window.localStorage.setItem("saved_state",JSON.stringify(e)),window.alert("Successfully saved state to local storage")}catch(t){window.alert("Error while saving to local storage. See console for more info"),console.error(t)}},loadDataFromLocalStorage:function(e){try{if(null===window.localStorage.getItem("saved_state"))throw new Error("no-save");return window.localStorage.getItem("app_version")!==D&&console.warn("Saved data is from older version of application! Old version: ",window.localStorage.getItem("app_version")),window.alert("Successfully loaded previous state from local storage"),JSON.parse(window.localStorage.getItem("saved_state"))}catch(t){"no-save"===t.message?window.alert("No previous save file found"):window.alert("Error while saving to local storage. See console for more info"),console.error(t)}},downloadStateSaveFile:function(e){v(e,"save.json")},downloadCleanData:function(e){v(d(e),"courses.json")},executeCommand:function(e,t){!function(e,t){if(0===e.length)return{};var n=e.split(";").map((function(e){return e.trim()})),o=n.shift();if("addcourse"===o){var r=t.meta.nextCourseID,a=O(n,r);if(a.error)return window.alert(a.error);t[r]=a.payload,t.meta.nextCourseID++,window.alert("Course successfully added.")}else if("addcourse_n"===o){var i=Number(n.shift());if(isNaN(i)||i<0)return window.alert("addcourse_n must be followed by an integer greater than 0!");for(var c=t.meta.nextCourseID,s=c;s<c+i;++s){var l=O(n,c+s);if(l.error)return window.alert(l.error);t[c+s]=l.payload,t.meta.nextCourseID++}window.alert("Courses successfully added.")}else window.alert("Unidentified command ".concat(o))}(t.payload,e)}},extraReducers:function(e){e.addCase(I.fulfilled,(function(e,t){return window.alert("Successfully loaded state from file"),t.payload})),e.addCase(I.rejected,(function(e,t){window.alert(t.error.message)}))}}),N=Object(l.a)(Object(l.a)({},S.actions),{},{uploadStateSaveFile:I}),y=S.reducer,C=n(0);var w=function(e){var t=e.isMobileSideListOpen,n=Object(s.b)(),o=Object(s.c)((function(e){return e.courses})),r=[],a=function(e){if(isNaN(e))return"continue";var t=o[e];r.push(Object(C.jsxs)("li",{className:"sidelist--item ".concat(t.id===o.meta.currentSelectedCourse?"sidelist--item--selected":""),onClick:function(){return n(N.setCurrentSelectedCourse({courseID:t.id}))},children:[Object(C.jsx)("p",{className:"sidelist--name",children:t.name}),Object(C.jsx)("p",{className:"sidelist--code",children:t.code})]},t.id))};for(var i in o)a(i);return Object(C.jsxs)("div",{className:"sidelist ".concat(t?"show":""),children:[Object(C.jsx)("ul",{className:"sidelist-list",children:r}),Object(C.jsx)("button",{className:"sidelist--btn sidelist--add","aria-label":"Add blank course",title:"Add blank course",onClick:function(){return n(N.addCourse())},children:"+"}),Object(C.jsx)("a",{className:"sidelist--btn sidelist--github",href:"https://github.com/AdmiJW/Course-JSON-Generator",target:"_blank",rel:"noreferrer noopener","aria-label":"Github Page",title:"Github Page",children:Object(C.jsx)("i",{className:"fab fa-github-alt"})})]})};function M(e){var t=e.courseID,n=e.sectionID,o=e.time,r=o.id,a=o.dayOfWeek,i=o.beginTime,c=o.endTime,l=Object(s.b)();return Object(C.jsxs)("li",{className:"time",children:[Object(C.jsxs)("select",{className:"time--dayofweek",value:a,onChange:function(e){return l(N.changeDayOfWeek({courseID:t,sectionID:n,timeID:r,dayOfWeek:e.target.value}))},children:[Object(C.jsx)("option",{value:"0",children:"Sunday"}),Object(C.jsx)("option",{value:"1",children:"Monday"}),Object(C.jsx)("option",{value:"2",children:"Tuesday"}),Object(C.jsx)("option",{value:"3",children:"Wednesday"}),Object(C.jsx)("option",{value:"4",children:"Thursday"}),Object(C.jsx)("option",{value:"5",children:"Friday"}),Object(C.jsx)("option",{value:"6",children:"Saturday"})]}),Object(C.jsxs)("select",{className:"time--beginTime",value:i,onChange:function(e){return l(N.changeBeginTime({courseID:t,sectionID:n,timeID:r,beginTime:e.target.value}))},children:[Object(C.jsx)("option",{value:"8",children:"(02) 8.00 AM"}),Object(C.jsx)("option",{value:"9",children:"(03) 9.00 AM"}),Object(C.jsx)("option",{value:"10",children:"(04) 10.00 AM"}),Object(C.jsx)("option",{value:"11",children:"(05) 11.00 AM"}),Object(C.jsx)("option",{value:"12",children:"(06) 12.00 PM"}),Object(C.jsx)("option",{value:"13",children:"(07) 1.00 PM"}),Object(C.jsx)("option",{value:"14",children:"(08) 2.00 PM"}),Object(C.jsx)("option",{value:"15",children:"(09) 3.00 PM"}),Object(C.jsx)("option",{value:"16",children:"(10) 4.00 PM"}),Object(C.jsx)("option",{value:"17",children:"(11) 5.00 PM"})]}),Object(C.jsx)("p",{children:"To"}),Object(C.jsxs)("select",{className:"time--endTime",value:c,onChange:function(e){return l(N.changeEndTime({courseID:t,sectionID:n,timeID:r,endTime:e.target.value}))},children:[Object(C.jsx)("option",{value:"9",disabled:i>9,children:"(03) 9.00 AM"}),Object(C.jsx)("option",{value:"10",disabled:i>10,children:"(04) 10.00 AM"}),Object(C.jsx)("option",{value:"11",disabled:i>11,children:"(05) 11.00 AM"}),Object(C.jsx)("option",{value:"12",disabled:i>12,children:"(06) 12.00 PM"}),Object(C.jsx)("option",{value:"13",disabled:i>13,children:"(07) 1.00 PM"}),Object(C.jsx)("option",{value:"14",disabled:i>14,children:"(08) 2.00 PM"}),Object(C.jsx)("option",{value:"15",disabled:i>15,children:"(09) 3.00 PM"}),Object(C.jsx)("option",{value:"16",disabled:i>16,children:"(10) 4.00 PM"}),Object(C.jsx)("option",{value:"17",disabled:i>17,children:"(11) 5.00 PM"}),Object(C.jsx)("option",{value:"18",disabled:i>18,children:"(11) 6.00 PM"})]}),Object(C.jsx)("button",{type:"button",className:"time--delete",onClick:function(e){return l(N.removeTime({courseID:t,sectionID:n,timeID:r}))},children:"Remove"})]})}var T=Object(o.memo)(M);function k(e){var t=e.courseID,n=e.section,o=n.id,r=n.section,a=n.lecturer,i=n.times,c=Object(s.b)(),l=[];for(var u in i)if(!isNaN(u)){var d=i[u];l.push(Object(C.jsx)(T,{courseID:t,sectionID:o,time:d},d.id))}return Object(C.jsxs)("li",{className:"section",children:[Object(C.jsxs)("div",{className:"section--meta",children:[Object(C.jsx)("input",{type:"text",className:"section--section",value:r,placeholder:"Section",onChange:function(e){return c(N.changeSection({courseID:t,sectionID:o,section:e.target.value}))}}),Object(C.jsx)("input",{type:"text",className:"section--lecturer",value:a,placeholder:"Lecturer Name",onChange:function(e){return c(N.changeLecturer({courseID:t,sectionID:o,section:e.target.value}))}})]}),Object(C.jsxs)("div",{className:"section--btngrp",children:[Object(C.jsx)("button",{type:"button",className:"section--addtime",onClick:function(e){return c(N.addTime({courseID:t,sectionID:o}))},children:"Add Time"}),Object(C.jsx)("button",{type:"button",className:"section--delete",onClick:function(e){return c(N.removeSection({courseID:t,sectionID:o}))},children:"Delete Section"})]}),Object(C.jsx)("ul",{className:"section--times",children:l})]})}var A=Object(o.memo)(k);var P=function(){var e=Object(s.c)((function(e){return e.courses})),t=Object(s.b)(),n=Object(o.useState)(!1),r=Object(c.a)(n,2),a=r[0],i=r[1];if(null===e.meta.currentSelectedCourse)return Object(C.jsx)("section",{className:"editor"});var l=e.meta.currentSelectedCourse,u=e[l],d=u.name,m=u.code,b=u.sections,f=[];for(var j in b)if(!isNaN(j)){var v=b[j];f.push(Object(C.jsx)(A,{courseID:l,section:v},v.id))}return Object(C.jsxs)("section",{className:"editor",children:[Object(C.jsx)("input",{type:"text",className:"editor__coursename",value:d,placeholder:"Course Name",onChange:function(e){return t(N.changeCourseName({courseID:l,name:e.target.value}))}}),Object(C.jsx)("input",{type:"text",className:"editor__coursecode",value:m,placeholder:"Course Code",onChange:function(e){return t(N.changeCourseCode({courseID:l,code:e.target.value}))}}),Object(C.jsxs)("div",{className:"editor__btngrp",children:[Object(C.jsx)("button",{type:"button",className:"editor__addsection",onClick:function(){return t(N.addSection({courseID:l}))},children:"Add Section"}),Object(C.jsx)("button",{type:"button",className:"editor__removecourse ".concat(a?"warn":""),onClick:function(){!1===a?(i(!0),setTimeout((function(){i(!1)}),3e3)):(t(N.removeCourse({courseID:l})),i(!1))},children:"".concat(a?"Confirm Delete?":"Delete")})]}),Object(C.jsx)("ul",{className:"sections",children:f})]})};var E=function(){var e=Object(s.b)(),t=Object(o.useState)(!1),n=Object(c.a)(t,2),r=n[0],a=n[1],i=Object(o.useState)(""),l=Object(c.a)(i,2),u=l[0],d=l[1];return Object(C.jsxs)(o.Fragment,{children:[Object(C.jsxs)("main",{children:[Object(C.jsx)(w,{isMobileSideListOpen:r}),Object(C.jsx)(P,{})]}),Object(C.jsxs)("div",{className:"controls",children:[Object(C.jsx)("input",{type:"text",className:"controls--input controls--command","aria-label":"Field to type in command",title:"Field to type in command",placeholder:"Enter command here...",value:u,onChange:function(e){return d(e.target.value)},onKeyDown:function(t){"Enter"===t.key&&e(N.executeCommand(u))}}),Object(C.jsx)("button",{type:"button",className:"controls--btn controls--save","aria-label":"Save into Local Storage",title:"Save into Local Storage",onClick:function(){return e(N.saveDataIntoLocalStorage())},children:Object(C.jsx)("i",{className:"far fa-save"})}),Object(C.jsx)("button",{type:"button",className:"controls--btn controls--load","aria-label":"Load from Local Storage",title:"Load from Local Storage",onClick:function(){return e(N.loadDataFromLocalStorage())},children:Object(C.jsx)("i",{className:"fas fa-database"})}),Object(C.jsx)("button",{type:"button",className:"controls--btn controls--savefile","aria-label":"Load state from file",title:"Load state from file",onClick:function(){return e(N.uploadStateSaveFile())},children:Object(C.jsx)("i",{className:"fas fa-file-import"})}),Object(C.jsx)("button",{type:"button",className:"controls--btn controls--loadfile","aria-label":"Save state as file",title:"Save state as file",onClick:function(){return e(N.downloadStateSaveFile())},children:Object(C.jsx)("i",{className:"fas fa-file-export"})}),Object(C.jsx)("button",{type:"button",className:"controls--btn controls--download","aria-label":"Download",title:"Download",onClick:function(){return e(N.downloadCleanData())},children:Object(C.jsx)("i",{className:"fas fa-file-download"})}),Object(C.jsx)("button",{type:"button",className:"controls--btn controls--mobileview","aria-label":"List",title:"List",onClick:function(){return a(!r)},children:Object(C.jsx)("i",{className:"fas fa-list-ul"})})]})]})},_=Object(u.a)({reducer:{courses:y}});n(21);i.a.render(Object(C.jsx)(r.a.StrictMode,{children:Object(C.jsx)(s.a,{store:_,children:Object(C.jsx)(E,{})})}),document.getElementById("root"))}},[[22,1,2]]]);
//# sourceMappingURL=main.93f72ce3.chunk.js.map