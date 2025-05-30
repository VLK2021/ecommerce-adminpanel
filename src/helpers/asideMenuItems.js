const adminMenu = [
    {
        label: '📈 Дашборд',
        to: '/dashboard',
    },
    {
        label: '🧾 Замовлення',
        to: '/orders',
    },
    {
        label: '🛍️ Кошики',
        to: '/carts',
    },
    {
        label: '🗂️ Каталог',
        children: [
            { label: '📦 Товари', to: '/catalog/products' },
            { label: '🗃️ Категорії', to: '/catalog/categories' },
            { label: '🏷️ Виробники', to: '/catalog/brands' },
        ],
    },
    {
        label: '👥 Клієнти',
        to: '/clients',
    },
    {
        label: '💭 Відгуки',
        to: '/reviews',
    },
    {
        label: '🏷️ Знижки',
        to: '/discounts',
    },
    {
        label: '🏬 Склади',
        to: '/stocks',
    },
    {
        label: '🚛 Доставка',
        to: '/shipping',
    },
    {
        label: '💳 Оплати',
        to: '/payments',
    },
    {
        label: '♻️ Повернення',
        to: '/returns',
    },
    {
        label: '⚙️ Налаштування',
        to: '/settings',
    },
];

export default adminMenu;
