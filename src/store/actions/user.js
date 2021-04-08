import API from "../../api";
import {hasNoAPIErrors, objectChecker} from "../../utilities";
import {
    RESET_USER_FORM, RESET_WITHDRAWAL_FORM,
    SET_BANK_TYPES,
    SET_BANK_TYPES_AND_USER_TYPES,
    SET_DELETE_USER_LOADING,
    SET_FETCH_ALL_USERS_LOADING,
    SET_FETCH_ONE_USER_LOADING,
    SET_UPDATING_USER_LOADING,
    SET_USER,
    SET_USERS,
    UPDATE_USER_FORM_FIELD
} from "./actionTypes";

export const setUsers = data => {
    return {
        type: SET_USERS,
        payload: data
    }
};

export const resetUserForm = users => {
    return {
        type: RESET_USER_FORM,
    }
};

export const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    }
};

const setFetchAllUsersLoading = loading => {
    return {
        type: SET_FETCH_ALL_USERS_LOADING,
        payload: loading
    }
};

const setFetchOneUserLoading = loading => {
    return {
        type: SET_FETCH_ONE_USER_LOADING,
        payload: loading
    }
};

const setUpdatingUserLoading = loading => {
    return {
        type: SET_UPDATING_USER_LOADING,
        payload: loading
    }
};

const setDeleteUserLoading = loading => {
    return {
        type: SET_DELETE_USER_LOADING,
        payload: loading
    }
};

export const fetchAllUsers = () => {
    return async dispatch => {
        try {
            dispatch(setFetchAllUsersLoading(true));
            const result = await API().User().fetchAll();

            if (hasNoAPIErrors(result)) {
                dispatch(setFetchAllUsersLoading(false));
                dispatch(setUsers(result.data.data));
            }

            dispatch(setFetchAllUsersLoading(false));
        } catch (e) {
            dispatch(setFetchAllUsersLoading(false));
            console.log(e);
        }
    };
};

export const setBankTypesRegionsAndUserTypes = (bankTypes, userTypes, regions) => {
    return {
        type: SET_BANK_TYPES_AND_USER_TYPES,
        payload: {
            bankTypes,
            userTypes,
            regions,
        }
    }
};

export const setBankTypes = (data) => {
    return {
        type: SET_BANK_TYPES,
        payload: data
    }
};

export const resetWithdrawalForm = () => {
    return {
        type: RESET_WITHDRAWAL_FORM,
        payload: null
    }
}

export const fetchAllBankTypes = () => {

    return async (dispatch) => {
        try {
            let bankTypes = API().User().fetchAllBankTypes();

            Promise.all([bankTypes]).then(res => {
                if (
                    objectChecker(res[0], ['data', 'data'])
                ) {
                    bankTypes = res[0]['data']['data'];

                    dispatch(setBankTypes(bankTypes));
                } else {
                    alert('Something went wrong when fetching the bank types');
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
};

export const fetchAllBankTypesRegionsAndUserTypes = () => {

    return async (dispatch) => {
        try {
            let bankTypes = API().User().fetchAllBankTypes();
            let userTypes = API().User().fetchAllUserTypes();
            let regions = API().User().fetchAllRegions();


            Promise.all([bankTypes, userTypes, regions]).then(res => {
                if (
                    objectChecker(res[0], ['data', 'data']) &&
                    objectChecker(res[1], ['data', 'data']) &&
                    objectChecker(res[2], ['data', 'data'])
                ) {
                    bankTypes = res[0]['data']['data'];
                    userTypes = res[1]['data']['data'];
                    regions = res[2]['data']['data'];

                    dispatch(setBankTypesRegionsAndUserTypes(bankTypes, userTypes, regions));
                } else {
                    alert('Something went wrong when fetching the user and bank types');
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
};

export const addUser = (
    firstname,
    lastname,
    email,
    mobile_number,
    password,
    user_type_id,
    bank_type_id,
    region_id,
    bank_no,
    address,
    birthday,
    gender,
    m88_account,
    callback
) => {

    return async (dispatch) => {
        try {
            const add = await API().User().add({
                firstname,
                lastname,
                email,
                mobile_number,
                password,
                user_type_id,
                bank_type_id,
                region_id,
                bank_no,
                address,
                birthday,
                gender,
                m88_account,
            });

            if (objectChecker(add, ['data', 'data'])) {
                if (callback) {
                    callback();
                }
            }
        } catch (e) {
            console.log(e);
        }
    };
};

export const updateUser = (
    id,
    firstname,
    lastname,
    email,
    mobile_number,
    password,
    user_type_id,
    bank_type_id,
    region_id,
    bank_no,
    address,
    birthday,
    gender,
    m88_account,
    callback
) => {

    return async (dispatch) => {
        try {
            dispatch(setUpdatingUserLoading(true));

            const data = {
                id,
                firstname,
                lastname,
                email,
                mobile_number,
                password,
                user_type_id,
                bank_type_id,
                region_id,
                bank_no,
                address,
                birthday,
                gender,
                m88_account,
            };

            const update = await API().User().put(data);

            if (objectChecker(update, ['data', 'data', 'errors']) === false) {
                dispatch(setUpdatingUserLoading(false));
                if (callback) {
                    callback();
                }
            } else {
                dispatch(setUpdatingUserLoading(false));
            }
        } catch (e) {
            dispatch(setUpdatingUserLoading(false));
            console.log(e);
        }
    };
};

export const updateUserFormField = (field, value) => {
    return {
        type: UPDATE_USER_FORM_FIELD,
        payload: {
            field,
            value,
        }
    }
};

export const deleteUser = id => {

    return async (dispatch) => {
        try {
            dispatch(setDeleteUserLoading(true));

            const add = await API().User().delete({
                id,
            });

            if (!objectChecker(add, ['data', 'data', 'errors'])) {
                dispatch(fetchAllUsers());
            }

            dispatch(setDeleteUserLoading(false));
        } catch (e) {
            dispatch(setDeleteUserLoading(false));
            console.log(e);
        }
    };
};

export const fetchUser = id => {

    return async (dispatch) => {
        try {
            dispatch(setFetchOneUserLoading(true));
            const user = await API().User().fetchOne(id);

            if (objectChecker(user, ['data', 'data'])) {
                dispatch(setFetchOneUserLoading(false));
                dispatch(setUser(user['data']['data'][0]));
            }
        } catch (e) {
            dispatch(setFetchOneUserLoading(false));
            console.log(e);
        }
    };
};

