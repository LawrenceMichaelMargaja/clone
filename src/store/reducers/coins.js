import {SET_COINS,} from "../actions/actionTypes";

export const initialState = {
    coins: [],
    coinForm: {
        transactions: [1, 2],
        amount: "",
        sellers: [],
    }
};

const Reducer = (state = initialState, action)  => {
    switch (action.type) {
        case SET_COINS:
            return setCoins(state, action.payload);
        default: {
            return state;
        }
    }
};

function setCoins(state, payload) {
    return {...state, coins: payload};
}

function resetCoinForm(state) {
    return {
        ...state,
        coinForm: {
            transactions: [1, 2]

        }
    };
}

export default Reducer;
