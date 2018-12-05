import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, NavLink } from 'reactstrap';
import Moment from 'moment';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

library.add(faDumbbell)

class Trainings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            trainings: [],
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    listTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(responseData => {
            this.setState({trainings: responseData})
        })
        this.toggle();
    }

    render() {
        const trainingRows = this.state.trainings.map((training, index) =>
            <tr key={index}>
                <td>{Moment(training.date).format("DD MMM YYYY, hh:mmA")}</td>
                <td>{training.activity ? training.activity : 'No description'}</td>
                <td>{training.duration ? training.duration : '0'} minutes</td>
                <td>{training.customer ? training.customer.firstname + ' ' + training.customer.lastname : 'No customer' }</td>
            </tr>
        )

        return (
            <div>
                <NavLink href="#" onClick={this.listTrainings}>
                    <FontAwesomeIcon icon="dumbbell"/> Trainings
                </NavLink>
                <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>All Trainings</ModalHeader>
                <ModalBody>
                    <Table hover striped responsive>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Activity</th>
                                <th>Duration</th>
                                <th>Customer</th>
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
            </div>
        );
    }
}

export default Trainings;