import React from 'react';
import { useFormContext } from 'react-hook-form';

import css from './StepPayment.module.css';


const paymentOptions = [
    { value: 'cod', label: 'Готівка при отриманні', description: 'Сплатите при отриманні товару' },
    { value: 'card_online', label: 'Банківська карта онлайн', description: 'Оплата карткою на сайті' },
    { value: 'card_on_delivery', label: 'Карткою при отриманні', description: 'POS-термінал на відділенні/у кур’єра' },
    { value: 'invoice', label: 'Безготівковий розрахунок', description: 'Рахунок для юр. осіб' },
    { value: 'apple_pay', label: 'Apple Pay / Google Pay' },
];


const StepPayment = () => {
    const { watch, setValue } = useFormContext();
    const selected = watch('paymentType') || '';


    return (
        <div className={css.wrap}>
            <div className={css.title}>Оберіть спосіб оплати:</div>
            <div className={css.options}>
                {paymentOptions.map(opt => (
                    <label key={opt.value} className={`${css.option} ${selected === opt.value ? css.active : ''}`}>
                        <input
                            type="radio"
                            name="paymentType"
                            value={opt.value}
                            checked={selected === opt.value}
                            onChange={() => setValue('paymentType', opt.value, { shouldDirty: true })}
                        />
                        <div>
                            <span className={css.labelText}>{opt.label}</span>
                            {opt.description && <div className={css.desc}>{opt.description}</div>}
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
};

export { StepPayment };
