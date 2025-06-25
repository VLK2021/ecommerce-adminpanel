import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    page: 1,
    limit: 20,
    search: '',
    categoryId: '',
    sortBy: '',
    sortOrder: '',
    sortValue: '',
    onlyActive: ''
};


const inventoryQuerySlice = createSlice({
    name: 'inventoryQuery',
    initialState,
    reducers: {
        setPage: (state, action) => { state.page = action.payload; },
        setLimit: (state, action) => { state.limit = action.payload; },
        setSearch: (state, action) => { state.search = action.payload; state.page = 1; },
        setCategoryId: (state, action) => { state.categoryId = action.payload; state.page = 1; },
        setSortBy: (state, action) => {
            const [field, order] = action.payload.split('_');
            state.sortBy = field; state.sortOrder = order; state.sortValue = action.payload; state.page = 1;
        },
        setOnlyActive: (state, action) => { state.onlyActive = action.payload; state.page = 1; },
        resetFilters: (state) => {
            state.search = '';
            state.categoryId = '';
            state.sortBy = '';
            state.sortOrder = '';
            state.sortValue = '';
            state.onlyActive = '';
            state.page = 1;
        }
    }
});

const { reducer: inventoryQueryReducer, actions } = inventoryQuerySlice;
const inventoryQueryActions = {
    ...actions
};

export {
    inventoryQueryReducer,
    inventoryQueryActions
};
