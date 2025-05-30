import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import css from './LogoutComponent.module.css';
import {authService} from "../../services/index.js";
import {logoutUser} from "../../store/index.js";


const LogoutComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLogout = async () => {
        try {
            await authService.logout();

            dispatch(logoutUser());

            navigate('/login');
        } catch (e) {
            console.error('Logout failed:', e);
        }
    };


    return (
        <button className={css.logout} onClick={onLogout} aria-label="Logout">
            <FiLogOut size={20} />
            <span>Logout</span>
        </button>
    );
};

export { LogoutComponent };
