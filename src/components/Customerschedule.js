import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPlus, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
library.add(faTrash, faPlus, faCalendarAlt);

class Customerschedule extends Component {
    render() {
        return (
            <div className="text-center">
                <Button outline color="warning" size="sm" onClick={this.toggle}><FontAwesomeIcon icon="calendar-alt" /></Button>
            </div>
        );
    }
}

export default Customerschedule;