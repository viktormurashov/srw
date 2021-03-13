import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import Camera from "../Camera/cameraContainer";
import ActionCard from "../Card/ActionCard";
import Cursor from "../Cursor/cursorContainer";

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
  })
);

export default function Root() {
  const classes = useStyles();
  const items = ["Пить", "Есть","Спать","Туалет"];

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Camera/>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {items.map((value) => (
            <Grid key={value} id={value} item>
                <ActionCard
                 caption={value}
                 className={classes.paper}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Cursor></Cursor>
    </Grid>
  );
}
