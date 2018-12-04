import React, { Component } from 'react';
import UpdateCustomer from './UpdateCustomer.js';
import IndividualTrainings from './IndividualTrainings.js';
import AddTraining from './AddTraining.js';
import { Card, Button, CardImg, CardTitle, CardText, CardColumns, CardSubtitle, CardBody, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCalendarAlt, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faCalendarAlt, faPlus, faEdit);

class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: '',
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: '',
            modal: false
        };
        this.toggle = this.toggle.bind(this);
        this.rImages = [
            require('./img/1.png'),
            require('./img/2.png'),
            require('./img/3.png'),
            require('./img/4.png'),
            require('./img/5.png')
        ]
    }

    setCustomer = (customer) => {
        this.setState({ customer: customer });
        this.toggle();
    };

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    deleteCustomer = () => {
        this.props.deleteCustomer(this.state.customer.links[0].href)
        this.toggle();
    }

    getRandImg = () => {
        const randomInt = Math.floor(Math.random() * this.rImages.length)
        const rImage = this.rImages[randomInt]
        return rImage;
    }

    render() {
        return (
            <CardColumns>
            {this.props.customers.map((item, index) =>
                <Card key={index} className="shadow-sm">
                    <CardBody>
                        <CardImg src={this.getRandImg()} style={{width: "75px", height: "75px"}} className="rounded-circle float-right shadow" alt="Avatar" />
                        <CardTitle>{item.firstname} {item.lastname}</CardTitle>
                        <hr className="w-50 ml-0" />
                        <CardSubtitle>Email: {item.email}<br />Phone: {item.phone}</CardSubtitle>
                        <CardText>
                            {item.streetaddress}, {item.city} {item.postcode}
                        </CardText>


                        <AddTraining customer={item} />{' '}

                        <IndividualTrainings customer={item} />{' '}
                        
                        <UpdateCustomer updateCustomer={this.props.updateCustomer} customer={item} />{' '}

                        <Button outline color="danger" onClick={()=>this.setCustomer(item)}>
                            <FontAwesomeIcon icon="trash" />
                        </Button>
                    </CardBody>
                </Card>
            )}
                <Modal centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Delete Customer</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete {this.state.customer.firstname} {this.state.customer.lastname}?
                    </ModalBody>
                    <ModalFooter>
                    <Button color="danger" onClick={this.deleteCustomer}>Delete</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </CardColumns>
        );
    }
}

export default Customer;