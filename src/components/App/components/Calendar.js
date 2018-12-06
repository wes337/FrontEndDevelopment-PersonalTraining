import React, { Component } from 'react';
import { NavLink, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import BigCalendar from 'react-big-calendar';
import Moment from 'moment';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Cal.css';

library.add(faCalendar);

const localizer = BigCalendar.momentLocalizer(Moment)

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            trainings: [],
            events: []
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
            this.createEvents();
            this.toggle();
        })
    }

    createEvents = () => {
        let trainings = this.state.trainings;
        let events = [];
        for (let i = 0; i < trainings.length; i++) {
          if (trainings[i].customer != null) {
            events[i] = {
              title: trainings[i].activity + " - " + trainings[i].customer.firstname + " " + trainings[i].customer.lastname,
              start: new Date(trainings[i].date),
              end: new Date(trainings[i].date + trainings[i].duration * 60000),
              allDay: false
            };
          }
        this.setState({ events: [...events] });
    }
    }
    render() {
        return (
            <div>
            <NavLink href="#" onClick={()=>this.listTrainings()}>
                <FontAwesomeIcon icon="calendar" /> Calendar
            </NavLink>
            <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Calendar</ModalHeader>
                <ModalBody>
                    <BigCalendar
                        popup
                        localizer={localizer}
                        events={this.state.events}
                        style={{height: "600px"}}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>Close</Button>
                </ModalFooter>
            </Modal>

          </div>
        );
    }
}

export default Calendar;