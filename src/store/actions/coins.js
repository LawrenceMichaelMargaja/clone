import API from "../../api";
import {objectChecker} from "../../utilities";
import {SET_COINS} from "./actionTypes";


export const setCoins = data => {
    return {
        type: SET_COINS,
        payload: data
    }
};

export const fetchAll = () => {

    return async dispatch => {
        try {
            const result = await API().Coin().fetchAll();

            if (objectChecker(result, ['data', 'data'])) {
                dispatch(setCoins(result.data.data));
            }
        } catch (e) {
            console.log(e);
        }
    };
};
