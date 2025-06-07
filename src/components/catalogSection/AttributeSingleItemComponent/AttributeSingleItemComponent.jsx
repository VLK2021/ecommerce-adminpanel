import React from 'react';
import {useDispatch} from "react-redux";

import css from './AttributeSingleItemComponent.module.css';
import {ButtonClose} from "../../../ui/index.js";
import {attributeAction} from "../../../store/slices/attributeSlice.jsx";
import {attributeService} from "../../../services/catalogServaces/index.js";


const AttributeSingleItemComponent = ({attribute}) => {
    const dispatch = useDispatch();
    const {id, name, assigned} = attribute;

    const handleAttributeDeleteClick = async (e) => {
        e.stopPropagation();
        try {
            await attributeService.deleteAttribute(id);
            dispatch(attributeAction.changeTrigger());
        } catch (err) {
            console.error('Помилка при видаленні атрибута', err);
        }
    };


    return (
        <div className={css.wrap}>
            <span className={css.labelText}>{name}</span>

            <div className={css.closeButtonWrapper} data-disabled={assigned}>
                <ButtonClose disabled={assigned} onClick={handleAttributeDeleteClick}/>
            </div>
        </div>
    );
};

export default React.memo(AttributeSingleItemComponent);
