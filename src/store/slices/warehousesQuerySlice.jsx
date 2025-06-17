import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 1,
    limit: 20,
    search: '',
    sortBy: '',
    sortOrder: '',
    sortValue: '',
};

const warehousesQuerySlice = createSlice({
    name: 'warehousesQuery',
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
        setSortBy: (state, action) => {
            const [field, order] = action.payload.split('_');
            state.sortBy = field;
            state.sortOrder = order;
            state.sortValue = action.payload;
            state.page = 1;
        },
        resetFilters: (state) => {
            state.search = '';
            state.sortBy = '';
            state.sortOrder = '';
            state.sortValue = '';
            state.page = 1;
        }
    }
});

const { reducer: warehousesQueryReducer, actions } = warehousesQuerySlice;
const warehousesQueryActions = { ...actions };

export {
    warehousesQueryReducer,
    warehousesQueryActions
};
