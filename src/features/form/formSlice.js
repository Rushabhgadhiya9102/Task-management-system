import { createSlice } from "@reduxjs/toolkit"

// ------------- I N I T I A L - S T A T E -----------------

const initialState = {
    show: false
}

// ------------ S L I C E - C R E A T E R ----------------

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