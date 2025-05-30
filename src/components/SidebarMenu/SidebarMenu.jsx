// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
//
// import styles from './SidebarMenu.module.css';
// import items from '../../helpers/asideMenuItems.js';
//
// const SidebarMenu = () => {
//     const [open, setOpen] = useState(null);
//     const location = useLocation();
//     const navigate = useNavigate();
//
//     const isActive = (to) => location.pathname.startsWith(to);
//
//     const toggle = (item) => {
//         const isCurrentlyOpen = open === item.label;
//         setOpen(isCurrentlyOpen ? null : item.label);
//
//         // Якщо відкривається нове меню — переходимо на перший пункт
//         if (!isCurrentlyOpen && item.children?.length) {
//             navigate(item.children[0].to);
//         }
//     };
//
//     return (
//         <aside className={styles.sidebar}>
//             <ul className={styles.menu}>
//                 {items.map((item) => (
//                     <li key={item.label} className={styles.menuItem}>
//                         {item.children ? (
//                             <>
//                                 <div
//                                     className={`${styles.menuHeader} ${open === item.label ? styles.opened : ''}`}
//                                     onClick={() => toggle(item)}
//                                 >
//                                     <span>{item.label}</span>
//                                     {open === item.label ? <FaChevronUp /> : <FaChevronDown />}
//                                 </div>
//                                 <ul
//                                     className={`${styles.submenu} ${
//                                         open === item.label ? styles.submenuOpen : ''
//                                     }`}
//                                 >
//                                     {item.children.map((sub) => (
//                                         <li key={sub.label}>
//                                             <Link
//                                                 to={sub.to}
//                                                 className={`${styles.submenuItem} ${
//                                                     isActive(sub.to) ? styles.active : ''
//                                                 }`}
//                                             >
//                                                 {sub.label}
//                                             </Link>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </>
//                         ) : (
//                             <Link
//                                 to={item.to}
//                                 className={`${styles.menuHeader} ${
//                                     isActive(item.to) ? styles.active : ''
//                                 }`}
//                             >
//                                 {item.label}
//                             </Link>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </aside>
//     );
// };
//
// export { SidebarMenu };



import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import styles from './SidebarMenu.module.css';
import items from '../../helpers/asideMenuItems.js';

const SidebarMenu = () => {
    const [open, setOpen] = useState(null);
    const location = useLocation();

    const isActive = (to) => location.pathname.startsWith(to);

    const toggle = (label) => {
        setOpen(open === label ? null : label); // тільки відкриває/закриває, без навігації
    };

    return (
        <aside className={styles.sidebar}>
            <ul className={styles.menu}>
                {items.map((item) => (
                    <li key={item.label} className={styles.menuItem}>
                        {item.children ? (
                            <>
                                <div
                                    className={`${styles.menuHeader} ${open === item.label ? styles.opened : ''}`}
                                    onClick={() => toggle(item.label)}
                                >
                                    <span>{item.label}</span>
                                    {open === item.label ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                <ul
                                    className={`${styles.submenu} ${
                                        open === item.label ? styles.submenuOpen : ''
                                    }`}
                                >
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

export { SidebarMenu };

