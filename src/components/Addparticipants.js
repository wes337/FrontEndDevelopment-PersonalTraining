import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';


library.add(faPlus);

class Addparticipants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            trainings: []
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(responseData => {
            this.setState({trainings: responseData.content})
        })
    }

    toggle() {
        this.setState({
        modal: !this.state.modal
        });
    }

    render() {
        return (
            <div className="text-center">
                <Button outline color="primary" size="sm" onClick={this.toggle}><FontAwesomeIcon icon="plus" /></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} size='lg'>
                    <ModalHeader toggle={this.toggle}>Add Training</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleSelectMulti">Select Multiple</Label>
                                    <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                                    {this.state.trainings.map((training, index) =>
                                        <option key={index}>{training.activity} ({moment(training.date).format("DD MMM YYYY")})</option>
                                    )}                                    
                                    </Input>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter className="text-center">
                            <Button color="success">Save</Button>
                        </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Addparticipants;