import React, { FunctionComponent, useEffect } from "react";

const webgazer = require("webgazer");

const videoConstraints = {
  width: { min: 320, ideal: 1280, max: 1920 },
  height: { min: 240, ideal: 720, max: 1080 },
  facingMode: "user",
};

const Camera: FunctionComponent<any> = ({
  loading,
  updateCoordinates,
  updateLoading,
}: any) => {
  const init = async () => {
      webgazer.default.begin();
      await webgazer.default.setCameraConstraints(videoConstraints);
      webgazer.default.showFaceFeedbackBox(false);
      webgazer.default.showPredictionPoints(false);
      webgazer.default.params.showVideoPreview = true;
      webgazer.default.params.showGazeDot = false;
      getCoordinates();
  };

  const getCoordinates = async () => {
    await webgazer.default.setGazeListener(async function (data: { x: number; y: number; } | null) {
      if (data == null) {
        return;
      } else if (loading) {
        updateLoading(false);
      }

      const { x,y } = data;

      updateCoordinates({ x, y });
    });
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default Camera;
