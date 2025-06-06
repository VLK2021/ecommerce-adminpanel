import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {attributeService} from "../../services/catalogServaces/index.js";


const getAllAttributes = createAsyncThunk(
    'attributeSlice/getAllAttributes',
    async (_, {rejectWithValue}) => {
        try {
           return  await attributeService.getAllAttributes();
        }catch (e) {
            return rejectWithValue(e.response?.data?.message || "Something went wrong");
        }
    }
);


const initialState = {
    attributes: [],
    status: null,
    error: null,
    trigger: 0,
}


const attributeSlice = createSlice({
    name: "attributeSlice",
    initialState,
    reducers: {
        changeTrigger: (state) => {
            state.trigger = state.trigger + 1;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(getAllAttributes.pending, state => {
                state.status = 'Loading';
                state.error = null;
            })
            .addCase(getAllAttributes.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.attributes = action.payload;
            })
            .addCase(getAllAttributes.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
});

const {reducer: attributeReducer, actions} = attributeSlice;
const attributeAction = {
    ...actions,
    getAllAttributes
}

export {
    attributeReducer,
    attributeAction
}