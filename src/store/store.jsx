import {configureStore} from "@reduxjs/toolkit";

import authReducer from './slices/authSlice';
import {categoryReducer} from "./slices/category.slice.jsx";
import {attributeReducer} from "./slices/attributeSlice.jsx";
import {productReducer} from "./slices/productSlice.jsx";
import {productsQueryReducer} from "./slices/productsQuerySlice.jsx";



const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        attribute: attributeReducer,
        product: productReducer,
        productsQuery: productsQueryReducer
    }
});

export default store;