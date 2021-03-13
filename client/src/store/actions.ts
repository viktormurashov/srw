export const actionTypes = {
    UPDATE_COORDINATES: 'UPDATE_COORDINATES',
};

export const updateCoordinates = (data: any): any => ({
    type: actionTypes.UPDATE_COORDINATES,
    payload: data,
});