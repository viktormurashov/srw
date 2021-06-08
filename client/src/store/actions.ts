export const actionTypes = {
    UPDATE_COORDINATES: 'UPDATE_COORDINATES',
    UPDATE_LOADING: 'UPDATE_LOADING',
    UPDATE_SETTINGS: 'UPDATE_SETTINGS',
};

export const updateCoordinates = (data: any): any => ({
    type: actionTypes.UPDATE_COORDINATES,
    payload: data,
});

export const updateLoading = (data: any): any => ({
    type: actionTypes.UPDATE_LOADING,
    payload: data,
});

export const updateSettings = (data: any): any => ({
    type: actionTypes.UPDATE_SETTINGS,
    payload: data,
});
