import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import styles from './SidebarMenu.module.css';
import items from '../../helpers/asideMenuItems.js';


const SidebarMenu = () => {
    const [open, setOpen] = useState(null);
    const location = useLocation();

    const toggle = (label) => {
        setOpen(open === label ? null : label);
    };

    const isActive = (to) => location.pathname.startsWith(to);


    return (
        <aside className={styles.sidebar}>
            <ul className={styles.menu}>
                {items.map((item) => (
                    <li key={item.label} className={styles.menuItem}>
                        {item.children ? (
                            <>
                                <div
                                    className={styles.menuHeader}
                                    onClick={() => toggle(item.label)}
                                >
                                    {item.label}
                                    {open === item.label ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                {open === item.label && (
                                    <ul className={styles.submenu}>
                                        {item.children.map((sub) => (
                                            <li key={sub.label}>
                                                <Link
                                                    to={sub.to}
                                                    className={`${styles.submenuItem} ${
                                                        isActive(sub.to) ? styles.active : ''
                                                    }`}
                                                >
                                                    {sub.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ) : (
                            <Link
                                to={item.to}
                                className={`${styles.menuHeader} ${
                                    isActive(item.to) ? styles.active : ''
                                }`}
                            >
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export {SidebarMenu};
