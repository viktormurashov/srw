import React, { FunctionComponent, useEffect } from "react";

// const webgazer = require("webgazer");
const faceLandmarksDetection = require('@tensorflow-models/face-landmarks-detection');


// const videoConstraints = {
//   width: { min: 320, ideal: 1280, max: 1920 },
//   height: { min: 240, ideal: 720, max: 1080 },
//   facingMode: "user",
// };

const Camera: FunctionComponent<any> = ({
  loading,
  updateCoordinates,
  updateLoading,
}: any) => {
  // const init = async () => {
  //     webgazer.default.begin();
  //     console.log(webgazer);
  //     await webgazer.default.setCameraConstraints(videoConstraints);
  //     webgazer.default.showFaceFeedbackBox(false);
  //     webgazer.default.showPredictionPoints(false);
  //     webgazer.default.params.showVideoPreview = true;
  //     webgazer.default.params.showGazeDot = false;
  //     getCoordinates();
  // };

  // const getCoordinates = async () => {
  //   await webgazer.default.setGazeListener(async function (data: any, elapsedTime: any) {
  //     if (data == null) {
  //       return;
  //     } else if (loading) {
  //       updateLoading(false);
  //     }

  //     const { x,y } = data;
  //     updateCoordinates({ x, y });
  //   });
  // };
  const init = async () => {
    const model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);
   
    // Pass in a video stream to the model to obtain an array of detected faces from the MediaPipe graph.
    // For Node users, the `estimateFaces` API also accepts a `tf.Tensor3D`, or an ImageData object.
    const video = document.querySelector("video");
    const faces = await model.estimateFaces({ input: video });
    console.log(faces);
    updateLoading(false);
  }


  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default Camera;
