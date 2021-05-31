import React, { useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ActionCard from "../Card/ActionCard";
import AdminPage, { Card } from "../AdminPage/AdminPage";
import Header from "../Header/header";
import getCardItemsFromLocalStorage from "../../utils/getInitialCardsItems";
import sortCards from "../../utils/sort";
import { Button, IconButton } from "@material-ui/core";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import getUserInfoFromLocalStorage from "../../utils/getInitialUserInfo";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '100%',
      alignContent: 'center',
      width: '100%',
      justifyContent: 'center',
      margin: 'unset',
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function Root({
  openCalibration,
}: any) {
  const classes = useStyles();
  const [cardList, setCardList] = useState([]);
  const [user, setUserInfo] = useState({});
  const [isAdminPage, setIsAdminPage] = useState(false);
  const [currentLastItemIndex, setCurrentLastItemIndex] = useState(0);

  useEffect(() => {
    const cards = getCardItemsFromLocalStorage();
    const user = getUserInfoFromLocalStorage();

    setCardList(cards);
    setUserInfo(user);
  }, []);

  const changeAdminPageState = (visible: boolean) => {
    setIsAdminPage(visible);
  };

  const previousCards = () => {
    if (currentLastItemIndex > 0) {
      setCurrentLastItemIndex(currentLastItemIndex - 4);
    }
  };

  const nextCards = () => {
    if (currentLastItemIndex + 4 < cardList.length) {
      setCurrentLastItemIndex(currentLastItemIndex + 4);
    }
  };

  return (
    <>
      <Header isAdminPage={isAdminPage} changeAdminPageState={changeAdminPageState} />
      {(isAdminPage && 
        <AdminPage mainCardList={cardList} setMainCardList={setCardList} />
        ) || (
        <Grid container className={classes.root} spacing={2}>
          <IconButton
            style={{
              height: '75px',
              width: '75px',
              alignSelf: 'center',
            }}
            onClick={previousCards}
          >
            <NavigateBeforeIcon />
          </IconButton>

          {cardList.sort(sortCards).map((value: Card, index: number) => (
            (index < currentLastItemIndex + 4 && index >= currentLastItemIndex) &&
            <Grid key={value.text} id={`${value.id}`} item>
                <ActionCard
                  card={{ caption: value.text }}
                  user={user}
                />
            </Grid>
          ))}

          <IconButton
            style={{
              height: '75px',
              width: '75px',
              alignSelf: 'center',
            }}
            onClick={nextCards}
          >
              <NavigateNextIcon />
          </IconButton>
        </Grid>
      )}
      <Button
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
        onClick={openCalibration}
      >
        Откалибровать снова
      </Button>
    </>
  );
}
