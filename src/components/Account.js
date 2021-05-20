import React, { useState, useEffect } from 'react';
import { Form, Card, Button, Row, Col } from "react-bootstrap";
import { useLocation, useHistory } from 'react-router-dom';
import { db } from '../firebase';

const Account = () => {
    const { state } = useLocation();
    const [email, setEmail] = useState(state.account.email);
    const [name, setName] = useState(state.account.name);
    const [phone, setPhone] = useState(state.account.phone);
    const [isEdit, setIsEdit] = useState(false);

    const history = useHistory();


    useEffect(() => {
        console.log(state);
    }, []);

    const goBack = () => {
        history.push("/")
    }

    const handleSave = () => {
        setIsEdit(false);

        db.collection('accounts')
            .doc(state.id)
            .update({
                name: name,
                email: email,
                phone: phone
            });
    }

    return (
        <>
            <Card>
                <Card.Body className="m-4">
                    <Row className="mb-4">
                        <Col sm={1}><Button variant="primary" onClick={goBack}>←</Button></Col>
                        <Col sm={10}><h2>{state.account.name}</h2></Col>
                        <Col sm={1}><Button variant="primary"
                            onClick={(e) => { setIsEdit(true) }}>Edit</Button>
                        </Col>
                    </Row>

                    <Form>
                        <Form.Group id="name" className="mb-4">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" required
                                disabled={!isEdit}
                                value={name}
                                onChange={(e) => { setName(e.target.value) }} />
                        </Form.Group>
                        <Form.Group id="email" className="mb-4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required
                                disabled={!isEdit}
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }} />
                        </Form.Group>
                        <Form.Group id="phone" className="mb-4">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" required
                                disabled={!isEdit}
                                value={phone}
                                onChange={(e) => { setPhone(e.target.value) }} />
                        </Form.Group>
                        <Button variant="primary"
                            disabled={!isEdit}
                            onClick={handleSave}>Save</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default Account
