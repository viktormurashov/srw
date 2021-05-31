export const actionTypes = {
    UPDATE_COORDINATES: 'UPDATE_COORDINATES',
    UPDATE_LOADING: 'UPDATE_LOADING',
};

export const updateCoordinates = (data: any): any => ({
    type: actionTypes.UPDATE_COORDINATES,
    payload: data,
});

export const updateLoading = (data: any): any => ({
    type: actionTypes.UPDATE_LOADING,
    payload: data,
});
