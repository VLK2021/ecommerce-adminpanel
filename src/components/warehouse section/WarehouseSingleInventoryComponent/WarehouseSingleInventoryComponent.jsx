import React from 'react';
import {useParams} from "react-router-dom";

import css from './WarehouseSingleInventoryComponent.module.css';


const WarehouseSingleInventoryComponent = () => {
    const {id} = useParams();


    return (
        <div className={css.wrap}>
            WarehouseSingleInventoryComponent {id}
        </div>
    );
};

export default React.memo(WarehouseSingleInventoryComponent);