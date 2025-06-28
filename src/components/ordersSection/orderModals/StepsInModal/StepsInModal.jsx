import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import css from './StepsInModal.module.css';
import {orderActions} from "../../../../store/index.js";


const STEPS = [
    { label: 'Клієнт', icon: '👤' },
    { label: 'Товари', icon: '🧾' },
    { label: 'Доставка', icon: '🚚' },
    { label: 'Оплата', icon: '💳' },
    { label: 'Підтвердження', icon: '✅' },
];

const StepsInModal = () => {
    const dispatch = useDispatch();
    const {activeStep} = useSelector(store => store.order);


    return (
        <div className={css.wrap}>
            <div className={css.stepper}>
                {STEPS.map((step, idx) => (
                    <React.Fragment key={step.label}>
                        <div
                            className={idx === activeStep ? `${css.step} ${css.activeStep}` : css.step}
                            onClick={() => dispatch(orderActions.changeActiveStep(idx))}
                        >
                            <span className={css.icon}>{step.icon}</span>
                            <span>{step.label}</span>
                        </div>
                        {idx < STEPS.length - 1 && <div className={css.stepDivider} />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export {StepsInModal};