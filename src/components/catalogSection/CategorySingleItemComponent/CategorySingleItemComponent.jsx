import React from 'react';
import {useDispatch} from 'react-redux';

import css from './CategorySingleItemComponent.module.css';
import {ButtonClose} from '../../../ui';
import {categoryService} from '../../../services/catalogServaces';
import {categoryActions} from '../../../store/slices/category.slice.jsx';


const CategorySingleItemComponent = ({
                                         category,
                                         setIsOpenUpdateCategory,
                                         setIdCategory
                                     }) => {
    const dispatch = useDispatch();
    const {name, id, hasAttributes} = category;

    const handleClick = (e) => {
        e.preventDefault();
        setIdCategory(id);

        setIsOpenUpdateCategory(true);
    };

    const handleDeleteClick = async (e) => {
        e.stopPropagation();
        try {
            await categoryService.deleteCategory(id);
            dispatch(categoryActions.changeTrigger());
        } catch (err) {
            console.error('Помилка при видаленні категорії', err);
        }
    };


    return (
        <div className={css.wrap} onClick={handleClick}>
            <span className={css.name}>{name}</span>

            <div className={css.actions} data-disabled={hasAttributes}>
                <ButtonClose disabled={hasAttributes} onClick={handleDeleteClick}/>
            </div>
        </div>
    );
};

export default React.memo(CategorySingleItemComponent);
