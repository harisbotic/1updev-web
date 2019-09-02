import React, { Component } from 'react';
import {Modal,  Dropdown, ButtonGroup, ModalBody, ModalFooter,Row, Col, Container, Button} from 'react-bootstrap';


function AddItem (props) {
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body>
          <Container>
            <Row className="show-grid">
              <Col xs={6}>
                <p>Add Image</p>
              </Col>
              <Col xs={6}>
                <ul>
                    <li>Item name:________</li>
                    <li>Price:_______</li>
                    <li>Quantity:________</li>
                    <li></li>
                </ul>
                <Button className="mx-2">Add</Button>
                <Button className="mx-2" onClick={props.onHide}>Cancel</Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
  export default AddItem;
