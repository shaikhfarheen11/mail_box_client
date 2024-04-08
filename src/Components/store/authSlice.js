import {createSlice} from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const email = localStorage.getItem('email');

const isAuthenticated = !!token

const authSlice = createSlice({
    name:'auth',
    initialState: {
        isAuthenticated: isAuthenticated,
        email: email,
    },
    reducers: {
        login (state, action) {
            state.email = action.payload; 
        },

       
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;