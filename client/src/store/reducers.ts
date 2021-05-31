import { actionTypes } from "./actions";
import { combineReducers } from 'redux';

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

const rootReducer = combineReducers({
    coordinates,
    loading,
});

export default rootReducer;