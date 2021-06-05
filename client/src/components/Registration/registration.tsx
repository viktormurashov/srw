// import React, { useEffect, useState } from "react";

// import getInitialUserInfo from "../../utils/getInitialUserInfo";

// import CircularProgress from '@material-ui/core/CircularProgress';
// import { Box, Button, TextField } from "@material-ui/core";

// import Root from "../Root/Root";
// import Camera from '../Camera/cameraContainer';
// import Cursor from '../Cursor/cursorContainer';

// import Calibration from "../Calibration/calibration";

// type User = {
//   fullName: string,
//   doctor: string,
//   info: string,
// };

// export default function Registration({ loading }: any) {
//   const [user, setUser] = useState<Partial<User>>({});
//   const [userExist, setUserExist] = useState<boolean>(false);
//   const [calibrationCompleted, setcalibrationCompleted] = useState(false);
//   const [cardsVisible, setCardsVisible] = useState(false);

//   console.log('loading', loading)

//   useEffect(() => {
//     const userInfo = getInitialUserInfo();

//     if (userInfo) {
//       setUser(userInfo);
//       setUserExist(true);
//     }
//   }, []);

//   const saveUserInfo = () => {
//     if (!user.fullName) {
//       return;
//     }

//     localStorage.setItem('user', JSON.stringify(user));
//     setUserExist(true);
//   };

//   const onChangeHandler = ({ target: { value }}: any, fieldName: string) => {
//     setUser({ ...user, ...{ [fieldName]: value } })
//   };

//   const openCalibration = () => {
//     setCardsVisible(false);
//     setcalibrationCompleted(false);
//   }

//   return (
//     <>
//       <Camera />
//       <Cursor />
//       {(loading && (
//           <div
//             style={{
//               width: '100%',
//               height: '100%',
//               backgroundColor: 'lightgray',
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               flexDirection: 'column',
//               gap: 50,
//             }}
//           >
//             <div style={{ fontSize: 30 }}>
//               Camera Loading...
//             </div>
//             <CircularProgress />
//           </div>
//         )) || (
//         !userExist && (
//         <Box style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           padding: '15px 25px',
//           margin: '0 auto',
//           transform: 'translate(-50%, -50%)',
//           boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
//           display: 'grid',
//           gap: '15px',
//         }}>
//           <Box style={{
//             textAlign: 'center',
//           }}>
//             Регистрация
//               </Box>

//           <Box style={{
//             display: 'grid',
//             gap: '15px',
//           }}>
//             <TextField
//               required
//               label="Имя пациента"
//               variant="outlined"
//               onChange={(event) => onChangeHandler(event, 'fullName')}
//             />

//             <TextField
//               label="Имя врача"
//               variant="outlined"
//               onChange={(event) => onChangeHandler(event, 'doctor')}
//             />

//             <TextField
//               label="Доп информация"
//               variant="outlined"
//               onChange={(event) => onChangeHandler(event, 'info')}
//             />

//           </Box>

//           <Button
//             onClick={saveUserInfo}
//             variant="outlined"
//           >
//             Сохранить
//           </Button>

//         </Box>
//       )) || (
//         !cardsVisible && (
//           <Calibration
//             calibrationCompleted={calibrationCompleted}
//             setcalibrationCompleted={setcalibrationCompleted}
//             setCardsVisible={setCardsVisible}
//           />
//         )
//         ) || (
//         <Root openCalibration={openCalibration}/>
//       )}
//     </>
//   );
// }
import React, { useRef, useEffect, useState } from "react";
// OLD MODEL
//import * as facemesh from "@tensorflow-models/facemesh";

// NEW MODEL
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";
import Point from "./point";
import { Box } from "@material-ui/core";
import Cursor from "../Cursor/Cursor";

let face2: any = {}
let prevFace2: any = {}
let maxDifference2: any = {}

