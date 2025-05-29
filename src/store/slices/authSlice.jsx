import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    accessToken: localStorage.getItem('accessToken') || null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            localStorage.setItem('accessToken', action.payload);
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.accessToken = null;
            state.user = null;
            localStorage.removeItem('accessToken');
        },
    },
});

export const { setAccessToken, setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
