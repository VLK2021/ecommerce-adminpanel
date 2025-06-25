import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import css from './WarehouseSingleInventoryComponent.module.css';
import { inventoryService, warehouseService } from "../../../services/warehouseServices";
import { SingleInventoryMenuComponent } from "../SingleInventoryMenuComponent/SingleInventoryMenuComponent.jsx";
import SingleInventoryItemComponent from "../SingleInventoryItemComponent/SingleInventoryItemComponent.jsx";
import { DescriptionSingleInventoryItemOnWarehouse } from "../warehouseModals";
import { Pagination } from "../../../ui/Pagination/Pagination.jsx";
import { inventoryQueryActions } from "../../../store/index.js";

const WarehouseSingleInventoryComponent = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const inventoryQuery = useSelector(store => store.inventoryQuery);

    const [infoArray, setInfoArray] = useState([]);
    const [warehouseSingleName, setWarehouseSingleName] = useState(null);
    const [descriptionModalData, setDescriptionModalData] = useState(null);

    // Стан для пагінації
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(20);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchDataInventory = async () => {
            try {
                const warehouseResponse = await warehouseService.getWarehouseById(id);
                const response = await inventoryService.getAllProductsOnWarehouseById(id, inventoryQuery);

                setWarehouseSingleName(warehouseResponse);
                setInfoArray(response.items || []);
                setTotal(response.total || 0);
                setLimit(response.limit || 20);
                setPage(response.page || 1);
            } catch (e) {
                console.error(e);
                toast.error('Помилка створення');
                setWarehouseSingleName(null);
                setInfoArray([]);
                setTotal(0);
                setPage(1);
                setLimit(20);
            }
        }
        fetchDataInventory();
    }, [id, inventoryQuery]);

    const handleShowDescription = (description, productName) => {
        setDescriptionModalData({ description, productName });
    };
    const handleCloseDescription = () => {
        setDescriptionModalData(null);
    };

    // При кліку на пагінацію оновлювати page в редаксі
    const handlePageChange = (newPage) => {
        dispatch(inventoryQueryActions.setPage(newPage));
    };

    return (
        <div className={css.wrap}>
            <ToastContainer />
            <div className={css.menuBlock}>
                <SingleInventoryMenuComponent />
            </div>
            <div className={css.title}>Залишки товарів на: {warehouseSingleName?.name}</div>
            <div className={css.contentBlock}>
                <div className={css.header}>
                    <div className={css.name}>Назва</div>
                    <div className={css.price}>Ціна</div>
                    <div className={css.category}>Категорія</div>
                    <div className={css.current}>Кількість</div>
                    <div className={css.status}>Статус</div>
                    <div className={css.action}>Дія</div>
                </div>
                <div className={css.productScroll}>
                    {Array.isArray(infoArray) && infoArray.length > 0 ? (
                        infoArray.map((product) => (
                            <SingleInventoryItemComponent
                                key={product.id}
                                product={product}
                                onShowDescription={handleShowDescription}
                            />
                        ))
                    ) : (
                        <div className={css.noProducts}>Немає товарів</div>
                    )}
                </div>

                <div className={css.paginationBlock}>
                    <Pagination
                        totalItems={total}
                        limit={limit}
                        currentPage={page}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>

            {descriptionModalData && (
                <DescriptionSingleInventoryItemOnWarehouse
                    setIsOpenDescription={handleCloseDescription}
                    descriptionModalData={descriptionModalData}
                />
            )}
        </div>
    );
};

export default React.memo(WarehouseSingleInventoryComponent);
