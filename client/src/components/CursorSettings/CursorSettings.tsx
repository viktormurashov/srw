import { Box, Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import { defaultCursorSettings } from '../../constants/constants';
import getCursorSettingsFromLocalStorage from '../../utils/getCursorSettings';

type CursorSettingsType = {
    color: string;
    size: string;
}

const CursorSettings = ({
    settings,
    updateSettings,
}: {
    settings: CursorSettingsType,
    updateSettings: any,
}) => {
    const [editableSettings, setEditableSettings] = useState<CursorSettingsType>(settings);

    useEffect(() => {
        const settings = getCursorSettingsFromLocalStorage();
        updateSettings(settings);
        setEditableSettings(settings);
    }, []);

    const onChangeHandler = (color: { hex: string; }) => {
        setEditableSettings({ ...editableSettings, color: color.hex});
    }

    const onSizeChangeHandler = (value: any) => {
        if (value < 15 || value > 99) {
            return;
        }

        setEditableSettings({ ...editableSettings, size: `${value}px` })
    };

    const handleChangeComplete = (color: { hex: string; }) => {
        setEditableSettings({ ...editableSettings, color: color.hex});
    };

    const save = () => {
        localStorage.setItem('cursorSettings', JSON.stringify(editableSettings));
        updateSettings({ ...editableSettings });
    };

    const reset = () => {
        setEditableSettings({ ...defaultCursorSettings });
        localStorage.setItem('cursorSettings', JSON.stringify(defaultCursorSettings));
        updateSettings({ ...defaultCursorSettings });
    };

    const { color, size } = editableSettings;

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 40,
            }}
        >
            <ChromePicker
              color={color}
              onChangeComplete={handleChangeComplete}
              onChange={onChangeHandler}
            />

            <TextField
                label="Size"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                value={size.slice(0, -2)}
                onChange={(e: any) => onSizeChangeHandler(Number(e.target.value))}
                style={{
                    width: 'fit-content',
                }}
            />

            <div style={{ width: size, height: size, borderRadius: '50%', backgroundColor: color }} />

            <Box>
                <Button onClick={save}>
                    Сохранить
                </Button>

                <Button onClick={reset}>
                    Сброс
                </Button>
            </Box>
        </Box>
    );
}

export default CursorSettings;
