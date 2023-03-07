import React, {useState} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setUser} from "../store/slices/authSlice";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const LoginForm = () => {

    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        email: 'test@domain.com',
        password: '5t73d$66t'
    });
    const [modalShow, setModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);

    const onChangeValue = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://paul.blueboxonline.com/api/v1/users/login', {
            username: formValues.email,
            password: formValues.password,
        })
            .then(res => {
                dispatch(setUser(res.data.user));
            })
            .catch(error => {
                handleModalShow();
                dispatch(setUser(null));
            });
    };

    return (
        <>
            <Form onSubmit={handleSubmit} className={"mt-5"}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email" name={'email'} value={formValues.email}
                                  onChange={onChangeValue}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" name={'password'} value={formValues.password}
                                  onChange={onChangeValue}/>
                </Form.Group>
                <div className={"text-center"}>
                    <Button variant="primary" type="submit">
                        Sign In
                    </Button>
                </div>
            </Form>
            <Modal show={modalShow} onHide={handleModalClose}>
                <Modal.Header>
                    <Modal.Title>Error - Sign In Failed</Modal.Title>
                </Modal.Header>
                <Modal.Body>Incorrect email and/or password.</Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default LoginForm;
