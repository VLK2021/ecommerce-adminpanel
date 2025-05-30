import React from 'react';
import {FiLogOut} from "react-icons/fi";

import css from './LogoutComponent.module.css';
import {useNavigate} from "react-router-dom";


const LogoutComponent = () => {
    const navigate = useNavigate();

    const onLogout = () => {
        try {
            navigate('login')
        }catch(e){
            console.log(e);
        }
    };
    

    return (
        <button className={css.logout} onClick={onLogout} aria-label="Logout">
            <FiLogOut size={20}/>

            <span>Logout</span>
        </button>
    );
};

export {LogoutComponent};