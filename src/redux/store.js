import { configureStore } from "@reduxjs/toolkit";
import CourseSliceReducer from "./courseSlice";

const store = configureStore({
    reducer: {
        courses: CourseSliceReducer
    }
});

export default store;