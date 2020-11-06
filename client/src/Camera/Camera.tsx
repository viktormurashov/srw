import React from "react";
import Webcam from "react-webcam";

const webgazer = require("webgazer");

const videoConstraints = {
  width: 320,
  height: 240,
  facingMode: "environment",
};

export default function Camera() {

    webgazer.default.setGazeListener(function(data :any, elapsedTime: any) {
    if (data == null) {
        return;
    }
    var xprediction = data.x; //these x coordinates are relative to the viewport
    var yprediction = data.y; //these y coordinates are relative to the viewport
    console.log(elapsedTime); //elapsed time is based on time since begin was called
    console.log("TEST");
}).begin();
 webgazer.default.params.showVideoPreview = true;

  return (
    <>
    </>
  );
}
