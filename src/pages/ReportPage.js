import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../store/slices/authSlice";
import {Redirect} from "react-router-dom";

const ReportPage = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn);

    const [formValues, setFormValues] = useState({
        number_value: '',
        file: '',
    });
    const [file, setFile] = useState({
        name: '',
        size: 0,
        type: '',
        data: '',
    });
    const [html, setHtml] = useState('');

    const onInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const onFileChange = (e) => {
        onInputChange(e);
        const selectedFile = e.target.files;
        if (selectedFile.length > 0) {
            const [imageFile] = selectedFile;
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const srcData = fileReader.result;
                const data = srcData.split('base64,')[1];
                setFile({
                    name: imageFile.name,
                    size: imageFile.size,
                    type: imageFile.type,
                    data,
                });
            };
            fileReader.readAsDataURL(imageFile);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            number_value: formValues.number_value,
            file,
        });
        axios.post('https://paul.blueboxonline.com/api/v1/app/report', {
            number_value: formValues.number_value,
            file,
        }, {
            withCredentials: true,
        })
            .then(res => {
                setHtml(res.data);
            })
            .catch(err => {
                console.log(err, 'err')
            });
    };

    return isLoggedIn ? (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Enter a value between 1 and 10</Form.Label>
                    <Form.Control type="number" name={'number_value'} placeholder="Value" onChange={onInputChange}/>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Attach a JPG image</Form.Label>
                    <Form.Control type="file" name={'file'} onChange={onFileChange}/>
                </Form.Group>
                <div className="mb-3 text-center">
                    <Button type="submit">
                        Generate Report
                    </Button>
                </div>
            </Form>
            <div className="mb-3 bg-white mx-5" style={{height: '400px'}} dangerouslySetInnerHTML={{__html: html}}>
            </div>
        </div>
    ) : <Redirect to={'/'}/>;
};

export default ReportPage;
