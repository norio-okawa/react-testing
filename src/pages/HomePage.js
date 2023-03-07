import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from "react-redux";
import {Table} from "react-bootstrap";
import {selectIsLoggedIn} from "../store/slices/authSlice";

import PageContainer from '../layout/PageContainer';
import LoginForm from './LoginForm';

const HomePage = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn);

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (!isLoggedIn) return;

        axios.get('https://paul.blueboxonline.com/api/v1/app/tabledata', {
            withCredentials: true,
        })
            .then(res => {
                setTableData(res.data.tabledata);
            });
    }, [isLoggedIn]);

    return (
        <PageContainer title={isLoggedIn ? "Home" : "Sign In"}>
            {isLoggedIn ? (
                <div>
                    {tableData && tableData.length > 1 && (
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                {tableData[0].map((cell, index) => (
                                    <th key={index}>{cell}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {tableData.slice(1).map((row, index) => (
                                <tr key={index}>
                                    {row.map((cell, index) => (
                                        <td key={index}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
                </div>
            ) : (
                <div>
                    <LoginForm/>
                </div>
            )}
        </PageContainer>
    );
};

export default HomePage;
