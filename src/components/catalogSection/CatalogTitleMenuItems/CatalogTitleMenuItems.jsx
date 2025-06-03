import React from 'react';
import {NavLink} from "react-router-dom";

import css from './CatalogTitleMenuItems.module.css';
import listTitleMenu from '../../../helpers/catalogMenuItems.js'


const CatalogTitleMenuItems = () => {


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

export {CatalogTitleMenuItems};