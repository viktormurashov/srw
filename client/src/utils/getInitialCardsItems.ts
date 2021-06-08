import { icons } from "../components/Card/ActionCard";

const getCardItemsFromLocalStorage = () => {
    const cardsExists = localStorage.key(1);

    const defaultCards = [
        { id: 1, order: 1, text: 'Есть', icon: icons.Food },
        { id: 2, order: 2, text: 'Пить', icon: icons.Drink },
        { id: 3, order: 3, text: 'Спать', icon: icons.Sleep },
        { id: 4, order: 4, text: 'Туалет', icon: icons.Toilet },
        { id: 5, order: 5, text: 'Гулять', icon: icons.Walk },
        { id: 6, order: 6, text: 'Душ', icon: icons.Bathtub },
        { id: 7, order: 7, text: 'Музыка', icon: icons.Music },
    ];

    if (cardsExists) {
        return JSON.parse(localStorage.getItem('cardsArray') || JSON.stringify(defaultCards));;
    }

    localStorage.setItem('cardsArray', JSON.stringify(defaultCards));
    return defaultCards;
};

export default getCardItemsFromLocalStorage;