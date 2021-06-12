import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Box, IconButton } from "@material-ui/core";

import LocalDiningIcon from '@material-ui/icons/LocalDining';
import WcIcon from '@material-ui/icons/Wc';
import AirlineSeatIndividualSuiteIcon from '@material-ui/icons/AirlineSeatIndividualSuite';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import MovieIcon from '@material-ui/icons/Movie';
import BathtubIcon from '@material-ui/icons/Bathtub';

export interface ICard {
  image?: string;
  caption: string;
  className: string;
}

export enum icons {
  Toilet = 'toilet',
  Walk = 'walk',
  Sleep = 'sleep',
  Food = 'food',
  Drink = 'drink',
  Music = 'music',
  Movie = 'movie',
  Bathtub = 'bathtub',
}

const getCardIcon = (icon: string) => {
  switch(icon) {
    case(icons.Food): {
      return <LocalDiningIcon style={{width: 150, height: 150}} />
    }
    case(icons.Toilet): {
      return <WcIcon style={{width: 150, height: 150}} />
    }
    case(icons.Sleep): {
      return <AirlineSeatIndividualSuiteIcon style={{width: 150, height: 150}} />
    }
    case(icons.Drink): {
      return <LocalDrinkIcon style={{width: 150, height: 150}} />
    }
    case(icons.Music): {
      return <MusicNoteIcon style={{width: 150, height: 150}} />
    }
    case(icons.Walk): {
      return <DirectionsWalkIcon style={{width: 150, height: 150}} />
    }
    case(icons.Movie): {
      return <MovieIcon style={{width: 150, height: 150}} />
    }
    case(icons.Bathtub): {
      return <BathtubIcon style={{width: 150, height: 150}} />
    }
  }
};

const useStyles = makeStyles({
  root: {
    minWidth: 325,
    height: 400,
    position: 'relative',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ActionCard({
  card,
  user,
  onClickDisable,
}: any) {
  const classes = useStyles();

  const speachText = (text: string) => {
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);

    const token = '1877805494:AAELgNNydrVolmXZnpmGmlpKejqrCeCg-oY';
    const chatId = '-539000611';
    const telegramMessage = `Доктор: '${user.doctor}', ваш пациент: '${user.fullName}' хочет: '${text}'`;

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${telegramMessage}`;

    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);
    xhttp.send();
  };

  return (
    <Card className={classes.root} onClick={() => !onClickDisable && speachText(card.caption)}>
      <CardContent style={{
        justifyContent: 'center',
        display: 'flex',
      }}>
        <Typography variant="h5" component="h2">
          {card.caption}
        </Typography>

        <Box
          style={{
            position: 'absolute',
            top: '40%',
          }}
        >
          {getCardIcon(card.icon)}
        </Box>

        {onClickDisable && (
          <Box
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
            }}
          >
            <IconButton>
              <EditIcon/>
            </IconButton>
            <IconButton>
              <DeleteIcon/>
            </IconButton>
          </Box>
          
        )}
      </CardContent>
    </Card>
  );
};
