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

const rootReducer = combineReducers({
    coordinates,
});

export default rootReducer;