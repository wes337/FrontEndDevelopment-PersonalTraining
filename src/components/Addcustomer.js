import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus);

class Addcustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: ''
        };

        this.toggle = this.toggle.bind(this);
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    
    toggle() {
        this.setState({
        modal: !this.state.modal
        });
    }

    saveCustomer = () => {
        const customer = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            streetaddress: this.state.streetaddress,
            postcode: this.state.postcode,
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phone
        }
        this.props.saveCustomer(customer);
        this.setState({
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: ''         
        })
        this.toggle();
    }

    render() {
        return (
        <div className="m-2">
            <Button color="primary" size="sm" onClick={this.toggle}><FontAwesomeIcon icon="plus" /> Add Customer</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} size='lg'>
            <ModalHeader toggle={this.toggle}>Add Customer</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup row>
                        <Label for="firstName" sm={2}>First Name</Label>
                        <Col sm={10}>
                            <Input type="text" name="firstname" id="firstName" onChange={this.handleChange} value={this.state.firstname} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="lastName" sm={2}>Last Name</Label>
                        <Col sm={10}>
                            <Input type="text" name="lastname" id="lastName" onChange={this.handleChange} value={this.state.lastname} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="streetaddressText" sm={2}>Street</Label>
                        <Col sm={10}>
                            <Input type="text" name="streetaddress" id="streetaddressText" onChange={this.handleChange} value={this.state.streetaddress} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="postcodeText" sm={2}>Post Code</Label>
                        <Col sm={10}>
                            <Input type="text" name="postcode" id="postcodeText" onChange={this.handleChange} value={this.state.postcode} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="cityText" sm={2}>City</Label>
                        <Col sm={10}>
                            <Input type="text" name="city" id="cityText" onChange={this.handleChange} value={this.state.city} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="emailText" sm={2}>Email</Label>                    
                        <Col sm={10}>
                            <Input type="email" name="email" id="emailText" onChange={this.handleChange} value={this.state.email} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="phoneText" sm={2}>Phone</Label>
                        <Col sm={10}>                        
                            <Input type="text" name="phone" id="phoneText" onChange={this.handleChange} value={this.state.phone} />
                        </Col>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => this.saveCustomer()}>Add</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
            </Modal>
        </div>
        );
    }
}

export default Addcustomer;