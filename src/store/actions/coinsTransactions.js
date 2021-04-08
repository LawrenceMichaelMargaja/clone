import API from "../../api";
import {hasNoAPIErrors} from "../../utilities";
import {SET_COIN_TRANSACTIONS, SET_FETCH_ALL_COIN_TRANSACTIONS_LOADING} from "./actionTypes";

const setCoinTransactions = data => {
    return {
        type: SET_COIN_TRANSACTIONS,
        payload: data,
    }
};

const setFetchAllTransactionsLoading = data => {
    return {
        type: SET_FETCH_ALL_COIN_TRANSACTIONS_LOADING,
        payload: data,
    }
};

export const fetchAllCoinTransactions = () => {

    return async (dispatch) => {
        try {
            dispatch(setFetchAllTransactionsLoading(true));
            const result = await API().CoinTransaction().fetchAll();

            if (hasNoAPIErrors(result)) {
                dispatch(setCoinTransactions(result.data.data));
            }
            dispatch(setFetchAllTransactionsLoading(false));
        } catch (e) {
            dispatch(setFetchAllTransactionsLoading(false));
            console.log(e);
        }
    };
};
