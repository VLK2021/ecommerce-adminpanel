import React, {useState, useEffect, useCallback} from 'react';

import css from './Pagination.module.css';


const Pagination = ({ totalPages, totalItems, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = useCallback((page) => {
        const numericPage = Number(page);
        if (numericPage >= 1 && numericPage <= totalPages) {
            setCurrentPage(numericPage);
            onPageChange?.(numericPage);
        }
    }, [totalPages, onPageChange]);


    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) handlePageChange(value);
    };

    useEffect(() => {
        // скидуємо сторінку на 1, якщо totalPages змінилось (наприклад, після фільтрації)
        if (currentPage > totalPages) {
            handlePageChange(1);
        }
    }, [currentPage, handlePageChange, totalPages]);

    return (
        <div className={css.paginationContainer}>
            <button
                className={css.arrowButton}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &#60;
            </button>

            <button
                className={currentPage === 1 ? css.activePageButton : css.pageButton}
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
                <button
                    className={css.activePageButton}
                    onClick={() => handlePageChange(currentPage)}
                >
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
                className={currentPage === totalPages ? css.activePageButton : css.pageButton}
                onClick={() => handlePageChange(totalPages)}
            >
                {totalPages}
            </button>

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
