import axios from 'axios';
import {hasNoAPIErrors, objectChecker} from "./utilities/utilities";
import {addApiError, addApiSuccess} from "./store/actions/apiResponseNotification";
import {useDispatch} from "react-redux";

// Make instance and export this
const instance = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    // baseURL: "https://droppy.biz/api/v1",
    baseURL: "https://dev.droppy.biz/api/v1",
    // baseURL: "http://localhost:3003/api/v1",
});

// Make component that sets these settings besrc/axios_custom.js:14 low
export const AxiosInterceptors = () => {
    const dispatch = useDispatch();

    // Set the settings inside lol
    instance.interceptors.request.use(req => {
        // Attach token for every request.
        const token = localStorage.getItem('token');

        // alert(JSON.stringify({token}));

        if(token === null) {
            // alert('There is no token');
        } else {
            // alert('There is a Token');
        }

        if (token) {
            req.headers =  {
                authorization: token
            };
        }

        return req;
    }, error => {
        alert('Alert from axios_custom.js    Request Error');
    });

    instance.interceptors.response.use((res) => {
        // Handle API logic errors
        if (!hasNoAPIErrors(res)) {
            if (res['data']['data'] !== null) {
                const errors = res['data']['data']['errors'];

                for (let i in errors) {
                    dispatch(addApiError(errors[i]));
                }
            }
        }

        // Handle successes
        const successStatuses = [
            "INSERT_SUCCESS",
            "DELETE_SUCCESS",
            "UPDATE_SUCCESS",
        ];

        const operationStatus = objectChecker(res, ['data', 'operationStatus']);

        if (successStatuses.includes(operationStatus)) {
            dispatch(addApiSuccess(res['data']['responseMessage']));
        }

        return res;
    }, error => {
        if (error.response.status === 401) {
            alert('You are unauthorized to access this system - logging out.');

            localStorage.removeItem('token');
            localStorage.removeItem('userDetails');

            window.location.replace('/');
        } else {
            alert('not here: ' + JSON.stringify(error));
        }
    });

    return null;
};

export default instance;
