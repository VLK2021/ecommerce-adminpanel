import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import css from './SingleProductDetails.module.css';
import {ButtonCancel, ButtonClose} from "../../../../ui/index.js";
import {productActions} from "../../../../store/index.js";
import {productService} from "../../../../services/index.js";


const SingleProductDetails = () => {
    const dispatch = useDispatch();
    const { selectedProductId } = useSelector(state => state.product);
    const [productSingle, setProductSingle] = useState({});

    const {name, price, stock, category} = productSingle;

    const closeSingleDetailsProduct = () => {
        dispatch(productActions.closeDetailsModal());
    };

    useEffect(() => {
        const fetchProducy = async () => {
            const product = await productService.getProductById(selectedProductId);
            setProductSingle(product);
        }
        fetchProducy()
    }, [selectedProductId]);


    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <div className={css.header}>
                    <div className={css.title}>Детальний опис товару</div>
                    <ButtonClose onClick={closeSingleDetailsProduct}/>
                </div>

                {name}



                <div className={css.buttonsBlock}>
                    <ButtonCancel onClick={closeSingleDetailsProduct} />
                </div>
            </div>
        </div>
    );
};

export {SingleProductDetails};