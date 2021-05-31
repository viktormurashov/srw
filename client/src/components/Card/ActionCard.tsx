import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

export interface ICard {
  image?: string;
  caption: string;
  className: string;
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: 300,
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
    <Card className={classes.root} onClick={() => speachText(card.caption)}>
      <CardContent style={{
        justifyContent: 'center',
        display: 'flex',
      }}>
        <Typography variant="h5" component="h2">
          {card.caption}
        </Typography>
      </CardContent>
    </Card>
  );
};
