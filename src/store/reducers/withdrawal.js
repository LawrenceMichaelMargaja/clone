import {
    LOGIN, RESET_WITHDRAWAL_FORM, SET_BANK_TYPES,
    SET_FETCH_ALL_WITHDRAWALS_LOADING, SET_WITHDRAWALS,
    UPDATE_FIELD, UPDATE_WITHDRAWAL_FORM_FIELD,
    SET_WITHDRAWAL_TRANSACTIONS
} from "../actions/actionTypes";

export const initialState = {
    // withdrawals: [],
    withdrawals: {
        data: [],
        pagination: null
    },
    // pagination: null,
    withdrawalForm: {
        amount: 0,
        bankTypeId: "",
        bankAccountName: "",
        bankNo: "",
    },
    loading: {
        fetchAll: false
    }
};

const Reducer = (state = initialState, action)  => {
    switch (action.type) {
        case SET_FETCH_ALL_WITHDRAWALS_LOADING:
            return setFetchAllWithdrawalsLoading(state, action.payload);
        case SET_WITHDRAWALS:
            return setWithdrawals(state, action.payload);
        case UPDATE_WITHDRAWAL_FORM_FIELD:
            return updateWithdrawalFormField(state, action.payload);
        case SET_BANK_TYPES:
            return setBankTypes(state, action.payload);
        case RESET_WITHDRAWAL_FORM:
            return resetWithdrawalForm(state, action.payload);
        case SET_WITHDRAWAL_TRANSACTIONS:
            return setWithdrawalTransactions(state, action.payload);

        default: {
            return state;
        }
    }
};

const resetWithdrawalForm = (state, payload) => {
    return {
        ...state,
        withdrawalForm: {
            amount: 0,
            bankTypeId: "",
            bankAccountName: "",
            bankNo: "",
        }
    };
}

const setBankTypes = (state, payload) => {
    // Also listen for this dispatch and set your defaults.
    return {
        ...state,
        withdrawalForm: {
            ...state.withdrawalForm,
            bankTypeId: payload[0]['id'],
        }
    };
}

const updateWithdrawalFormField = (state, payload) => {
    return {...state, withdrawalForm: {...state.withdrawalForm, [payload.field]: payload.value}};
};

const setWithdrawals = (state, payload) => {
    return {
        ...state,
        withdrawals: {
            data: payload.data
        },
    };
};

const setFetchAllWithdrawalsLoading = (state, payload) => {
    return {
        ...state,
        loading: {
            ...state.loading,
            fetchAll: payload
        }
    };
};


const setWithdrawalTransactions = (state, payload) => {
    return {
        ...state,
        withdrawals: {
            data: payload.data,
            pagination: payload.pagination,
        }
    };
};


export default Reducer;
