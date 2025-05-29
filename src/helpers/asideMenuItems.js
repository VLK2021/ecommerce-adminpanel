const adminMenu = [
    {
        label: '📊 Дашборд',
        to: '/dashboard',
    },
    {
        label: '📦 Замовлення',
        to: '/orders',
    },
    {
        label: '🛒 Кошики',
        to: '/carts',
    },
    {
        label: '🧾 Рахунки',
        to: '/invoices',
    },
    {
        label: '📂 Каталог',
        children: [
            { label: 'Товари', to: '/products' },
            { label: 'Категорії', to: '/categories' },
            { label: 'Колекції', to: '/collections' },
            { label: 'Виробники', to: '/brands' },
        ],
    },
    {
        label: '🧍‍♂️ Клієнти',
        to: '/customers',
    },
    {
        label: '💬 Відгуки',
        to: '/reviews',
    },
    {
        label: '💸 Знижки',
        to: '/discounts',
    },
    {
        label: '📦 Склади',
        to: '/stocks',
    },
    {
        label: '🚚 Доставка',
        to: '/shipping',
    },
    {
        label: '🏦 Оплати',
        to: '/payments',
    },
    {
        label: '🧾 Повернення',
        to: '/returns',
    },
    {
        label: '🛠 Налаштування',
        to: '/settings',
    },
];

export default adminMenu;
