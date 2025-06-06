import React from 'react';

import css from './AttributeSingleItemComponent.module.css';


const AttributeSingleItemComponent = ({ attribute }) => {
    const handleAttributeClick = (e) => {
        e.stopPropagation();
    }


    return (
        <label className={css.wrap} onClick={handleAttributeClick}>
            <input
                type="checkbox"
                className={css.checkbox}
                value={attribute.id}
            />
            <span className={css.labelText}>{attribute.name}</span>
        </label>
    );
};

export default React.memo(AttributeSingleItemComponent);
