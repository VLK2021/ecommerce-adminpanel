import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {productService} from "../../services/index.js";


const getAllProducts = createAsyncThunk(
    'productSlice/getAllProducts',
    async (_, {rejectWithValue}) => {
        try {
            return await productService.getAllProducts();
        }catch (e) {
            return rejectWithValue(e.response?.data?.message || "Something went wrong");
        }
    }
);


const initialState = {
    products: [],
    isOpenCreateModal: false,
    isOpenUpdateModal: false,
    isOpenDetailsModal: false,
    selectedProductId: null,
    status: null,
    error: null,
    trigger: 0,
}

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        changeTrigger: (state) => {
            state.trigger += 1;
        },
        openCreateProductModal: (state) => {
            state.isOpenCreateModal = true;
        },
        closeCreateProductModal: (state) => {
            state.isOpenCreateModal = false;
        },
        openUpdateProductModal: (state) => {
            state.isOpenUpdateModal = true;
        },
        closeUpdateProductModal: (state) => {
            state.isOpenUpdateModal = false;
        },
        openDetailsModal: (state) => {
            state.isOpenDetailsModal = true;
        },
        closeDetailsModal: (state) => {
            state.isOpenDetailsModal = false;
        },
        selectProduct: (state, action) => {
            state.selectedProductId = action.payload;
        },
        resetSelectedProduct: (state) => {
            state.selectedProductId = null;
        }

    },
    extraReducers: builder =>
        builder
            .addCase(getAllProducts.pending, state => {
                state.status = 'Loading';
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
});

const {reducer: productReducer, actions} = productSlice;
const productActions = {
    ...actions,
    getAllProducts
}

export {
    productReducer,
    productActions
}