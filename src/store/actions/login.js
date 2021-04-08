import {LOGIN, UPDATE_FIELD} from "./actionTypes";
import API from "../../api";
import {hasNoAPIErrors, objectChecker} from "../../utilities/utilities";

const redirectsByUserType = role => {
    const map = {
        'Admin': 'admin/users',
        'Seller': 'seller/my-store',
        'Dropshipper': 'dropshipper/my-store',
    };

    return map[role];
};

export const login = (email, password, loaders, callbacks) => {
    return async (dispatch) => {

        if (objectChecker(loaders, ['loading'])) {
            loaders.loading();
        }

        try {
            const params = {
                email,
                password,
            }

            alert(JSON.stringify(params));
            const result = await API().User().login(params);

            alert('Alert from actions login.js       ' + [JSON.stringify(result.data)]);

            if (objectChecker(result, ['data', 'data', 'errors'])) {
                callbacks.fail();
                loaders.done();
                return;
            }

            // Store Token.
            const token = result.data.data.userInfo.token;
            const {id, firstname, lastname, role} = result.data.data.userInfo.userDetails;

            alert(JSON.stringify({token}));

            localStorage.setItem('token', token);
            localStorage.setItem('userDetails', JSON.stringify(result.data.data.userInfo.userDetails));

            if (objectChecker(loaders, ['done'])) {
                loaders.done();
            }

            if (objectChecker(loaders, ['success'])) {
                callbacks.success();
            }

            dispatch(setLoginDetails(
                firstname,
                lastname,
                role
            ));

            const redirectTo = redirectsByUserType(role);

            window.location.replace('/');
        } catch (e) {

            if (objectChecker(loaders, ['done'])) {
                loaders.done();

                if (objectChecker(loaders, ['fail'])) {
                    callbacks.fail();
                }
            }
        }
    };
};

export const updateField = (field, value) => {
    return {
        type: UPDATE_FIELD,
        payload: {
            field,
            value,
        }
    }
};

export const setLoginDetails = (firstname, lastname, role, balance) => {
    return {
        type: LOGIN,
        payload: {
            firstname,
            lastname,
            role,
            balance,
        }
    }
};

export const refreshUserData = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');

            if (token === null) {
                return
            }

            const result = await API().User().refreshUserData();

            if (hasNoAPIErrors(result)) {
                const data = result['data']['data']['userInfo']['userDetails'];

                localStorage.setItem('userDetails', JSON.stringify(data));

                const {
                    firstname,
                    lastname,
                    role,
                    balance,
                } = data;

                dispatch(setLoginDetails(firstname, lastname, role, balance));
            }

        } catch (e) {
            alert(e)
        }
    };
};
