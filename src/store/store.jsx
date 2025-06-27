import {configureStore} from "@reduxjs/toolkit";

import authReducer from './slices/authSlice';
import {categoryReducer} from "./slices/category.slice.jsx";
import {attributeReducer} from "./slices/attributeSlice.jsx";
import {productReducer} from "./slices/productSlice.jsx";
import {productsQueryReducer} from "./slices/productsQuerySlice.jsx";
import {warehouseReducer} from "./slices/warehouseSlice.jsx";
import {warehousesQueryReducer} from "./slices/warehousesQuerySlice.jsx";
import {inventoryQueryReducer} from "./slices/inventoryQuerySlice.jsx";
import {orderReducer} from "./slices/order.slice.jsx";



const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        attribute: attributeReducer,
        product: productReducer,
        productsQuery: productsQueryReducer,
        warehouse: warehouseReducer,
        warehousesQuery: warehousesQueryReducer,
        inventoryQuery:inventoryQueryReducer,
        order: orderReducer,
    }
});

export default store;