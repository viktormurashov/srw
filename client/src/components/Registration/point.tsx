import React, { useState } from "react";

import { Box } from "@material-ui/core";

const Point = ({
    face,
    position,
    addCoordinates,
}: any) => {
    const [eyeCoordinates, setEyeCoordinates] = useState([]);

    const checkCoordinates = () => {
        console.log(eyeCoordinates);
    };

    const onClickHandler = () => {
        const resultObject = face.annotations;

        for (const prop in resultObject) {
            if (!prop.includes('Eye')) {
                delete resultObject[prop];
            }
        }

        setEyeCoordinates(resultObject);
    };

    const pushCoordinatesToResultArray = () => {
        addCoordinates(eyeCoordinates);
    }

    return (
        <Box
            style={{
                top: position.top,
                left: position.left,
                position: 'absolute',
                zIndex: 10,
            }}
        >
            <Box
                onClick={onClickHandler}
                style={{
                    backgroundColor: 'red',
                    width: 50,
                    height: 50,
                }}
            >
            </Box>

            <Box onClick={checkCoordinates}>
                get coordinates
            </Box>
            <Box onClick={pushCoordinatesToResultArray}>
                add coordinates
            </Box>
        </Box>
    );
};

export default Point;
