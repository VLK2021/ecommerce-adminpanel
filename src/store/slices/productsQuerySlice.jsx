import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 1,
    limit: 20,
    search: '',
    categoryId: '',
    sortBy: '',
    sortOrder: '',
    sortValue: '', // <== Додай це, щоб селект тримав значення
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
            const [field, order] = action.payload.split('_');
            state.sortBy = field;
            state.sortOrder = order;
            state.sortValue = action.payload;
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
            state.sortValue = '';
            state.page = 1;
        }
    }
});

const { reducer: productsQueryReducer, actions } = productsQuerySlice;
const productsQueryActions = { ...actions };

export {
    productsQueryReducer,
    productsQueryActions
};
