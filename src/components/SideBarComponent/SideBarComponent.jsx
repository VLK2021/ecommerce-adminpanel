import React from 'react';

import css from './SideBarComponent.module.css';
import {SidebarMenu} from "../SidebarMenu/SidebarMenu.jsx";
import {ThemeSwitcher} from "../ThemeSwitcher/ThemeSwitcher.jsx";
import {LogoutComponent} from "../LogoutComponent/LogoutComponent.jsx";
import {ActiveUserComponent} from "../ActiveUserComponent/ActiveUserComponent.jsx";


const SideBarComponent = () => {
    return (
        <div className={css.wrap}>
            <div className={css.menu}>
                <SidebarMenu/>
            </div>

            <div className={css.activeUserBlock}>
                <ActiveUserComponent/>
            </div>

            <div className={css.themeBlock}>
                <LogoutComponent/>

                <ThemeSwitcher/>
            </div>
        </div>
    );
};

export {SideBarComponent};