import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

const USER_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async ()=> {
    try {
        let response = await axios.get(USER_URL)
        // console.log(response)
        return [...response.data]
    } catch (error) {
        
    }
})

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchUsers.fulfilled, (state, action)=> {
            // console.log(action.payload)
            return action.payload
        })
    }
})


export const selectAllUsers = (state) => state.users;
export const selectUserById = (state, userId) =>  state.users.find(user=> String(user.id) === String(userId))

export default usersSlice.reducer;