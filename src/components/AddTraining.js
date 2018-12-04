import React, { Component } from 'react';
import { Form, FormGroup, Col, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus);

class AddTraining extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            date: '',
            activity: '',
            duration: ''
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    saveTraining = () => {
        const training = {
            date: this.state.date,
            activity: this.state.activity,
            duration: this.state.duration,
            customer: this.props.customer.links[0].href
          };
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(training)
        });
        this.setState({
            date: "",
            activity: "",
            duration: ""
        });
            this.toggle();
    };

    render() {
        return (
            <span>
                <Button outline color="primary" onClick={this.toggle}>
                    <FontAwesomeIcon icon="plus" />
                </Button>
                <Modal centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Training for {this.props.customer.firstname} {this.props.customer.lastname}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={5} for="date">Date</Label>
                                <Col sm={7}>
                                    <Input type="date" name="date" id="date" onChange={this.handleChange} value={this.state.date} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={5} for="activity">Activity</Label>
                                <Col sm={7}>
                                    <Input type="text" name="activity" id="activity" onChange={this.handleChange} value={this.state.activity} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={5} for="duration">Duration <small>(minutes)</small></Label>
                                <Col sm={7}>
                                    <Input type="number" name="duration" id="duration" onChange={this.handleChange} value={this.state.duration} />
                                </Col>
                            </FormGroup>
                        </Form>  
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.saveTraining}>Add</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </span>
        );
    }
}

export default AddTraining;