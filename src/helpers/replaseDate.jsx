const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return `${String(d.getDate())
        .padStart(2, '0')}
        .${String(d.getMonth() + 1)
        .padStart(2, '0')}
        .${d.getFullYear()}`;
}

export {
    formatDate
}