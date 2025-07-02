import React from 'react';

import css from './SingleSearchProduct.module.css';


const SingleSearchProduct = ({searchResults, selected, onAdd}) => {


    return (
        <div className={css.productsListScroll}>
            <ul className={css.productsList}>
                {searchResults.map(product => (
                    <li className={css.productItem} key={product.id}>
                        <span className={css.productInfo}>
                            <span className={css.productName}>{product.name}</span>

                            {product.categoryName && (
                                <span className={css.productCategory}>
                                    ({product.categoryName})
                                </span>
                            )}

                            <span className={css.productPrice}>{product.price}₴</span>
                        </span>

                        <button
                            className={css.addButton}
                            onClick={() => onAdd(product)}
                            disabled={selected.some(p => p.id === product.id)}
                        >
                            Додати
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default React.memo(SingleSearchProduct);
