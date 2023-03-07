import {configureStore, combineReducers} from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';

const reducer = combineReducers({
    auth: authSlice,
});

const store = configureStore({
    reducer
});

export default store;
