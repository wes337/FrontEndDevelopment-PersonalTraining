import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import Addparticipants from './Addparticipants.js';


class Trainingslist extends Component {
    constructor(params) {
        super(params);
        this.state = {
            trainings: [],
            customers: []
        };
    }

    listTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(responseData => {
            this.setState({trainings: responseData.content})
        })
    }

    componentDidMount() {
        this.listTrainings();
    }

    render() {
        const columns = [{
            Header: 'Date',
            accessor: 'date',
            Cell: row => (
                <span>
                    {moment(row.value).format("DD MMM YYYY")}
                </span>
            )
        }, {
            Header: 'Activity',
            accessor: 'activity'
        }, {
            Header: 'Duration',
            accessor: 'duration'
        }, {
            Header: 'Participants',
            accessor: '',
            filterable: false,
            sortable: false,
            Cell: ({row, value}) => (
                <div>
                    <Addparticipants />
                </div>
            )
        }]
        return (
            <div>
                <ReactTable 
                data={this.state.trainings}
                columns={columns}
                sortable={true}
                filterable defaultFilterMethod={this.filterMethod}
                defaultPageSize={10}
                />
            </div>
        );
    }
}

export default Trainingslist;