import React, { useEffect } from "react";
import Webcam from "react-webcam";

const webgazer = require("webgazer");

const videoConstraints = {
  width: { min: 320, ideal: 1280, max: 1920 },
  height: { min: 240, ideal: 720, max: 1080 },
  facingMode: "user",
};

export default function Camera() {
    const init = async () => {
    await webgazer.default
      .setGazeListener(function (data: any, elapsedTime: any) {
        if (data == null) {
          return;
        }
        var xprediction = data.x; //these x coordinates are relative to the viewport
        var yprediction = data.y; //these y coordinates are relative to the viewport
        console.log(elapsedTime); //elapsed time is based on time since begin was called
        console.log("TEST");
      })
      .begin();
    await webgazer.default.setCameraConstraints(videoConstraints);
    webgazer.default.params.showVideoPreview = true;
    console.log("Inited");
    };
  useEffect(() => {
    init();
  });

  return <></>;
}
