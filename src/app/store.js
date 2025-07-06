import { configureStore } from "@reduxjs/toolkit";
import todosReducer from '../features/todos/todoSlice'
import formReducer from '../features/form/formSlice'

const store = configureStore({
    reducer: {
        todos: todosReducer,
        form : formReducer
    }
})

export default store;