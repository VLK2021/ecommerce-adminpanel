import React from 'react';
import {useDispatch} from "react-redux";

import css from "./WarehouseSingleItemComponent.module.css";
import {ButtonAll, ButtonClose} from "../../../ui/index.js";
import {warehouseActions} from "../../../store/index.js";
import {NavLink} from "react-router-dom";


const WarehouseSingleItemComponent = ({product}) => {
    const dispatch = useDispatch();
    const {id, name, isActive, city, address, phone} = product;

    const handleClick = (e) => {
        e.preventDefault();

        dispatch(warehouseActions.selectWarehouse(id));
        dispatch(warehouseActions.openUpdateWarehouseModal());
    };

    const showInformation = (e) => {
        e.stopPropagation();

        dispatch(warehouseActions.selectWarehouse(id));
    };

    const deleteWarehouse = (e) => {
        e.stopPropagation();

    };


    return (
        <div className={css.wrap} onClick={handleClick}>
            <div className={css.name}>{name}</div>
            <div className={css.address}>{address}</div>
            <div className={css.phone}>{phone}</div>
            <div className={css.city}>{city}</div>
            <div className={css.isActive}>
                {isActive ? 'активний' : 'неактивний'}
            </div>
            <div className={css.action}>
                <NavLink to={`/stocks/${id}`.toString()}>
                    <ButtonAll
                        titleButton={'Залишки'}
                        onClick={showInformation}
                    />
                </NavLink>

                <ButtonClose onClick={deleteWarehouse}/>
            </div>
        </div>
    );
};

export default React.memo(WarehouseSingleItemComponent);