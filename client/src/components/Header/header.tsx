import React, { useState } from "react";

import SettingsIcon from '@material-ui/icons/Settings';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
    },
  })
);

export default function Header({
    isAdminPage,
    changeAdminPageState,
}: any) {
  const [visible, setVisible] = useState(true);
  const classes = useStyles();

  const setCameraVisibility = () => {
    const videoTag = document.querySelector('video');
    const faceCanvas = document.querySelector('#webgazerFaceOverlay');

    if (videoTag && faceCanvas) {
      if (!visible) {
        videoTag.style.visibility = 'visible';
        (faceCanvas as any).style.visibility = 'visible';
      } else {
        videoTag.style.visibility='hidden';
        (faceCanvas as any).style.visibility = 'hidden';
      }
    }

    setVisible(!visible);
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Eye tracker
          </Typography>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={setCameraVisibility}>
            {
              visible ? <VisibilityIcon /> : <VisibilityOffIcon />
            }
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => changeAdminPageState(!isAdminPage)}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
