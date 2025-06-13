import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import css from './Pagination.module.css';
import {productsQueryActions} from "../../store/index.js";


const Pagination = ({ totalPages, totalItems }) => {
    const dispatch = useDispatch();
    const currentPage = useSelector(store => store.productsQuery.page);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            dispatch(productsQueryActions.setPage(page));
        }
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            handlePageChange(value);
        }
    };

    return (
        <div className={css.paginationContainer}>
            <button
                className={css.arrowButton}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &#60;
            </button>

            {totalPages === 1 ? (
                <button className={css.activePageButton}>1</button>
            ) : (
                <>
                    <button
                        className={
                            currentPage === 1
                                ? css.activePageButton
                                : css.pageButton
                        }
                        onClick={() => handlePageChange(1)}
                    >
                        1
                    </button>

                    {currentPage > 3 && <span className={css.dots}>...</span>}

                    {currentPage > 2 && (
                        <button
                            className={css.pageButton}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            {currentPage - 1}
                        </button>
                    )}

                    {currentPage !== 1 && currentPage !== totalPages && (
                        <button className={css.activePageButton}>
                            {currentPage}
                        </button>
                    )}

                    {currentPage < totalPages - 1 && (
                        <button
                            className={css.pageButton}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            {currentPage + 1}
                        </button>
                    )}

                    {currentPage < totalPages - 2 && <span className={css.dots}>...</span>}

                    <button
                        className={
                            currentPage === totalPages
                                ? css.activePageButton
                                : css.pageButton
                        }
                        onClick={() => handlePageChange(totalPages)}
                    >
                        {totalPages}
                    </button>
                </>
            )}


            <button
                className={css.arrowButton}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &#62;
            </button>

            <div className={css.goToContainer}>
                <span className={css.span}>Go to</span>
                <input
                    type="number"
                    value={currentPage}
                    onChange={handleInputChange}
                    min="1"
                    max={totalPages}
                    className={css.pageInput}
                />
            </div>

            <span className={css.totalItems}>Total: {totalItems}</span>
        </div>
    );
};

export { Pagination };
