import {
    SET_COINS,
    SET_FETCH_ALL_WITHDRAWALS_LOADING,
    SET_WITHDRAWALS, UPDATE_USER_FORM_FIELD, UPDATE_WITHDRAWAL_FORM_FIELD,
    SET_WITHDRAWAL_TRANSACTIONS
} from "./actionTypes";
import API from "../../api";
import {objectChecker, hasNoAPIErrors} from "../../utilities";





export const setFetchAllWithdrawalsLoading = data => {
    return {
        type: SET_FETCH_ALL_WITHDRAWALS_LOADING,
        payload: data
    }
};

export const setWithdrawals = (data, pagination) => {
    return {
        type: SET_WITHDRAWALS,
        payload: {
            data,
            pagination
        }
    }
};

const setWithdrawalTransactions = (data, pagination) => {
    return {
        type: SET_WITHDRAWAL_TRANSACTIONS,
        payload: {data, pagination}
    }
};

export const fetchAllWithdrawals = (
    rows,
    page,
    search
    ) => {

    return async dispatch => {

        try {
            dispatch(setFetchAllWithdrawalsLoading(true));

            const params = {
                rows,
                page,
            }

            if (search) {
                params['search'] = search
            }

            const result = await API().Withdrawal().getAll(params);

            if (objectChecker(result, ['data', 'page'])) {
                dispatch(setWithdrawals(result.data.data, result.data.pagination));
                // console.log('wtf man');
            }

            if (hasNoAPIErrors(result)) {   
                if (result.data.data !== null) {
                    dispatch(setWithdrawalTransactions(result.data.data, result.data.pagination));
                }
            }
            
            dispatch(setFetchAllWithdrawalsLoading(false))
        } catch (e) {
            console.log(e);
        }
    };
};


export const updateWithdrawalFormField = (field, value) => {
    return {
        type: UPDATE_WITHDRAWAL_FORM_FIELD,
        payload: {
            field,
            value,
        }
    }
};

export const addWithdrawal = (
    amount,
    bankNo,
    bankTypeId,
    bankAccountName,
    callback,
) => {

    return async dispatch => {
        try {
            const add = await API().Withdrawal().create({
                amount,
                bank_no: bankNo,
                bank_type_id: bankTypeId,
                bank_account_name: bankAccountName,
            })

            if (objectChecker(add, ['data', 'data', 'errors']) === false) {
                if (callback) {
                    callback();
                }
            }
        } catch (e) {
            
        }
    }
}

export const updateWithdrawalStatus = (
    id,
    status,
    voidOrRejectReason,
    referenceNumber,
    callback
) => {

    return async dispatch => {
        try {

            let payload = {
                id,
                status,
                void_or_reject_reason: voidOrRejectReason,
                reference_number: referenceNumber,
            }

            const result = await API().Withdrawal().update(payload)

            if (objectChecker(result, ['data', 'data', 'errors']) === false) {
                if (callback) {
                    callback();
                }
            }
        } catch (e) {

        }
    }
}
