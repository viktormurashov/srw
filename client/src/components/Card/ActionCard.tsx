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

export default function ActionCard(props: ICard) {
  const classes = useStyles();

  const speachText = (text: string) => {
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
  };

  return (
  <Card className={classes.root} onClick={() => speachText(props.caption)}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.caption}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.caption}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </Card> 
)
}