const Registration = () => {
  const [face, setFace] = useState<any>({});
  const [prevFace, setPrevFace] = useState<any>({});
  const [coordinates, setCoordinates] = useState<any>([]);
  const [xy, setXy] = useState({ x: 0, y: 0 });
  const [maxDifference, setMaxDifference] = useState<any>({});

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);



  useEffect(() => {
    const video: any = document.querySelector("#videoElement");

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function () {
          console.log("Something went wrong!");
        });
    }

    runFacemesh();
  }, []);

  //  Load posenet
  const runFacemesh = async () => {
    // OLD MODEL
    // const net = await facemesh.load({
    //   inputResolution: { width: 640, height: 480 },
    //   scale: 0.8,
    // });
    // NEW MODEL
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    setInterval(() => {
      detect(net);
      startTracking();
    }, 2);
  };

  const getFace = () => {
    return face2;
  };

  const getDifference = () => {
    return maxDifference2;
  };

  const saveFace = (newFace: any) => {
    face2 = newFace;
    setFace(newFace);
  };

  const savePrevFace = (previousFace: any, newFace: any) => {
    face2 = newFace;
    setFace(newFace);
    prevFace2 = previousFace;
    setPrevFace(previousFace);
  };

  const detect = async (net: any) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      (webcamRef.current as any).video.readyState === 4
    ) {
      // Get Video Properties
      const video = (webcamRef.current as any).video;
      const videoWidth = (webcamRef.current as any).video.videoWidth;
      const videoHeight = (webcamRef.current as any).video.videoHeight;

      // Set video width
      (webcamRef.current as any).video.width = videoWidth;
      (webcamRef.current as any).video.height = videoHeight;

      // Set canvas width
      (canvasRef.current as any).width = 320;
      (canvasRef.current as any).height = 240;

      // Make Detections
      // OLD MODEL
      //       const face = await net.estimateFaces(video);
      // NEW MODEL
      const face = getFace();
      const newFace = await net.estimateFaces({ input: video });
      if (!Object.keys(face).length) {
        saveFace({ ...newFace[0] })
      } else {
        savePrevFace({ ...face }, { ...newFace[0] });
      }
      // setFace(newFace[0]);

      // Get canvas context
      const ctx = (canvasRef.current as any).getContext("2d");

      // const sx = newFace[0].annotations.rightCheek[0][0] - 40;
      // const sy = newFace[0].boundingBox.topLeft[1];

      // const x = newFace[0].annotations.leftCheek[0][0];
      // const y = newFace[0].boundingBox.bottomRight[1];

      const sx = (newFace[0].annotations.midwayBetweenEyes[0][0] - 150);
      const sy = (newFace[0].annotations.midwayBetweenEyes[0][1] - 150);

      const x = (newFace[0].annotations.midwayBetweenEyes[0][0] + 150);
      const y = (newFace[0].annotations.midwayBetweenEyes[0][1] + 150);

      // const swidth = Math.sqrt(Math.pow((newFace[0].annotations.boundingBox[0].bottomRight[0] - newFace[0].annotations.boundingBox[0].topLeft[0]), 2)
      //   + Math.pow((newFace[0].annotations.boundingBox[0].bottomRight[1] - newFace[0].annotations.boundingBox[0].topLeft[1]), 2));

      // const sheight = Math.sqrt(Math.pow((newFace[0].annotations.boundingBox[0].bottomRight[0] - newFace[0].annotations.boundingBox[0].topLeft[0]), 2)
      // + Math.pow((newFace[0].annotations.boundingBox[0].bottomRight[1] - newFace[0].annotations.boundingBox[0].topLeft[1]), 2));

      const swidth = x - sx;
      const sheight = y - sy;

      const width = 320;
      const height = 240;

      ctx.drawImage(
        video,
        sx,
        sy,
        swidth,
        sheight,
        0,
        0,
        width,
        height,
      );
      requestAnimationFrame(() => { drawMesh(newFace, ctx) });
    }
  };

  const addCoordinates = (newCoordinates: any) => {
    coordinates.push(newCoordinates);
    setCoordinates(coordinates);
  };

  
  const getCoordinates = () => {
    console.log(coordinates);
    const b = {
      x: Math.abs(coordinates[0].leftEyeIris[0][0] - coordinates[1].leftEyeIris[0][0]),
      y: Math.abs(coordinates[0].leftEyeIris[0][1] - coordinates[1].leftEyeIris[0][1]),
    }
    setMaxDifference(b);
    maxDifference2 = b;
  };

  const startTracking = () => {
    if (Object.keys(prevFace2).length && Object.keys(face2).length && getDifference().x) {
      const prevXY = prevFace2.annotations.leftEyeIris[0];
      const newXY = face2.annotations.leftEyeIris[0];

      const absoluteX = (newXY[0] - prevXY[0]);
      const absoluteY = (newXY[0] - prevXY[0]);

      const a = (1000 / maxDifference2.x) * absoluteX;
      const b = (1000 / maxDifference2.y) * absoluteY;

      const x = xy.x + a;
      const y = xy.y + b;

      setXy({ x, y });
    }
  };

  return (
    <div className="App">
      <Webcam
        id="videoElement"
        ref={webcamRef}
        height="240"
        width="320"
        style={{
          position: "absolute",
          left: 0,
          textAlign: "center",
          zIndex: 9,
          width: 320,
          height: 240,
          visibility: 'hidden',
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 320,
          height: 240,
        }}
      />

      {face.annotations && (
        <>
          <Point face={face} position={{ top: '50%', left: '2%' }} addCoordinates={addCoordinates} />
          <Point face={face} position={{ top: '50%', left: '95%' }} addCoordinates={addCoordinates} />
          <Point face={face} position={{ top: '5%', left: '2%' }} addCoordinates={addCoordinates} />
          <Point face={face} position={{ top: '5%', left: '95%' }} addCoordinates={addCoordinates} />
          <Point face={face} position={{ top: '85%', left: '2%' }} addCoordinates={addCoordinates} />
          <Point face={face} position={{ top: '85%', left: '95%' }} addCoordinates={addCoordinates} />
          <Point face={face} position={{ top: '5%', left: '50%' }} addCoordinates={addCoordinates} />
          <Point face={face} position={{ top: '85%', left: '50%' }} addCoordinates={addCoordinates} />
        </>
      )}

      <Cursor coordinates={xy} />

      <Box
        onClick={getCoordinates}
        style={{
          position: 'absolute',
          left: '50%',
          top: '60%',
        }}
      >
        get all coordinates
      </Box>
    </div>
  );
}

export default Registration;