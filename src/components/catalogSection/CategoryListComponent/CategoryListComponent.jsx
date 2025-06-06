import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import css from './CategoryListComponent.module.css';
import {categoryActions} from "../../../store/slices/category.slice.jsx";
import CategorySingleItemComponent from "../CategorySingleItemComponent/CategorySingleItemComponent.jsx";


const CategoryListComponent = ({setIsOpenUpdateCategory, setIdCategory}) => {
    const dispatch = useDispatch();
    const {categories, trigger} = useSelector(store => store.category);


    useEffect(() => {
        dispatch(categoryActions.getAllCategories());
    }, [dispatch, trigger]);


    return (
        <div className={css.wrap}>
            {categories.length > 0 && categories.map((category) => <CategorySingleItemComponent
                key={category.id}
                category={category}
                setIsOpenUpdateCategory={setIsOpenUpdateCategory}
                setIdCategory={setIdCategory}
            />)}
        </div>
    );
};

export {CategoryListComponent};