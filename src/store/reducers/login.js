import {LOGIN, UPDATE_FIELD} from "../actions/actionTypes";

export const initialState = {
    firstname: '',
    lastname: '',
    role: '',
    email: '',
    password: '',
    balance: '',
};

const Reducer = (state = initialState, action)  => {
    switch (action.type) {
        case LOGIN:
            return login(state, action.payload);
        case UPDATE_FIELD:
            return updateField(state, action.payload);
        default: {
            return state;
        }
    }
};

const login = (state, payload) => {
    return {
        ...state,
        firstname: payload.firstname,
        lastname: payload.lastname,
        role: payload.role,
        balance: payload.balance,
    };
};

const updateField = (state, payload) => {
    return {...state, [payload.field]: payload.value};
};

export default Reducer;
