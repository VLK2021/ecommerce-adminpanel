import React from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {Provider} from "react-redux";

import './index.css';
import router from './router.jsx';
import {ThemeProvider} from './context';
import store from "./store/store.jsx";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ThemeProvider>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </Provider>
);
