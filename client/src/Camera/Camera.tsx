import React, { FunctionComponent, useEffect } from "react";

const webgazer = require("webgazer");

const videoConstraints = {
  width: { min: 320, ideal: 1280, max: 1920 },
  height: { min: 240, ideal: 720, max: 1080 },
  facingMode: "user",
};

let x = 0;
let y = 0;

const Camera: FunctionComponent<any> = ({
  updateCoordinates,
}: any) => {
  const init = async () => {
      webgazer.default.begin();
      console.log(webgazer);
      await webgazer.default.setCameraConstraints(videoConstraints);
      webgazer.default.params.showVideoPreview = true;
      webgazer.default.params.showPredictionPoints = false;
      console.log("Inited");
      init2()
  };

  const init2 = async () => {
    await webgazer.default.setGazeListener(async function (data: any, elapsedTime: any) {
      // console.log(await webgazer.default.getCurrentPrediction())
      if (data == null) {
        return;
      }
      var xprediction = data.x; // these x coordinates are relative to the viewport
      var yprediction = data.y; // these y coordinates are relative to the viewport

      // x = (xprediction + x) / 2;
      // y = (yprediction + y) / 2;
      updateCoordinates({x,y});
      // setY(yprediction);
      // setX(xprediction);
      // const newElem = document.elementFromPoint(xprediction, yprediction);
      // if (newElem?.id === "Туалет") {
      //   (document.getElementById("Туалет")?.firstElementChild as any)?.click();
      //   console.log('Туалет')
      // }
      // if (newElem?.id === "Спать") {
      //   (document.getElementById("Спать")?.firstElementChild as any)?.click();
      //   console.log('Спать')
      // }
      // console.log("TEST");
    });
  };

  useEffect(() => {
    init();
  });

  return <></>;
}

export default Camera;
