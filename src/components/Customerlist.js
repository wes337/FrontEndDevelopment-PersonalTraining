import React, { Component } from 'react';
import ReactTable from 'react-table';
import Addcustomer from './Addcustomer.js';
import 'react-table/react-table.css';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCalendarAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import moment from 'moment';

library.add(faTrash, faCalendarAlt, faPlus);

class Customerlist extends Component {
    constructor(params) {
        super(params);
        this.state = {
            customers: [],
            customer: "",
            date: "",
            activity: "",
            duration: "",
            trainings: [],
            modal: false,
            modal2: false,
            visible: false,
            deletevisible: false,
        };
        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this); 
        this.onDismiss = this.onDismiss.bind(this);
    }

    componentDidMount() {
        this.listCustomers();
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    // Modal Toggles (is there a better way to do this?)

    toggle() {this.toggle = this.toggle.bind(this);
        this.setState({
          modal: !this.state.modal
        });
    }

    toggle2() {this.toggle2 = this.toggle2.bind(this);
        this.setState({
          modal2: !this.state.modal2
        });
    }

    // ------------------------ //

    onDismiss() {
        this.setState({ visible: false, deletevisible: false });
    }

    listCustomers() {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(responseData => {
            this.setState({customers: responseData.content})
        })
    }

    listTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(responseData => {
            this.setState({trainings: responseData.content})
        })
    }

    getTrainings = (link) => {
        fetch(link)
        .then(response => response.json())
        .then(responseData => {
            this.setState({
                trainings: responseData.content
            })
        })
        this.toggle();
    }

    setCustomer = (customer) => {
        this.setState({ customer: customer });
        this.listTrainings();
        this.toggle2();
    };

    filterMethod = (filter, row, column) => {
        const id = filter.pivotId || filter.id
        return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
    }

    saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(customer)
        })
        .then(response => {
            this.listCustomers();
            this.setState({ visible: true });
        })
        .catch(err => {
            console.error(err);
        })
    }


    saveTraining = () => {
    const training = {
        date: this.state.date,
        activity: this.state.activity,
        duration: this.state.duration,
        customer: this.state.customer
      };
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(training)
        });
        this.toggle2();
    };

    deleteCustomer = (link) => {
        fetch(link, {method: 'DELETE'})
        .then(response => {
            this.listCustomers();
            this.setState({ deletevisible: true })
        })
    }

    render() {
        const individualTrainingColumns = [
            {
              Header: "Date and time",
              accessor: "date",
              Cell: ({ value }) => moment(value).format("MMM Do YYYY, h:mm a")
            },
            {
              Header: "Duration (in minutes)",
              accessor: "duration"
            },
            {
              Header: "Activity",
              accessor: "activity"
            }
        ];
        const columns = [{
            Header: 'Name',
            columns: [
            {
                Header: 'First Name',
                accessor: 'firstname'
            }, {
                Header: 'Last Name',
                accessor: 'lastname'
            }]
        }, {
            Header: 'Address',
            columns: [
            {
                Header: 'Street',
                accessor: 'streetaddress'
            }, {
                Header: 'Post Code',
                accessor: 'postcode'
            }, {
                Header: 'City',
                accessor: 'city'
            }]
        }, {
            Header: 'Contact',
            columns: [
                {
                Header: 'Email',
                accessor: 'email'
            }, {
                Header: 'Phone',
                accessor: 'phone'
            }]
        }, {
            Header: '',
            accessor: 'links.0.href',
            filterable: false,
            sortable: false,
            Cell: ({value}) => (
                <div className="text-center">
                    <Button outline color="primary" size="sm" onClick={() => this.setCustomer(value)}>
                        <FontAwesomeIcon icon="plus" />
                    </Button> 
                </div>
            )
        }, {
            Header: '',
            accessor: 'links.2.href',
            filterable: false,
            sortable: false,
            Cell: ({value}) => (
                <div className="text-center">
                    <Button outline color="warning" size="sm" onClick={() => this.getTrainings(value)}><FontAwesomeIcon icon="calendar-alt" />
                    </Button>             
                </div>
            )            
        }, {
            Header: '',
            accessor: 'links.0.href',
            filterable: false,
            sortable: false,
            Cell: ({row, value}) => (
                <div className="text-center">
                    <Button outline color="danger" size="sm"
                    onClick={() => {
                    if (
                        window.confirm(
                        "Are you sure you want to delete " + row.firstname + " " + row.lastname + "?"
                        )
                    )
                        this.deleteCustomer(value);
                    }}
                    ><FontAwesomeIcon icon="trash" /></Button>
                </div>
                
            )
        }]
        return (
            <div>
                <Addcustomer saveCustomer={this.saveCustomer}/>
                <ReactTable 
                data={this.state.customers}
                columns={columns}
                sortable={true}
                filterable defaultFilterMethod={this.filterMethod}
                defaultPageSize={10}
                />
                <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss} className="fixed-bottom">
                    Customer Added Successfully!
                </Alert>
                <Alert color="success" isOpen={this.state.deletevisible} toggle={this.onDismiss} className="fixed-bottom">
                    Customer Deleted Successfully!
                </Alert>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}><h3>Individual training sessions</h3></ModalHeader>
                <ModalBody>
                    <ReactTable
                        filtselectMultierable={false}
                        resizable={false}
                        defaultPageSize={10}
                        data={this.state.trainings}
                        columns={individualTrainingColumns}
                        showPagination={false}
                    />  
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modal2} toggle={this.toggle2} className={this.props.className}>
                <ModalHeader toggle={this.toggle2}><h3>Add Training</h3></ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="date">Date</Label>
                            <Input type="date" name="date" id="date" onChange={this.handleChange} value={this.state.date} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="activity">Activity</Label>
                            <Input type="text" name="activity" id="activity" onChange={this.handleChange} value={this.state.activity} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="duration">Duration (minutes)</Label>
                            <Input type="text" name="duration" id="duration" onChange={this.handleChange} value={this.state.duration} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.saveTraining}>Add</Button>{' '}
                    <Button color="secondary" onClick={this.toggle2}>Cancel</Button>
                </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Customerlist;