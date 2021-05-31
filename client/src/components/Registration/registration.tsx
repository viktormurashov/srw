import React, { useEffect, useState } from "react";

import getInitialUserInfo from "../../utils/getInitialUserInfo";

import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Button, TextField } from "@material-ui/core";

import Root from "../Root/Root";
import Camera from '../Camera/cameraContainer';
import Cursor from '../Cursor/cursorContainer';

import Calibration from "../Calibration/calibration";

type User = {
  fullName: string,
  doctor: string,
  info: string,
};

export default function Registration({ loading }: any) {
  const [user, setUser] = useState<Partial<User>>({});
  const [userExist, setUserExist] = useState<boolean>(false);
  const [calibrationCompleted, setcalibrationCompleted] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  console.log('loading', loading)

  useEffect(() => {
    const userInfo = getInitialUserInfo();

    if (userInfo) {
      setUser(userInfo);
      setUserExist(true);
    }
  }, []);

  const saveUserInfo = () => {
    if (!user.fullName) {
      return;
    }

    localStorage.setItem('user', JSON.stringify(user));
    setUserExist(true);
  };

  const onChangeHandler = ({ target: { value }}: any, fieldName: string) => {
    setUser({ ...user, ...{ [fieldName]: value } })
  };

  const openCalibration = () => {
    setCardsVisible(false);
    setcalibrationCompleted(false);
  }

  return (
    <>
      <Camera />
      <Cursor />
      {(loading && (
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
        )) || (
        !userExist && (
        <Box style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          padding: '15px 25px',
          margin: '0 auto',
          transform: 'translate(-50%, -50%)',
          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
          display: 'grid',
          gap: '15px',
        }}>
          <Box style={{
            textAlign: 'center',
          }}>
            Регистрация
              </Box>

          <Box style={{
            display: 'grid',
            gap: '15px',
          }}>
            <TextField
              required
              label="Имя пациента"
              variant="outlined"
              onChange={(event) => onChangeHandler(event, 'fullName')}
            />

            <TextField
              label="Имя врача"
              variant="outlined"
              onChange={(event) => onChangeHandler(event, 'doctor')}
            />

            <TextField
              label="Доп информация"
              variant="outlined"
              onChange={(event) => onChangeHandler(event, 'info')}
            />

          </Box>

          <Button
            onClick={saveUserInfo}
            variant="outlined"
          >
            Сохранить
          </Button>

        </Box>
      )) || (
        !cardsVisible && (
          <Calibration
            calibrationCompleted={calibrationCompleted}
            setcalibrationCompleted={setcalibrationCompleted}
            setCardsVisible={setCardsVisible}
          />
        )
        ) || (
        <Root openCalibration={openCalibration}/>
      )}
    </>
  );
}
