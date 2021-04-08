import {SET_COIN_TRANSACTIONS, SET_FETCH_ALL_COIN_TRANSACTIONS_LOADING} from "../actions/actionTypes";

export const initialState = {
    coinTransactions: [],
    sellerCoinTransactions: [{
        date_created:"August 6, 2020",
        type:"C",
        amount: 22000,
        created_by:"demby",
        allotted_to:"steph",
        updated_by:"demby",
        is_active:true,
    },{

        date_created:"August 6, 2020",
        type:"D",
        amount: 0,
        created_by:"demby",
        allotted_to:"steph",
        updated_by:"demby",
        is_active:true,
    }],
    transactionForm: {
        firstname: "",
        lastname: "",
        email: "",
        mobile_number: "",
        password: "",
        user_type_id: 9999,
        bank_type_id: 9999,
        bank_no: "",
        address: "",
        birthday: "",
        gender: "F",
        m88_account: "",
        bank_types: [],
        user_types: [],
    },
    loading: {
        fetchAll: false,
        fetchOne: false,
        updating: false,
        creating: false,
        deleting: false,
    }
};

const Reducer = (state = initialState, action)  => {
    switch (action.type) {
        case SET_COIN_TRANSACTIONS:
            return setCoinTransactions(state, action.payload);
        case SET_FETCH_ALL_COIN_TRANSACTIONS_LOADING:
            return setFetchAllTransactionsLoading(state, action.payload);
        default: {
            return state;
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

const setCoinTransactions = (state, payload) => {
    return {
        ...state,
        coinTransactions: payload
    };
};

export default Reducer;
