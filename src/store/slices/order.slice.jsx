import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {orderService} from "../../services/orderServices/index.js";


const getAllOrders = createAsyncThunk(
    'orderSlice/getAllOrders',
    async (params, {rejectWithValue}) => {
        try {
            return await orderService.getAllOrders(params);
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || "Something went wrong");
        }
    }
);


const initialState = {
    orders: [],
    total: 0,
    status: null,
    error: null,
    trigger: 0,

    isOpenCreateOrderModal: false,
    isOpenUpdateOrderModal: false,
    isOpenDetailsOrderModal: false,
    selectedOrderId: null,
}

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        changeTrigger: (state) => {
            state.trigger += 1;
        },
        openCreateOrderModal: (state) => {
            state.isOpenCreateOrderModal = true;
        },
        closeCreateOrderModal: (state) => {
            state.isOpenCreateOrderModal = false;
        },
        openUpdateOrderModal: (state) => {
            state.isOpenUpdateOrderModal = true;
        },
        closeUpdateOrderModal: (state) => {
            state.isOpenUpdateOrderModal = false;
        },
        openDetailsOrderModal: (state) => {
            state.isOpenDetailsOrderModal = true;
        },
        closeDetailsOrderModal: (state) => {
            state.isOpenDetailsOrderModal = false;
        },
        selectOrder: (state, action) => {
            state.selectedOrderId = action.payload;
        },
        resetSelectedOrder: (state) => {
            state.selectedOrderId = null;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.orders = action.payload.items;
                state.total = action.payload.totalItems;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
});


const {reducer: orderReducer, actions} = orderSlice;
const orderActions = {
    ...actions,
    getAllOrders
}
export {
    orderReducer,
    orderActions
}