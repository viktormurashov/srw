import React, { FunctionComponent } from 'react';
import Draggable from 'react-draggable';

const Cursor: FunctionComponent<any> = ({
    coordinates,
}: any) => {
    return (
        <Draggable
            position = {{
                x: coordinates?.x || 0 - 30,
                y: coordinates?.y || 0 - 30,
            }}
        >
            <div style={{width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'violet', position: 'absolute'}}>
            </div>
        </Draggable>
    
  )
};

export default Cursor;