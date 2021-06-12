import { actionTypes } from "./actions";
import { combineReducers } from 'redux';
import { defaultCursorSettings } from "../constants/constants";

type CursorSettingsType = {
    color: string;
    size: string;
};

const coordinates = (state: any = null, action: any) => {
    switch (action.type) {
        case actionTypes.UPDATE_COORDINATES:
            return { ...action.payload };
        default:
            return state;
    }
};

const loading = (state: boolean = true, action: any) => {
    switch (action.type) {
        case actionTypes.UPDATE_LOADING:
            return action.payload;
        default:
            return state;
    }
};

const settings = (state: CursorSettingsType = defaultCursorSettings, action: any) => {
    switch (action.type) {
        case actionTypes.UPDATE_SETTINGS:
            return action.payload;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    coordinates,
    loading,
    settings,
});

export default rootReducer;