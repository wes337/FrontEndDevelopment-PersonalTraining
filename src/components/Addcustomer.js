import React, { Component } from 'react';
import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

class Addcustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            visible: false,
            firstname: '',
            lastname: '',
            street: '',
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

    saveCustomer = () => {
        const customer = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            street: this.state.street,
            postcode: this.state.postcode,
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phone
        }
        this.props.saveCustomer(customer);
        this.setState({
            firstname: '',
            lastname: '',
            street: '',
            postcode: '',
            city: '',
            email: '',
            phone: ''         
        })
        this.toggle();
        this.setState({ visible: true });
    }

    render() {
        return (
        <div className="m-2">
            <Button color="primary" size="sm" onClick={this.toggle}>Add Customer</Button>
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
                        <Label for="streetText" sm={2}>Street</Label>
                        <Col sm={10}>
                            <Input type="text" name="street" id="streetText" onChange={this.handleChange} value={this.state.street} />
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
            <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss} className="Alert-bottom">
                Customer Added Successfully!
            </Alert>
        </div>
        );
    }
}

export default Addcustomer;