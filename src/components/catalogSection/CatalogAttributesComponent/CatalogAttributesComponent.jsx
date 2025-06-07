import React, {useState} from 'react';
import {ToastContainer} from "react-toastify";

import css from './CatalogAttributesComponent.module.css';
import {AttributesMenuComponent} from "../AttributesMenuComponent/AttributesMenuComponent.jsx";
import {AttributesListComponent} from "../AttributesListComponent/AttributesListComponent.jsx";
import {AttributeCreateModal} from "../catalogModals/index.js";


const CatalogAttributesComponent = () => {
    const [isOpenCreateAttribute, setIsOpenCreateAttribute] = useState(false);
    // const [isOpenUpdateAttribute, setIsOpenUpdateAttribute] = useState(false);
    // const [idAttribute, setIdAttribute] = useState(null);


    return (
        <div className={css.wrap}>
            <ToastContainer/>

            <div className={css.menuBlock}>
                <AttributesMenuComponent
                    setIsOpenCreateAttribute={setIsOpenCreateAttribute}
                />
            </div>

            <div className={css.contentBlock}>
                <AttributesListComponent/>
            </div>

            <div className={css.paginationBlock}>

            </div>

            {isOpenCreateAttribute && <AttributeCreateModal
                setIsOpenCreateAttribute={setIsOpenCreateAttribute}
            />}
            {/*{isOpenUpdateAttribute && <div>update</div>}*/}
        </div>
    );
};

export {CatalogAttributesComponent};