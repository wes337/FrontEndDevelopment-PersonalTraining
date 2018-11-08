import React, { Component } from 'react';
import ReactTable from 'react-table';
import Addcustomer from './Addcustomer.js';
import 'react-table/react-table.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

class Customerlist extends Component {
    constructor(params) {
        super(params);
        this.state = {
            customers: [],
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    listCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(responseData => {
            this.setState({customers: responseData.content})
        })
    }

    componentDidMount() {
        this.listCustomers();
    }

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
        })
        .catch(err => {
            console.error(err);
        })
    }

    deleteCustomer = (link) => {
        fetch(link, {method: 'DELETE'})
        .then(response => {
            this.listCustomers();
        })
        this.toggle();
    }

    render() {
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
            Cell: ({row, value}) => (
                <div className="text-center">
                    <Button outline color="danger" size="sm" onClick={this.toggle}><FontAwesomeIcon icon="trash" /></Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={false} centered>
                    <ModalHeader toggle={this.toggle} className="bg-danger text-white">Delete Customer</ModalHeader>
                        <ModalBody>
                            Are you sure?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={()=> this.deleteCustomer(value)}>Delete</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
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
            </div>
        );
    }
}

export default Customerlist;