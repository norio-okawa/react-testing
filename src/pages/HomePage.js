import React, {useEffect, useState} from 'react';
import axios from 'axios';

import LoginForm from './LoginForm';
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../store/slices/authSlice";
import {Table} from "react-bootstrap";

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
        <div className={"mt-2"}>
            {isLoggedIn ? (
                <div>
                    <h3>Home</h3>
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
        </div>
    );
};

export default HomePage;
