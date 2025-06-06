import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import css from './AttributesListComponent.module.css';
import {attributeAction} from "../../../store/slices/attributeSlice.jsx";
import AttributeSingleItemComponent from "../AttributeSingleItemComponent/AttributeSingleItemComponent.jsx";


const AttributesListComponent = () => {
    const dispatch = useDispatch();
    const {attributes, trigger} = useSelector(store => store.attribute);

    useEffect(() => {
        dispatch(attributeAction.getAllAttributes());
    }, [dispatch, trigger]);


    return (
        <div className={css.wrap}>
            {attributes.length === 0 ? (
                <p className={css.empty}>Атрибутів поки немає</p>
            ) : (
                attributes.map((attribute) => (
                    <AttributeSingleItemComponent key={attribute.id} attribute={attribute} />
                ))
            )}

        </div>
    );
};

export {AttributesListComponent};