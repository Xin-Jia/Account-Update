import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { Container, ListGroup } from "react-bootstrap";
import { useHistory } from 'react-router-dom'

const Accounts = () => {

    const [accounts, setAccounts] = useState([]);

    const history = useHistory()

    useEffect(() => {
        db.collection("accounts").orderBy("name").onSnapshot((snapshot) => {
            setAccounts(snapshot.docs.map((doc) => ({ id: doc.id, account: doc.data() })));
        });
    }, []);

    const editAccount = (account, id) => {
        history.push({
            pathname: `/account/${id}`,
            state: { account: account, id: id }
        });
    }

    return (
        <Container>

            <h1 style={{ marginTop: "2em", marginBottom: "1em" }}>Accounts</h1>

            <ListGroup>

                {accounts.map(({ id, account }) => {
                    return <ListGroup.Item action onClick={(e) => editAccount(account, id)}>{account.name}</ListGroup.Item>
                })}
            </ListGroup>

        </Container >

    )
}

export default Accounts
