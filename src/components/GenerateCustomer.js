import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Chance from 'chance';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faUser);

class GenerateCustomer extends Component {
    
    generateCustomer = () => {
        var chance = new Chance();
        const customer = {
            firstname: chance.first(),
            lastname: chance.last(),
            streetaddress: chance.street(),
            postcode: chance.zip(),
            city: chance.city(),
            email: chance.email(),
            phone: chance.phone({ country: 'uk', mobile: true })
        }
        this.props.saveCustomer(customer);
    }

    render() {
        return (
            <div>
                <Button outline color="info" onClick={()=>this.generateCustomer()}>
                    <FontAwesomeIcon icon="user" /> Generate Customer
                </Button>
            </div>
        );
    }
}

export default GenerateCustomer;