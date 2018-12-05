import React, { Component } from 'react';
import { Alert, Form, FormGroup, Col, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons';

library.add(faEdit);

class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            visible: false,
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: ''
        };

        this.toggle = this.toggle.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    setCustomer = () => {
        this.setState({
            firstname: this.props.customer.firstname,
            lastname: this.props.customer.lastname,
            streetaddress: this.props.customer.streetaddress,
            postcode: this.props.customer.postcode,
            city: this.props.customer.city,
            email: this.props.customer.email,
            phone: this.props.customer.phone
        });
        this.toggle();
    }

    updateCustomer = (link) => {
        const customer = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            streetaddress: this.state.streetaddress,
            postcode: this.state.postcode,
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phone
        }
        this.props.updateCustomer(customer, link)
        this.toggle();
        this.setState({ visible: true });
    };

    render() {
        return (
            <span>
            <Button outline color="warning" onClick={this.setCustomer}>
                <FontAwesomeIcon icon="edit" /> 
            </Button>
            <Modal centered isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Edit {this.props.customer.firstname} {this.props.customer.lastname}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup row>
                        <Label sm={3} for="firstName">First Name</Label>
                        <Col sm={9}>
                            <Input type="text" name="firstname" id="firstName" onChange={this.handleChange} value={this.state.firstname} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3} for="lastName">Last Name</Label>
                        <Col sm={9}>
                            <Input type="text" name="lastname" id="lastName" onChange={this.handleChange} value={this.state.lastname} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3} for="streetaddressText">Street</Label>
                        <Col sm={9}>
                            <Input type="text" name="streetaddress" id="streetaddressText" onChange={this.handleChange} value={this.state.streetaddress} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3} for="postcodeText">Post Code</Label>
                        <Col sm={9}>
                            <Input type="text" name="postcode" id="postcodeText" onChange={this.handleChange} value={this.state.postcode} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3} for="cityText">City</Label>
                        <Col sm={9}>
                            <Input type="text" name="city" id="cityText" onChange={this.handleChange} value={this.state.city} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3} for="emailText">Email</Label>                    
                        <Col sm={9}>
                            <Input type="email" name="email" id="emailText" onChange={this.handleChange} value={this.state.email} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={3} for="phoneText">Phone</Label>
                        <Col sm={9}>                        
                            <Input type="text" name="phone" id="phoneText" onChange={this.handleChange} value={this.state.phone} />
                        </Col>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="warning" onClick={() => this.updateCustomer(this.props.customer.links[0].href)}>Edit</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
            </Modal>
            <Alert className="fixed-bottom text-center" color="warning" isOpen={this.state.visible} toggle={this.onDismiss}>
                {this.props.customer.firstname} {this.props.customer.lastname} edited successfully!
            </Alert>
            </span>
        );
    }
}

export default AddCustomer;