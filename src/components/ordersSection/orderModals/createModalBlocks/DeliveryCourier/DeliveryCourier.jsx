import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import css from './DeliveryCourier.module.css';

const regions = [
    "Вінницька", "Волинська", "Дніпропетровська", "Донецька", "Житомирська", "Закарпатська",
    "Запорізька", "Івано-Франківська", "Київська", "Кіровоградська", "Луганська", "Львівська",
    "Миколаївська", "Одеська", "Полтавська", "Рівненська", "Сумська", "Тернопільська", "Харківська",
    "Херсонська", "Хмельницька", "Черкаська", "Чернівецька", "Чернігівська", "м. Київ"
];

const DeliveryCourier = () => {
    const { register, watch } = useFormContext();
    const [showExtra, setShowExtra] = useState(false);

    // Якщо треба value з форми: const deliveryData = watch('deliveryData') || {};

    return (
        <div className={css.wrap}>
            <div className={css.blockRow}>
                <div className={css.block}>
                    <label className={css.label}>
                        Область <span className={css.required}>*</span>
                    </label>
                    <select className={css.input} {...register('deliveryData.region', { required: true })}>
                        <option value="">Оберіть область</option>
                        {regions.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>
                <div className={css.block}>
                    <label className={css.label}>
                        Місто / Село <span className={css.required}>*</span>
                    </label>
                    <input
                        className={css.input}
                        type="text"
                        placeholder="Вкажіть місто або село"
                        {...register('deliveryData.city', { required: true })}
                        autoComplete="address-level2"
                    />
                </div>
            </div>

            <div className={css.blockRow}>
                <div className={css.block}>
                    <label className={css.label}>
                        Вулиця <span className={css.required}>*</span>
                    </label>
                    <input
                        className={css.input}
                        type="text"
                        placeholder="Вкажіть вулицю"
                        {...register('deliveryData.street', { required: true })}
                        autoComplete="street-address"
                    />
                </div>
                <div className={css.blockMini}>
                    <label className={css.label}>
                        Будинок <span className={css.required}>*</span>
                    </label>
                    <input
                        className={css.input}
                        type="text"
                        placeholder="№"
                        {...register('deliveryData.house', { required: true })}
                        autoComplete="address-line1"
                    />
                </div>
                <div className={css.blockMini}>
                    <label className={css.label}>Кв/Офіс</label>
                    <input
                        className={css.input}
                        type="text"
                        placeholder=""
                        {...register('deliveryData.apartment')}
                        autoComplete="address-line2"
                    />
                </div>
            </div>

            <button
                type="button"
                className={css.toggleExtra}
                onClick={() => setShowExtra(x => !x)}
            >
                {showExtra ? "Сховати додаткові поля ▲" : "Додати деталі для кур’єра ▼"}
            </button>

            {showExtra && (
                <div className={css.extraRow}>
                    <div className={css.blockMini}>
                        <label className={css.label}>Під'їзд</label>
                        <input
                            className={css.input}
                            type="text"
                            placeholder=""
                            {...register('deliveryData.entrance')}
                        />
                    </div>
                    <div className={css.blockMini}>
                        <label className={css.label}>Поверх</label>
                        <input
                            className={css.input}
                            type="text"
                            placeholder=""
                            {...register('deliveryData.floor')}
                        />
                    </div>
                    <div className={css.blockMini}>
                        <label className={css.label}>Домофон</label>
                        <input
                            className={css.input}
                            type="text"
                            placeholder=""
                            {...register('deliveryData.intercom')}
                        />
                    </div>
                </div>
            )}

            <div className={css.block}>
                <label className={css.label}>
                    Коментар до замовлення
                </label>
                <textarea
                    className={css.textarea}
                    placeholder="Особливості під’їзду, бажаний час, код домофону..."
                    {...register('deliveryData.comment')}
                    rows={2}
                />
            </div>
        </div>
    );
};

export { DeliveryCourier };
