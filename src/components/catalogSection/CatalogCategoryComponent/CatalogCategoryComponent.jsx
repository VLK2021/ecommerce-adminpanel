import React, {useState} from 'react';

import css from './CatalogCategoryComponent.module.css';
import {ToastContainer} from "react-toastify";
import {CategoryMenuComponent} from "../CategoryMenuComponent/CategoryMenuComponent.jsx";
import {CategoryCreateModal, CategoryUpdateModal} from "../catalogModals/index.js";
import {CategoryListComponent} from "../CategoryListComponent/CategoryListComponent.jsx";


const CatalogCategoryComponent = () => {
    const [isOpenCreateCategory, setIsOpenCreateCategory] = useState(false);
    const [isOpenUpdateCategory, setIsOpenUpdateCategory] = useState(false);
    const [idCategory, setIdCategory] = useState(null);



    return (
        <div className={css.wrap}>
            <ToastContainer/>

            <div className={css.menuBlock}>
                <CategoryMenuComponent
                    setIsOpenCreateCategory={setIsOpenCreateCategory}
                />
            </div>

            <div className={css.contentBlock}>
                <CategoryListComponent
                    setIsOpenUpdateCategory={setIsOpenUpdateCategory}
                    setIdCategory={setIdCategory}
                />
            </div>

            <div className={css.paginationBlock}>

            </div>


            {isOpenCreateCategory && <CategoryCreateModal
                setIsOpenCreateCategory={setIsOpenCreateCategory}
            />}
            {isOpenUpdateCategory && <CategoryUpdateModal
                setIsOpenUpdateCategory={setIsOpenUpdateCategory}
                idCategory={idCategory}
            />}
        </div>
    );
};

export {CatalogCategoryComponent};