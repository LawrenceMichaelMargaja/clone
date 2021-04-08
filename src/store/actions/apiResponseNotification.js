import * as actionTypes from './actionTypes';

export const addApiError = data => {
    return {
        type: actionTypes.ADD_API_ERROR,
        payload: data
    }
};

export const removeAPIError = data => {
    return {
        type: actionTypes.REMOVE_API_ERROR,
        payload: data
    }
};

export const addApiSuccess = data => {
    return {
        type: actionTypes.ADD_API_SUCCESS,
        payload: data
    }
};

export const removeAPISuccess = data => {
    return {
        type: actionTypes.REMOVE_API_SUCCESS,
        payload: data
    }
};
