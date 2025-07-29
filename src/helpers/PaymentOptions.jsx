const paymentOptions = [
    { value: 'cod', label: 'Готівка при отриманні', description: 'Сплатите при отриманні товару' },
    { value: 'card_online', label: 'Банківська карта онлайн', description: 'Оплата карткою на сайті' },
    { value: 'card_on_delivery', label: 'Карткою при отриманні', description: 'POS-термінал на відділенні/у кур’єра' },
    { value: 'invoice', label: 'Безготівковий розрахунок', description: 'Рахунок для юр. осіб' },
    { value: 'apple_pay', label: 'Apple Pay / Google Pay' },
];

export default paymentOptions