import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    logo: '',
    date_time: '',
};

export const selectLogo = state => state.settings.logo;

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettings: (state, action) => {
            state = action.payload;
        },
    }
});

export const {setSettings} = settingsSlice.actions;

export default settingsSlice.reducer;
