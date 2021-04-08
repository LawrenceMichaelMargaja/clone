import API from "../../api";
import {hasNoAPIErrors} from "../../utilities";
import {
    RESET_TRANSACTION_FORM,
    SET_DEFAULT_BANK_TYPE_ID,
    SET_FETCH_ALL_TRANSACTIONS_LOADING,
    SET_TRANSACTION_DEFAULTS,
    SET_TRANSACTIONS,
    SET_USERS_BY_TYPE,
    UPDATE_TRANSACTION_FORM_FIELD
} from "./actionTypes";
import {setBankTypes} from "./user";

const setTransactions = data => {
    return {
        type: SET_TRANSACTIONS,
        payload: data,
    }
};

const setFetchAllTransactionsLoading = data => {
    return {
        type: SET_FETCH_ALL_TRANSACTIONS_LOADING,
        payload: data,
    }
};

const setUsersByType = data => {
    return {
        type: SET_USERS_BY_TYPE,
        payload: data,
    }
};

export const fetchAllTransactions = () => {

    return async (dispatch) => {
        try {
            dispatch(setFetchAllTransactionsLoading(true));
            const result = await API().Transaction().fetchAll();

            if (hasNoAPIErrors(result)) {
                dispatch(setTransactions(result.data.data));
            }

            dispatch(setFetchAllTransactionsLoading(false));
        } catch (e) {
            dispatch(setFetchAllTransactionsLoading(false));
            console.log(e);
        }
    };
};

export const fetchTransactionCreateOptions = () => {

    return async dispatch => {
        try {
            dispatch(setTransactionLoaders('fetchOptions', true));
            Promise.all([
                API().User().fetchAllBankTypes(),
                API().User().fetchAllUsersByType('Seller'),
            ]).then(res => {
                if (hasNoAPIErrors(res[0]) && hasNoAPIErrors(res[1])) {
                    const bankTypes = res[0]['data']['data'];
                    const usersByType = res[1]['data']['data'];

                    dispatch(setBankTypes(bankTypes));
                    dispatch(setUsersByType(usersByType));

                    dispatch(setTransactionLoaders('fetchOptions', false));
                } else {
                    alert('haha gg');
                }
            });
        } catch (e) {
            dispatch(setTransactionLoaders('fetchOptions', true));
        }
    };
};


export const resetTransactionForm = () => {
    return {
        type: RESET_TRANSACTION_FORM,
    }
};


export const setTransactionDefaults = (fieldType, fieldValue) => {
    return {
        type: SET_TRANSACTION_DEFAULTS,
        payload: {
            fieldType,
            fieldValue
        },
    }
};

export const setTransactionLoaders = (type, val) => {
    return {
        type: SET_DEFAULT_BANK_TYPE_ID,
        payload: {
            type,
            val,
        },
    }
};

export const updateTransactionFormField = (field, value) => {
    return {
        type: UPDATE_TRANSACTION_FORM_FIELD,
        payload: {
            field,
            value,
        }
    }
};


export const deleteTransaction = (params, successCallback) => {
    return async dispatch => {
        try {
            const data = await API().Transaction().delete(params);

            if (hasNoAPIErrors(data)) {
                // Merely a redirect
                alert('caaling');
                successCallback();
            }
        } catch (err) {
            alert('error1');
            console.log('err', err);
        }
    };
};

export const addTransaction = (params, successCallback) => {
    return async dispatch => {
        try {
            const data = await API().Transaction().add(params);

            if (hasNoAPIErrors(data)) {
                // Merely a redirect
                successCallback();
            }
        } catch (err) {
            alert('error1');
            console.log('err', err);
        }
    };
};
