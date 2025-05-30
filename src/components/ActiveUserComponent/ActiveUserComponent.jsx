import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import css from './ActiveUserComponent.module.css';
import {authService} from "../../services/index.js";
import {setUser} from "../../store/index.js";


const ActiveUserComponent = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    console.log(user);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await authService.getMe();
                dispatch(setUser(data));
            } catch (e) {
                console.error('Failed to fetch user:', e);
            }
        };

        fetchUser();
    }, [dispatch]);

    if (!user) return null;


    return (
        <div className={css.wrap}>
            <p>{user.email}</p>

            <p>{user.role}</p>
        </div>
    );
};

export { ActiveUserComponent };
