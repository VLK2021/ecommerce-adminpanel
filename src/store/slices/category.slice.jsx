import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {categoryService} from "../../services/catalogServaces/index.js";


const initialState = {
    categories: [],
    status: null,
    error: null,
    trigger: 0,
};


const getAllCategories = createAsyncThunk(
    'categorySlice/getAllCategories',
    async (_, {rejectWithValue}) => {
        try {
            return await categoryService.getAllCategory();
        }catch(e) {
            return rejectWithValue(e.response?.data?.message || "Something went wrong");
        }
    }
);



const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,

    reducers: {
        changeTrigger: (state) => {
            state.trigger = state.trigger + 1;
        },
    },

    extraReducers: builder =>
    builder
        .addCase(getAllCategories.pending, state => {
            state.status = 'Loading';
            state.error = null;
        })
        .addCase(getAllCategories.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.categories = action.payload;
        })
        .addCase(getAllCategories.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        })
});

const {reducer: categoryReducer, actions} = categorySlice;
const categoryActions = {
    ...actions,
    getAllCategories,
}

export {
    categoryReducer,
    categoryActions
}

