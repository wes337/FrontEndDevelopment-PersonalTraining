import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus);

class Addparticipants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
        modal: !this.state.modal
        });
    }

    render() {
        return (
            <div className="text-center">
                <Button color="primary" size="sm" onClick={this.toggle}><FontAwesomeIcon icon="plus" /> Add Participants</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} size='lg'>
                    <ModalHeader toggle={this.toggle}>Add Participants</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleSelectMulti">Select Multiple</Label>
                                    <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
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