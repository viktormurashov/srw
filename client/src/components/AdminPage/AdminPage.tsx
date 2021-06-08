import { Box, Button, TextField } from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";
import sortCards from "../../utils/sort";
import ActionCard from "../Card/ActionCard";
import CursorSettings from "../CursorSettings/cursorContainer";
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';

export type Card = {
    id: number;
    order: number;
    text: string;
    icon: string;
}

enum tabs {
    Cards = 'cards',
    Create = 'create',
    CursorSettings = 'cursorSettings',
    Settings = 'settings',
}

const AdminPage: FunctionComponent<any> = ({
    mainCardList,
    setMainCardList,
}) => {
    const [cardList, setCardList] = useState<Card[]>(mainCardList);
    const [currentCard, setCurrentCard] = useState<Card | null>(null);
    const [newCardTitle, setNewCardTitle] = useState('');
    const [currentTab, setCurrentTab] = useState(tabs.Cards);

    const saveCurrentCardOrders = () => {
        localStorage.setItem('cardsArray', JSON.stringify(cardList));
        setMainCardList(cardList);
    };

    const createNewCard = () => {
        const newOrderAndId = cardList.length + 1;

        cardList.push({ id: newOrderAndId, order: newOrderAndId, text: newCardTitle, icon: '' });

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

    const getButtons = () => {
        return (
            <Box
                style={{
                    display: 'flex', flexDirection: 'column'
                }}
            >
                <Button
                    onClick={() => setCurrentTab(tabs.Cards)}
                    disabled={currentTab === tabs.Cards}
                >
                    Карточки
                </Button>

                <Button
                    onClick={() => setCurrentTab(tabs.Create)}
                    disabled={currentTab === tabs.Create}
                >
                    Создать карточку
                </Button>

                <Button
                    onClick={() => setCurrentTab(tabs.CursorSettings)}
                    disabled={currentTab === tabs.CursorSettings}
                >
                    Изменить курсор
                </Button>

                <Button
                    onClick={() => setCurrentTab(tabs.Settings)}
                    disabled={currentTab === tabs.Settings}
                >
                    Настройки
                </Button>
            </Box>
        );
    };

    const getSettingsBody = () => {
        switch(currentTab) {
            case(tabs.Create):
                return (
                    <Box
                        style={{
                            width: '100%',
                            height: '100%',
                            padding: 20,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <TextField
                            label="Действие"
                            variant="outlined"
                            value={newCardTitle}
                            onChange={(event: any) => onChangeHandler(event)}
                            style={{
                                inlineSize: 'fit-content',
                            }}
                        />

                        <Button
                            onClick={createNewCard}
                            style={{
                                inlineSize: 'fit-content',
                                margin: '20px 0',
                            }}
                        >
                            Сохранить
                        </Button>
                    </Box>
                );
            case(tabs.Cards):
                return (
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 20,
                            width: '100%',
                        }}
                    >
                        <Button
                            onClick={saveCurrentCardOrders}
                            style={{
                                margin: 20,
                                width: 'fit-content',
                                alignSelf: 'center',
                            }}
                        >
                            Сохранить расположение карточек
                        </Button>

                        <Box style={{ display: 'flex', flexWrap: 'wrap', gap: 25, padding: 20, overflow: 'scroll' }}>
                        
                        {cardList.sort(sortCards).map(card => 
                            <div 
                                id={`${card.id}`}
                                onDragStart={(e: any) => dragStartHandler(e, card)}
                                onDragLeave={(e: any) =>  dragEndHandler(e)}
                                onDragEnd={(e: any) => dragEndHandler(e)}
                                onDragOver={(e: any) => dragOverHandler(e)}
                                onDrop={(e: any) => dropHandler(e, card)}
                                draggable={true}
                            >
                                <ActionCard
                                    onClickDisable card={{ caption: card.text, icon: card.icon }} user={{}}
                                />
                            </div>
                        )}
                    </Box>
                    </Box>
                );
            case(tabs.CursorSettings):
                return (
                    <Box
                        style={{
                            width: '100%',
                            padding: 20,
                        }}
                    >
                        <CursorSettings />
                    </Box>
                );
            case(tabs.Settings):
                return (
                    <Box
                        style={{
                            width: '100%',
                            padding: 20,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <TextField
                            label="Время до нажатия"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={1.5}
                            style={{
                                width: 'fit-content',
                            }}
                        />

                        <TextField
                            label="Скорость курсора"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={1}
                            style={{
                                width: 'fit-content',
                            }}
                        />

                        <Box
                            style={{
                                marginTop: 20,
                            }}
                        >
                            <Button
                                style={{
                                    width: 'fit-content',
                                }}
                            >
                                <GetAppIcon />
                                Скачать настройки
                            </Button>

                            <Button
                                style={{
                                    width: 'fit-content',
                                }}
                            >
                                <PublishIcon />
                                Загрузить настройки
                            </Button>
                        </Box>
                    </Box>
                );
        }
    };

    return (
        <Box style={{ display: 'flex', height: '100%' }}>
            {getButtons()}

            {getSettingsBody()}
        </Box>
    );
}

export default AdminPage;