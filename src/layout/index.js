import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Switch, Route, Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import HomePage from '../pages/HomePage';
import ReportPage from '../pages/ReportPage';
import LogoutPage from '../pages/LogoutPage';

function AppLayout() {

    const [logo, setLogo] = useState('');

    useEffect(() => {
        axios.get('https://paul.blueboxonline.com/api/v1/app/settings')
            .then(res => {
                setLogo(res.data.logo);
            });
    }, []);

    return (
        <div className={"bg-light"} style={{
            minHeight: '100vh'
        }}>
            <Navbar bg="white" expand={"md"}>
                <Container fluid>
                    <Navbar.Brand>
                        <img src={logo} height={'50px'}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            <Nav.Link to={'/'} as={Link}>Home</Nav.Link>
                            <Nav.Link to={'/report'} as={Link}>
                                Report
                            </Nav.Link>
                            <Nav.Link to={'/logout'} as={Link}>
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Switch>
                    <Route path={'/'} exact component={HomePage}/>
                    <Route path={'/report'} exact component={ReportPage}/>
                    <Route path={'/logout'} exact component={LogoutPage}/>
                </Switch>
            </Container>
        </div>
    );
}

export default AppLayout;
