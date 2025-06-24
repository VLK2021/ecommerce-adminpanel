import React from 'react';

import css from "./DescriptionSingleInventoryItemOnWarehouse.module.css";
import { ButtonClose } from "../../../../ui";


const DescriptionSingleInventoryItemOnWarehouse = ({
                                                       setIsOpenDescription,
                                                       descriptionModalData
                                                   }) => (
    <div className={css.overlay}>
        <div className={css.modal}>
            <div className={css.header}>
                <div className={css.title}>
                    Опис {descriptionModalData ? `: ${descriptionModalData.productName}` : ''}
                </div>
                <ButtonClose onClick={setIsOpenDescription} />
            </div>
            <div className={css.content}>
                {descriptionModalData.description}
            </div>
        </div>
    </div>
);

export { DescriptionSingleInventoryItemOnWarehouse };
