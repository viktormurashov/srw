import { Box, Button, TextField } from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";
import sortCards from "../../utils/sort";

export type Card = {
    id: number;
    order: number;
    text: string;
}

const AdminPage: FunctionComponent<any> = ({
    mainCardList,
    setMainCardList,
}) => {
    const [cardList, setCardList] = useState<Card[]>(mainCardList);
    const [currentCard, setCurrentCard] = useState<Card | null>(null);
    const [newCardTitle, setNewCardTitle] = useState('');
    const [createNewCardVisible, setCreateNewCardVisible] = useState(true);

    const saveCurrentCardOrders = () => {
        localStorage.setItem('cardsArray', JSON.stringify(cardList));
        setMainCardList(cardList);
    };

    const createNewCard = () => {
        const newOrderAndId = cardList.length + 1;

        cardList.push({ id: newOrderAndId, order: newOrderAndId, text: newCardTitle });

        localStorage.setItem('cardsArray', JSON.stringify(cardList));
        setNewCardTitle('');
        setMainCardList(cardList);
    };

    const onChangeHandler = (e: any) => {
        const value = e.target.value;
        setNewCardTitle(value);
    };

    const dragStartHandler = (e: any, card: Card) => {
        setCurrentCard(card);
    };

    const dragEndHandler = (e: any) => {
        e.target.style.background = 'white';
    };

    const dragOverHandler = (e: any) => {
        e.preventDefault();
        e.target.style.background = 'lightgray';
    };


    const dropHandler = (e: any, card: Card) => {
        e.preventDefault();
        setCardList(cardList.map((c) => {
            if (c.id === card.id) {
                return { ...c, order: currentCard!.order };
            }
            if (c.id === currentCard?.id) {
                return { ...c, order: card.order };
            }
            return c;
        }));
        e.target.style.background = 'white';
    };

    return <div>
        <div style={{ display: 'flex' }}>
            <Button onClick={saveCurrentCardOrders}>
                Save current card list order
            </Button>

            <Button onClick={() => setCreateNewCardVisible(!createNewCardVisible)}>
                Create
            </Button>
        </div>

        {
            (
                createNewCardVisible && (
                    <Box>
                        <TextField
                            label="Telegram"
                            variant="outlined"
                            value={newCardTitle}
                            onChange={(event: any) => onChangeHandler(event)}
                        />
                        <Button onClick={createNewCard}>
                            Save
                        </Button>
                    </Box>
                    
                )
            ) || (
                <div style={{ display: 'flex' }}>
                    {cardList.sort(sortCards).map(card => 
                        <div
                            id={`${card.id}`}
                            onDragStart={(e) => dragStartHandler(e, card)}
                            onDragLeave={(e) =>  dragEndHandler(e)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDrop={(e) => dropHandler(e, card)}
                            className={'card'}
                            draggable={true}
                        >
                            {card.text}
                        </div>
                    )}
                </div>
            )
        }
    </div>;
}

export default AdminPage;