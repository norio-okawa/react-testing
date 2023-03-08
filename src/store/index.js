import {configureStore, combineReducers} from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import settingsSlice from './slices/settingsSlice';

const reducer = combineReducers({
    auth: authSlice,
    settings: settingsSlice,
});

const store = configureStore({
    reducer
});

export default store;
