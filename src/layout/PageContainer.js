import React from 'react';
import {List} from "react-bootstrap-icons";
import {Container, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useMediaQuery} from "react-responsive";
import {selectIsLoggedIn} from "../store/slices/authSlice";

const PageContainer = ({children, title}) => {

    const isMobile = useMediaQuery({query: '(max-width: 600px)'});

    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <div className={'page-container'}>
            <div className={"d-flex flex-row justify-content-between mx-1"}>
                <h3>{title}</h3>
                {isMobile && (
                    <NavDropdown
                        title={(
                            <List className="bi d-block mx-auto" width="32" height="32"/>
                        )}
                        align={"end"}
                        className={'no-carrot-dropdown'}
                    >
                        <NavDropdown.Item to="/" as={Link}>Home</NavDropdown.Item>
                        <NavDropdown.Item to="/report" as={Link}>Report</NavDropdown.Item>
                        <NavDropdown.Item to="/logout" as={Link} hidden={!isLoggedIn}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                )}
            </div>
            <Container>
                {children}
            </Container>
        </div>
    );
};

export default PageContainer;
