import React, {useEffect} from 'react';
import axios from 'axios';
import {useDispatch} from "react-redux";
import {Redirect} from 'react-router-dom';
import {setUser} from "../store/slices/authSlice";

const LogoutPage = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('https://paul.blueboxonline.com/api/v1/users/logout')
            .then(res => {
                dispatch(setUser(null));
            })
            .catch(error => {
                dispatch(setUser(null));
            });
    }, [dispatch]);

    return <Redirect to={'/'}/>;
};

export default LogoutPage;
