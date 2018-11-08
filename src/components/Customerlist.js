import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Customerlist extends Component {
    constructor(params) {
        super(params);
        this.state = {customers: []};
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
        }]
        return (
            <div>
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