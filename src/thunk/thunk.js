import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../axios/axiosApi";

// --------------- F E T C H - D A T A ------------------

export const fetchData = createAsyncThunk('todo/fetchData', async(_,{rejectWithValue})=>{
    try {
        const res = await apiInstance.get('/.json');
        const data = res.data || {}
        console.log("Fetched Data:", data);
        return Object.keys(data).map((key => ({...data[key], id:key})))
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

// --------------- C R E A T E - D A T A ------------------

export const createData = createAsyncThunk('todo/createData', async(todo,{rejectWithValue})=>{
    try {
        const res = await apiInstance.post('/.json', {...todo, isDone : false})
        return {...todo, id:res.data.name, isDone : false}
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

// --------------- D E L E T E - D A T A ------------------

export const deleteData = createAsyncThunk('todo/deleteData', async(id,{rejectWithValue})=>{
    try {
        await apiInstance.delete(`/${id}.json`)
        return id
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

// ------------------ U P D A T E - D A T A -------------------------

export const updateData = createAsyncThunk('todo/updateData', async(todo, {rejectWithValue}) => {

    try {
        const {id} = todo
        await apiInstance.patch(`/${id}.json`,{...todo})
        return todo
    } catch (error) {
        return rejectWithValue(error.message)        
    }
})