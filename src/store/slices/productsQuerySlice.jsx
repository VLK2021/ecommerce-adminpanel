import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 1,
    limit: 20,
    search: '',
    categoryId: '',
    sortBy: '',
    sortOrder: '',
    // rating: '',
};


const productsQuerySlice = createSlice({
    name: 'productsQuery',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
            },
        setLimit: (state, action) => {
            state.limit = action.payload;
            },
        setSearch: (state, action) => {
            state.search = action.payload;
            state.page = 1;
            },
        setCategoryId: (state, action) => {
            state.categoryId = action.payload;
            state.page = 1;
            },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
            state.page = 1;
            },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload;
            state.page = 1;
            },
        resetFilters: (state) => {
            state.search = '';
            state.categoryId = '';
            state.sortBy = '';
            state.sortOrder = '';
            state.page = 1;
        }
    }
});

const { reducer: productsQueryReducer, actions } = productsQuerySlice;
const productsQueryActions = { ...actions };

export {
    productsQueryReducer,
    productsQueryActions,
};
