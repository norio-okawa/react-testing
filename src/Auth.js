import React, {useEffect} from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {selectIsLoggedIn, setUser} from "./store/slices/authSlice";

const Auth = ({children}) => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    useEffect(() => {
        if (isLoggedIn) return;

        axios.get('/users/session', {
            withCredentials: true,
        })
            .then(res => {
                dispatch(setUser(res.data));
            })
            .catch(() => {
                dispatch(setUser(null));
            });
    }, [isLoggedIn, dispatch]);

    return children;
};

export default Auth;
