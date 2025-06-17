import React from 'react';
import {NavLink} from "react-router-dom";

import css from "./WarehousesTitleMenuItems.module.css";
import listTitleMenu from "../../../helpers/stockMenuItems.js";


const WarehousesTitleMenuItems = () => {
    return (
        <nav className={css.wrap}>
            <ul className={css.ul}>
                {listTitleMenu.map(({name, linkForRoute}) => (
                    <li key={name}>
                        <NavLink
                            to={`${linkForRoute.toLowerCase()}`}
                            className={({isActive}) =>
                                `${css.menuItem} ${isActive ? css.active : ''}`
                            }
                        >
                            <span className={css.menuText}>{name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export {WarehousesTitleMenuItems};