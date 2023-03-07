import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useMediaQuery} from 'react-responsive'
import {Switch, Route, Link} from 'react-router-dom';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {PersonCircle} from 'react-bootstrap-icons';

import HomePage from '../pages/HomePage';
import ReportPage from '../pages/ReportPage';
import LogoutPage from '../pages/LogoutPage';
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../store/slices/authSlice";

function AppLayout() {

    const isMobile = useMediaQuery({query: '(max-width: 600px)'});

    const isLoggedIn = useSelector(selectIsLoggedIn);

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
            <Navbar bg="white"
                    className="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start">
                <Container fluid>
                    <Navbar.Brand className="d-flex align-items-center my-2 my-lg-0 me-sm-auto text-white">
                        <img src={logo} height={'50px'}/>
                    </Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav"
                                     className="col-12 col-sm-auto my-2 justify-content-end my-md-0 text-small">
                        {!isMobile && (
                            <Nav className={'align-items-center'}>
                                <React.Fragment>
                                    <Nav.Link to={'/'} as={Link}>Home</Nav.Link>
                                    <Nav.Link to={'/report'} as={Link}>
                                        Report
                                    </Nav.Link>
                                    <NavDropdown
                                        title={(
                                            <PersonCircle className="bi d-block mx-auto" width="32" height="32"/>
                                        )}
                                        align={"end"}
                                        className={'no-carrot-dropdown'}
                                    >
                                        {!!isLoggedIn && (
                                            <NavDropdown.Item to="/logout" as={Link}>
                                                Logout
                                            </NavDropdown.Item>
                                        )}
                                    </NavDropdown>
                                </React.Fragment>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Switch>
                <Route path={'/'} exact component={HomePage}/>
                <Route path={'/report'} exact component={ReportPage}/>
                <Route path={'/logout'} exact component={LogoutPage}/>
            </Switch>
        </div>
    );
}

export default AppLayout;
