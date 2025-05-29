import React from 'react';

import css from './SideBarComponent.module.css';
import {SidebarMenu} from "../SidebarMenu/SidebarMenu.jsx";
import {ThemeSwitcher} from "../ThemeSwitcher/ThemeSwitcher.jsx";


const SideBarComponent = () => {
    return (
        <div className={css.wrap}>
            <div className={css.menu}>
                <SidebarMenu/>
            </div>

            <ThemeSwitcher/>
        </div>
    );
};

export {SideBarComponent};