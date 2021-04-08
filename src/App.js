import React, {Fragment, useEffect} from 'react';
import ReactDOM from 'react-router-dom';
import {Redirect, Route, Switch} from "react-router-dom";
import { Button, Table} from 'antd';
import './App.less';

import {refreshUserData, setLoginDetails} from "./store/actions/login";

import {AxiosInterceptors} from './axios_custom';
import {validJSON} from "./utilities/utilities";
import {useDispatch} from "react-redux";

import SiderDemo from './hoc/layout/layout.component';

import HomePage from './views/Pages/home/home.component';
import LoginPage from './views/LoginPage/LoginPage';

import Header from './components/header/header.component'


const App = () => {

    const dispatch = useDispatch();

    const getAuthStatus = () => {
        const token = localStorage.getItem('token');

        alert('Alert from App.js      ' + [JSON.stringify({token})]);

        if (token) {
            let userDetails = localStorage.getItem('userDetails');

            if (validJSON(userDetails)) {
                userDetails = JSON.parse(userDetails);

                if (
                    'firstname' in userDetails &&
                    'lastname' in userDetails &&
                    'role' in userDetails &&
                    'balance' in userDetails
                ) {
                    dispatch(
                        setLoginDetails(
                            userDetails['firstname'],
                            userDetails['lastname'],
                            userDetails['role'],
                            userDetails['balance'],
                        )
                    )
                } else {
                    // alert('NOTHING HERE');
                    return false;
                }
            } else {
                // alert('NOTHING STILL');
                return false;
            }
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('userDetails');

            // alert('NOTHING HERE')

            // console.log('FIX IT');
        }


    };

    // if(token === false) {
    //   window.location.replace('/auth');
    // }

    const handleLogout = () => {
      alert('Logging out');

      localStorage.removeItem('token');
      localStorage.removeItem('userDetails');

      window.location.replace('/auth');
  };

    useEffect(() => {
        getAuthStatus();
        dispatch(refreshUserData())
    }, []);





    return (
      <div className="App">
        <AxiosInterceptors/>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path='/auth' component={LoginPage}/>
        </Switch>
          {/* <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInAndSignUpPage}/> */}
          {/* <Redirect to '/' from '/auth' /> */}
        <button onClick={handleLogout}>LOG OUT</button>
      </div>
    )
}

export default App;
