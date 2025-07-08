import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    page: 1,
    limit: 20,
    userId: undefined,
    status: undefined,
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
}

const orderQuerySlice = createSlice({
    name: 'orderQuerySlice',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setLimit: (state, action) => {
            state.limit = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload;
        },
        resetFilters: (state) => Object.assign(state, initialState),

    },
    extraReducers: builder =>
        builder
});

const {reducer: orderQueryReducer, actions} = orderQuerySlice;
const orderQueryActions = {
    ...actions,
}

export {
    orderQueryReducer,
    orderQueryActions
}