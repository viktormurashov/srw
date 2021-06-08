import { defaultCursorSettings } from "../constants/constants";

const getCursorSettingsFromLocalStorage = () => {
    const settingsExist = localStorage.key(2);

    if (settingsExist) {
        return JSON.parse(localStorage.getItem('cursorSettings') || JSON.stringify(defaultCursorSettings));
    }

    return defaultCursorSettings;
};

export default getCursorSettingsFromLocalStorage;
