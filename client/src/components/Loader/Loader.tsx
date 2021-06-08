import { CircularProgress } from "@material-ui/core";
import React from "react";

const Loader = () => {
    return (
        <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'lightgray',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 50,
            }}
          >
            <div style={{ fontSize: 30 }}>
              Camera Loading...
            </div>
            <CircularProgress />
        </div>
    );
};

export default Loader;