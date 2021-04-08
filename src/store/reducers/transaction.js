import {
    RESET_TRANSACTION_FORM,
    SET_FETCH_ALL_TRANSACTIONS_LOADING,
    SET_TRANSACTION_DEFAULTS,
    SET_TRANSACTIONS,
    SET_USERS_BY_TYPE,
    UPDATE_TRANSACTION_FORM_FIELD
} from "../actions/actionTypes";

export const initialState = {
    transactions: [],
    sellerTransactions: [],
    transactionForm: {
        amount: "",
        coin_amount: "",
        admin_id: "",
        user_id: "",
        money_in: true,
        bank_type_id: "",
        reference_number: "",
        description: "",
        bank_types: [],
        users: [],
    },
    loading: {
        fetchAll: false,
        fetchOne: false,
        fetchOptions: false,
        updating: false,
        creating: false,
        deleting: false,
    }
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRANSACTIONS:
            return setTransactions(state, action.payload);
        case SET_FETCH_ALL_TRANSACTIONS_LOADING:
            return setFetchAllTransactionsLoading(state, action.payload);
        case RESET_TRANSACTION_FORM:
            return resetTransactionForm(state);
        case UPDATE_TRANSACTION_FORM_FIELD:
            return updateTransactionFormField(state, action.payload);
        case SET_USERS_BY_TYPE:
            return setUsersByType(state, action.payload);
        case SET_TRANSACTION_DEFAULTS:
            return setTransactionDefaults(state, action.payload);
        default: {
            return state;
        }
    }
};

const setTransactionDefaults = (state, payload) => {
    return {
        ...state,
        transactionForm: {
            ...state.transactionForm,
            [payload.fieldType]: payload.fieldValue
        }
    };
};

const setUsersByType = (state, payload) => {

    // alert(JSON.stringify(payload))

    return {
        ...state,
        transactionForm: {
            ...state.transactionForm,
            users: payload,
        }
    };
};

const updateTransactionFormField = (state, payload) => {
    return {
        ...state,
        transactionForm: {
            ...state.transactionForm,
            [payload.field]: payload.value,
        }
    };
};

const resetTransactionForm = (state) => {
    return {
        ...state,
        transactionForm: {
            amount: "",
            coin_amount: "",
            admin_id: "",
            user_id: "",
            money_in: true,
            bank_type_id: "",
            reference_number: "",
            description: "",
            bank_types: [],
            users: [],
        }
    }
};

const setFetchAllTransactionsLoading = (state, payload) => {
    return {
        ...state,
        loading: {
            ...state.loading,
            fetchAll: payload,
        }
    };
};

const setTransactions = (state, payload) => {
    return {
        ...state,
        transactions: payload
    };
};

export default Reducer;
