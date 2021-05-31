import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

function usePrevious(value: any) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}


const Cursor: FunctionComponent<any> = ({
    coordinates,
}) => {
    const [currentElementId, setCurrentElementId] = useState<null | string>(null);
    const previousElementId = usePrevious(currentElementId);
    const [count, setCount] = useState(0);

    const getElementId = (element: any) => {
        if (!element) {
            return '';
        }

        let elementForIdSearch = element;
        let flag = true;
        let id = '';

        while(flag) {
            if (!elementForIdSearch) {
                flag = false;
            }
            if (flag && elementForIdSearch.id === 'root') {
                id = '';
                flag = false;
            }
            if (flag && !elementForIdSearch.id) {
                elementForIdSearch = elementForIdSearch.parentElement;
                if (!elementForIdSearch) {
                    flag = false;
                }
            }
            if (flag && elementForIdSearch && elementForIdSearch.id) {
                id = elementForIdSearch.id;
                flag = false;
            }
        }

        return isNaN(Number(id))
            ? ''
            : id;
    }

    useEffect(() => {
        const curElement = document?.elementFromPoint(coordinates?.x || 0, coordinates?.y || 0);
        const currentElementId = getElementId(curElement);

        if (currentElementId && currentElementId === previousElementId) {
            if (count > 50 && curElement) {
                (curElement as any).click();
                setCount(0);
            } else {
                setCount(count + 1);
            }
        }

        if (currentElementId !== previousElementId) {
            setCount(0);
            setCurrentElementId(currentElementId);
        }
    }, [coordinates]);

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
    
  );
};

export default Cursor;