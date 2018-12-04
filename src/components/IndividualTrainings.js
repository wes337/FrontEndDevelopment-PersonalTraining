import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Moment from "moment";

library.add(faCalendarAlt);

class IndividualTrainings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            trainings: []
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    getTrainings = (link) => {
        fetch(link)
          .then(response => response.json())
          .then(responseData => {
            this.setState({
              trainings: responseData.content
            });
          });
        this.toggle();
    };

    render() {
        let trainingRows = "";
        if (Object.keys(this.state.trainings).length === 1 &&  this.state.trainings[0].activity === undefined) {
            trainingRows = "This customer has no trainings.";
        } else {
            trainingRows = this.state.trainings.map((training, index) =>
                <tr key={index}>
                    <td>{Moment(training.date).format("DD MMM YYYY, hh:mmA")}</td>
                    <td>{training.activity}</td>
                    <td>{training.duration} minutes</td>
                </tr>
        )}
        return (
            <span>
                <Button outline color="success" onClick={()=>this.getTrainings(this.props.customer.links[2].href)}>
                        <FontAwesomeIcon icon="calendar-alt" />
                </Button>
                <Modal centered isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Schedule for {this.props.customer.firstname} {this.props.customer.lastname}</ModalHeader>
                <ModalBody>
                    <Table hover striped responsive>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Activity</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainingRows}
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>Close</Button>
                </ModalFooter>
                </Modal>
            </span>
        );
    }
}

export default IndividualTrainings;