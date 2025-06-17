import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { warehouseService } from '../../services/warehouseServices/index.js';


const getAllWarehouses = createAsyncThunk(
    'warehouses/getAll',
    async (params, { rejectWithValue }) => {
        try {
            return await warehouseService.getAllWarehouses(params);
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Failed to load warehouses');
        }
    }
);

const initialState = {
    warehouses: [],
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    status: null,
    error: null,
    trigger: 0,

    isOpenCreateModal: false,
    isOpenUpdateModal: false,
    isOpenDetailsModal: false,
    selectedWarehouseId: null,
};

const warehouseSlice = createSlice({
    name: 'warehouses',
    initialState,
    reducers: {
        changeTrigger: (state) => { state.trigger += 1; },

        openCreateWarehouseModal: (state) => { state.isOpenCreateModal = true; },
        closeCreateWarehouseModal: (state) => { state.isOpenCreateModal = false; },

        openUpdateWarehouseModal: (state) => { state.isOpenUpdateModal = true; },
        closeUpdateWarehouseModal: (state) => { state.isOpenUpdateModal = false; },

        openWarehouseDetailsModal: (state) => { state.isOpenDetailsModal = true; },
        closeWarehouseDetailsModal: (state) => { state.isOpenDetailsModal = false; },

        selectWarehouse: (state, action) => { state.selectedWarehouseId = action.payload; },
        resetSelectedWarehouse: (state) => { state.selectedWarehouseId = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllWarehouses.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAllWarehouses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.warehouses = action.payload.items;
                state.totalItems = action.payload.totalItems;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(getAllWarehouses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

const { reducer: warehouseReducer, actions } = warehouseSlice;

const warehouseActions = {
    ...actions,
    getAllWarehouses,
};

export {
    warehouseReducer,
    warehouseActions,
};
