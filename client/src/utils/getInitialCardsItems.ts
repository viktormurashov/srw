const getCardItemsFromLocalStorage = () => {
    const cardsExists = localStorage.key(0);

    if (cardsExists) {
        return JSON.parse(localStorage.getItem('cardsArray') || '[]');;
    }

    const cards = [
        {id: 1, order: 1, text: 'Есть'},
        {id: 2, order: 2, text: 'Пить'},
        {id: 3, order: 3, text: 'Спать'},
        {id: 4, order: 4, text: 'Туалет'},
    ];

    localStorage.setItem('cardsArray', JSON.stringify(cards));
    return cards;
};

export default getCardItemsFromLocalStorage;