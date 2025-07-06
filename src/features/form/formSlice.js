import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    show: false
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        showForm: (state) =>{
            state.show = true
        },

        hideForm: (state) =>{
            state.show = false
        }
    }
})

export const {showForm, hideForm} = formSlice.actions
export default formSlice.reducer