import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    user: null,
};

export const selectAuth = state => state.auth;
export const selectUser = state => state.auth.user;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = !!action.payload;
        },
    }
});

export const {setAuth, setIsLoggedIn, setUser} = authSlice.actions;

export default authSlice.reducer;
