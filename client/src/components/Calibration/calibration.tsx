import React, { useState } from "react";

import { Box, IconButton } from "@material-ui/core";

import ReplayIcon from '@material-ui/icons/Replay';
import DoneIcon from '@material-ui/icons/Done';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import './calibration.css';

const createCalibrationArray = () => {
    const calibrationPoints = [];
    for (let i = 0; i < 9; i++) {
        calibrationPoints.push({ id: i, calibrated: 0 });
    }
    return calibrationPoints;
};

const Calibration = ({
    calibrationCompleted,
    setcalibrationCompleted,
    setCardsVisible,
}: any) => {
    const [calibrationPoints, setCalibrationPoints] = useState(createCalibrationArray);
    
    const onCalibrationPointsClicked = (point: number) => () => {
        if (calibrationPoints[point].calibrated < 2) {
            calibrationPoints[point].calibrated += 1;
            setCalibrationPoints([ ...calibrationPoints ]);
        }

        const filteredCalibrationPoints = calibrationPoints
            .filter((calibratinoPoint) => calibratinoPoint.calibrated === 2);
        
        if (filteredCalibrationPoints.length === 9) {
            setcalibrationCompleted(true);
        }
    };

    const resetCalibration = () => {
        const emptyCalibrationArray = createCalibrationArray();
        setCalibrationPoints(emptyCalibrationArray);
        setcalibrationCompleted(false);
    };

    const completeCalibration = () => {
        setCardsVisible(true);
    };

    return (
        <Box style={{ height: '100%' }}>
            {(
                calibrationCompleted && (
                    <Box
                        style={{
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '80px',
                            flexDirection: 'column',
                        }}
                    >
                        Откалибровано
                        <IconButton
                            style={{ fontSize: '50px' }}
                            onClick={resetCalibration}
                        >
                            Откалибровать заново
                            <ReplayIcon
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    marginLeft: '20px',
                                }}
                            />
                        </IconButton>
                        <IconButton
                            style={{ fontSize: '50px' }}
                            onClick={completeCalibration}
                        >
                            Завершить калибровку
                            <DoneIcon
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    marginLeft: '20px',
                                }}
                            />
                        </IconButton>
                    </Box>
                )
            ) ||(
                <div className={'calibrated_points_container'}>
                    {
                        calibrationPoints.map((point) => {
                            return (
                                <div
                                    onClick={onCalibrationPointsClicked(point.id)}
                                    className={`point calibrated_${point.calibrated}`}
                                />
                            );
                        })
                    }
                    <div
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                        }}
                        onClick={completeCalibration}
                    >
                        <HighlightOffIcon style={{
                            width: '2em',
                            height: '2em',
                        }}/>
                    </div>
                </div>
            )}
        </Box>
        
    );
};

export default Calibration;
