import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "../../services";

const getAllProducts = createAsyncThunk(
    'productSlice/getAllProducts',
    async (params, { rejectWithValue }) => {
        try {
            return await productService.getAllProducts(params);
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || "Something went wrong");
        }
    }
);

const initialState = {
    products: [],
    total: 0,
    status: null,
    error: null,
    trigger: 0,
    isOpenCreateModal: false,
    isOpenUpdateModal: false,
    isOpenDetailsModal: false,
    selectedProductId: null,
};

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        changeTrigger: (state) => { state.trigger += 1; },
        openCreateProductModal: (state) => { state.isOpenCreateModal = true; },
        closeCreateProductModal: (state) => { state.isOpenCreateModal = false; },
        openUpdateProductModal: (state) => { state.isOpenUpdateModal = true; },
        closeUpdateProductModal: (state) => { state.isOpenUpdateModal = false; },
        openDetailsModal: (state) => { state.isOpenDetailsModal = true; },
        closeDetailsModal: (state) => { state.isOpenDetailsModal = false; },
        selectProduct: (state, action) => { state.selectedProductId = action.payload; },
        resetSelectedProduct: (state) => { state.selectedProductId = null; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.products = action.payload.items;
                state.total = action.payload.totalItems;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            });
    }
});

const { reducer: productReducer, actions } = productSlice;
const productActions = { ...actions, getAllProducts };

export {
    productReducer,
    productActions
};
