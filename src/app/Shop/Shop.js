import React, { useEffect, useState } from "react";
import {Button, ButtonToolbar, Container, Row, Col, Form, FormControl,} from 'react-bootstrap';
import "./Shop.scss";
import AddItem from './AddItem';

const Shop = () => {
    const [modalShow, setModalShow] = useState(false);
    return <div className="container">
            <Row className="justify-content-center">
                <Col lg={2}><p>Shop</p></Col>
                <Col lg={{ span: 1, offset: 3 }}><p>filter</p></Col>
                <Col lg={1}><p>Sort by name</p></Col>
                <Col lg={1}><p>Sort by price</p></Col>
                <Col lg={1}><p>Sort by category</p></Col>
                <Col lg={3}><Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                </Form></Col>
            </Row>
            <Row>
                <Col lg={2}>
                <ButtonToolbar>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Launch modal with grid
                </Button>

                <AddItem show={modalShow} onHide={() => setModalShow(false)} />
                </ButtonToolbar>
                </Col>
                <Col lg={2}>Shop item</Col>
                <Col lg={2}>Shop item</Col>
                <Col lg={2}>Shop item</Col>
                <Col lg={2}>Shop item</Col>
                <Col lg={2}>Shop item</Col>
            </Row>

            </div>
    
};

export default Shop;