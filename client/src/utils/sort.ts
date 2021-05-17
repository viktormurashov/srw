import { Card } from "../components/AdminPage/AdminPage";

const sortCards = (a: Card, b: Card) => {
    if (a.order > b.order) {
        return 1;
    } else {
        return -1;
    }
};

export default sortCards;