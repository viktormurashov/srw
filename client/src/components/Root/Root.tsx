import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import Camera from "../Camera/cameraContainer";
import ActionCard from "../Card/ActionCard";
import Cursor from "../Cursor/cursorContainer";
import AdminPage, { Card } from "../AdminPage/AdminPage";
import Header from "../Header/header";
import getCardItemsFromLocalStorage from "../../utils/getInitialCardsItems";
import sortCards from "../../utils/sort";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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

export default function Root() {
  const classes = useStyles();
  const [cardList, setCardList] = useState([]);
  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    const cards = getCardItemsFromLocalStorage();
    setCardList(cards);
  }, []);

  const changeAdminPageState = (visible: boolean) => {
    setIsAdminPage(visible);
  };

  return (
    <>
      <Header isAdminPage={isAdminPage} changeAdminPageState={changeAdminPageState} />
      {/* <Camera/>
      <Cursor/> */}
      {(isAdminPage && 
        <AdminPage mainCardList={cardList} setMainCardList={setCardList} />) || (
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {cardList.sort(sortCards).map((value: Card) => (
                <Grid key={value.text} id={`${value.id}`} item>
                    <ActionCard
                    caption={value.text}
                    className={classes.paper}/>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}
