import {
    FETCH_ALL_USERS,
    RESET_USER_FORM,
    SET_BANK_TYPES,
    SET_BANK_TYPES_AND_USER_TYPES,
    SET_DELETE_USER_LOADING,
    SET_FETCH_ALL_USERS_LOADING,
    SET_FETCH_ONE_USER_LOADING,
    SET_UPDATING_USER_LOADING,
    SET_USER,
    SET_USERS,
    UPDATE_USER_FORM_FIELD
} from "../actions/actionTypes";

export const initialState = {
    users: [],
    userForm: {
        firstname: "",
        lastname: "",
        email: "",
        mobile_number: "",
        password: "",
        user_type_id: 9999,
        bank_type_id: 9999,
        region_id: 9999,
        bank_no: "",
        address: "",
        birthday: "",
        gender: "F",
        m88_account: "",
        bank_types: [],
        user_types: [],
        regions: [],
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
        case RESET_USER_FORM:
            return resetUserForm(state, action.payload);
        case FETCH_ALL_USERS:
            return fetchAll(state, action.payload);
        case SET_USER:
            return setUser(state, action.payload);
        case SET_USERS:
            return setUsers(state, action.payload);
        case SET_BANK_TYPES_AND_USER_TYPES:
            return setBankTypesRegionsAndUserTypes(state, action.payload);
        case UPDATE_USER_FORM_FIELD:
            return updateUserFormField(state, action.payload);
        case SET_FETCH_ALL_USERS_LOADING:
            return setFetchAllUsersLoading(state, action.payload);
        case SET_FETCH_ONE_USER_LOADING:
            return setFetchOneUserLoading(state, action.payload);
        case SET_UPDATING_USER_LOADING:
            return setUpdatingUserLoading(state, action.payload);
        case SET_DELETE_USER_LOADING:
            return setDeleteUserLoading(state, action.payload);
        case SET_BANK_TYPES:
            return setBankTypes(state, action.payload);

        default: {
            return state;
        }
    }
};

const setBankTypes = (state, payload) => {
    return {
        ...state,
        userForm: {
            ...state.userForm,
            bank_types: payload
        }
    };
};

const setDeleteUserLoading = (state, payload) => {
    return {
        ...state,
        loading: {
            ...state.loading,
            deleting: payload,
        }
    };
};

const setUpdatingUserLoading = (state, payload) => {
    return {
        ...state,
        loading: {
            ...state.loading,
            updating: payload,
        }
    };
};

const setFetchOneUserLoading = (state, payload) => {
    return {
        ...state,
        loading: {
            ...state.loading,
            fetchOne: payload,
        }
    };
};

const setFetchAllUsersLoading = (state, payload) => {
    return {
        ...state,
        loading: {
            ...state.loading,
            fetchAll: payload,
        }
    };
};

const resetUserForm = (state, payload) => {
    // alert('restting!');
    return {
        ...state,
        userForm: {
            ...state.userForm,

            firstname: "",
            lastname: "",
            email: "",
            mobile_number: "",
            password: "",
            bank_no: "",
            address: "",
            birthday: "",
            gender: "F",
            m88_account: "",
        }
    };
};

const fetchAll = (state, payload) => {
    return {
        ...state,
    };
};

const setUser = (state, payload) => {
    return {
        ...state,
        userForm: {
            ...state.userForm,
            ...payload
        }
    };
};

const setUsers = (state, payload) => {
    return {
        ...state,
        users: payload
    };
};

const updateUserFormField = (state, payload) => {
    return {...state, userForm: {...state.userForm, [payload.field]: payload.value}};
};

const setBankTypesRegionsAndUserTypes = (state, payload) => {
    return {
        ...state,
        userForm: {
            ...state.userForm,
            // Also set form defaults.
            user_type_id: payload.userTypes[0]['id'],
            bank_type_id: payload.bankTypes[0]['id'],
            region_id: payload.regions[0]['id'],
            bank_types: payload.bankTypes,
            user_types: payload.userTypes,
            regions: payload.regions,
        }
    };
};

export default Reducer;
