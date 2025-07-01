import React from 'react';
import {useFormContext} from "react-hook-form";

import css from './StepClient.module.css';
import {RegisteredUser} from "../RegisteredUser/RegisteredUser.jsx";
import {GuestUserForm} from "../GuestUserForm/GuestUserForm.jsx";


const StepClient = () => {
    const {
        register,
        watch,
    } = useFormContext();
    const isGuest = watch('isGuest');


    return (
        <div className={css.wrap}>
            <div className={css.radioGroup}>
                <label className={css.radioLabel}>
                    <input
                        type="radio"
                        {...register('isGuest')}
                        value={'false'}
                        defaultChecked
                        className={css.radioInput}
                    />
                    <span className={css.customRadio}/>
                    Зареєстрований
                </label>
                <label className={css.radioLabel}>
                    <input
                        type="radio"
                        {...register('isGuest')}
                        value={'true'}
                        className={css.radioInput}
                    />
                    <span className={css.customRadio}/>
                    Гість
                </label>
            </div>
            <div className={css.userInfo}>
                {isGuest === 'true' ? <GuestUserForm/> : <RegisteredUser/>}
            </div>
        </div>
    );
};

export {StepClient};

