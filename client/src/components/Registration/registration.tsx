import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import Root from "../Root/Root";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '10px 50px',
    },
  })
);

export default function Registration() {
  const classes = useStyles();
  const [user, setUser] = useState(true);

  useEffect(() => {
    // const userInfo = getInitialUserInfo();
    // if (userInfo) {
    //     setUser(userInfo);
    // }
    // setUser(true as any);
  }, []);

//   const saveUserInfo = (userInfo: any) => {
//     setUser(userInfo);
//   }

  return (
    <div className={classes.root}>
        {(!user && (
            <div>
                aaaaa
            </div>
        )) || <Root/>}
    </div>
  );
}
