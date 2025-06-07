import React from 'react';
import {useDispatch} from "react-redux";

import css from './AttributeSingleItemComponent.module.css';
import {ButtonClose} from "../../../ui/index.js";
import {attributeAction} from "../../../store/slices/attributeSlice.jsx";
import {attributeService} from "../../../services/catalogServaces/index.js";


const AttributeSingleItemComponent = ({ attribute }) => {
    const dispatch = useDispatch();
    const {id, name, assigned} = attribute;

    const handleAttributeClick = (e) => {
        e.stopPropagation();
    };

    const handleAttributeDeleteClick = async (e) => {
        e.stopPropagation();
        try {
            await attributeService.deleteAttribute(id);
            dispatch(attributeAction.changeTrigger());
        } catch (err) {
            console.error('Помилка при видаленні категорії', err);
        }
    };



    return (
        <label className={css.wrap} onClick={handleAttributeClick}>
            {/*<input*/}
            {/*    type="checkbox"*/}
            {/*    className={css.checkbox}*/}
            {/*    value={id}*/}
            {/*/>*/}
            <span className={css.labelText}>{name}</span>

            <div className={css.closeButtonWrapper} data-disabled={assigned}>
                <ButtonClose disabled={assigned} onClick={handleAttributeDeleteClick} />
            </div>
        </label>
    );
};

export default React.memo(AttributeSingleItemComponent);
