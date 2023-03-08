import React, {useEffect} from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {selectIsLoggedIn, setUser} from "./store/slices/authSlice";

const Auth = ({children}) => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    useEffect(() => {
        if (isLoggedIn) return;

        axios.get('https://paul.blueboxonline.com/api/v1/users/session', {
            withCredentials: true,
        })
            .then(res => {
                if (res.data.email) {
                    dispatch(setUser(res.data));
                } else {
                    dispatch(setUser(null));
                }
            })
            .catch(() => {
                dispatch(setUser(null));
            });
    }, [isLoggedIn, dispatch]);

    return <>{children}</>;
};

export default Auth;
