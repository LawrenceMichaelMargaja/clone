import React, {useEffect, useState} from "react";
import {Form, Input, Button, Checkbox, Card} from 'antd';
import {Spin} from 'antd';

import {useDispatch, useSelector} from "react-redux";

import {login, updateField} from "../../store/actions/login";

import './LoginPage.styles.css';
import {Redirect} from 'react-router';

export default function LoginPage() {

    const dispatch = useDispatch();

    const email = useSelector(state => state.login.email);
    const password = useSelector(state => state.login.password);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(true);

    const onKeyPress = (e) => {
        alert('Alert from LoginPage.js     ' + [JSON.stringify({
            name: e.target.name,
            value: e.target.value
        })]);
        dispatch(updateField(e.target.name, e.target.value));
    };

    // alert(JSON.stringify({email}));

    const onSubmit = (e) => {
        e.preventDefault();

        const loaders = {
            loading: () => setLoading(true),
            done: () => setLoading(false),
        };

        const callbacks = {
            success: () => {
                setError(false);
            },
            fail: () => {
                setError(true);
            },
        };

        dispatch(login(email, password, loaders, callbacks));
    };

    useEffect(() => {
        // In the future, make this auto login if you have a token saved and check if that is valid. :)
    }, []);

    const [cardAnimation, setCardAnimation] = React.useState("cardHidden");

    React.useEffect(() => {
        let id = setTimeout(function () {
            setCardAnimation("");
        }, 700);
        // Specify how to clean up after this effect:
        return function cleanup() {
            window.clearTimeout(id);
        };
    });

    return (
        <form className='form' onSubmit={e => onSubmit(e)}>
            {
                loading ? (
                    <Spin/>
                ) : (
                    <Card login className={cardAnimation}>
                        <Card>
                            {
                                error ? (
                                    <Card>
                                        <Input
                                            label="Email..."
                                            id="email"
                                            // value= 'email'
                                            onChange= {e => onKeyPress(e)}
                                            name= 'email'
                                            fullWidth= 'true'
                                        />

                                        <Input
                                            label="Password"
                                            id="password"
                                            // value= 'password'
                                            onChange= {e => onKeyPress(e)}
                                            name= 'password'
                                            type= 'password'
                                            autoComplete= 'off'
                                            fullWidth='true'
                                            formControlProps={{

                                            }}
                                        />

                                        <Form.Item>
                                            <Checkbox>Remember me</Checkbox>
                                        </Form.Item>

                                        <button type='submit' block>
                                            SUBMIT
                                        </button>
                                    </Card>
                                ) : (
                                    <h1>yawa</h1>
                                )
                            }
                        </Card>
                    </Card>
                )
            }
        </form>
    );
};
