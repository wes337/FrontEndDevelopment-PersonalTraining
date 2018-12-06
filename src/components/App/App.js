import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddCustomer from './components/AddCustomer.js';
import Customer from './components/Customer.js';
import Trainings from './components/Trainings.js';
import Calendar from './components/Calendar.js';
import GenerateCustomer from './components/GenerateCustomer.js';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { Button, Alert, Container, Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Input, InputGroup, InputGroupAddon } from 'reactstrap';


class App extends Component {
  constructor(params) {
    super(params);
    this.state = {
        customers: [],
        customer: '',
        isOpen: false,
        visible: false,
        search: ""
    };
    this.toggle = this.toggle.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  toggle() {
    this.setState({
        isOpen: !this.state.isOpen
    });
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  listCustomers() {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(responseData => {
        this.setState({customers: responseData.content})
    })
  }

  componentDidMount() {
    this.listCustomers();
  }

  saveCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers',
    {method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(customer)
    })
    .then(response => {
        this.listCustomers();
        this.setState({ customer: customer, visible: true });
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
  }

  updateCustomer = (customer, link) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer)
    }).then(response => {
        this.listCustomers();
    });
  };

  searchCustomer = (text) => {
   
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    let filteredCustomers = this.state.customers.filter(
        (customer) => {
          return customer.firstname.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 
          || customer.lastname.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          || customer.email.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          || customer.phone.indexOf(this.state.search) !== -1;
        }
    );
    return (
      <Container>
        <Row className="my-2">
          <Col>
          <Navbar color="light" light expand="md" fixed="top" className="shadow-sm">
              <NavbarBrand className="display-4">Personal Training Company</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <AddCustomer saveCustomer={this.saveCustomer} />
                  </NavItem>
                  <NavItem>
                    <Trainings />
                  </NavItem>
                  <NavItem>
                    <Calendar />
                  </NavItem>
                  <NavItem className="ml-3">
                    <InputGroup>
                      <Input placeholder="Search" name="search" id="search" onChange={this.handleChange} value={this.state.search} />
                      <InputGroupAddon addonType="append">Search</InputGroupAddon>
                    </InputGroup>
                  </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink>
                      <SignOutButton />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink>
                      <Link to={ROUTES.ACCOUNT}><Button outline color="primary" size="sm">Account</Button></Link>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </Col>
        </Row>
        <Row className="mt-4 mb-3">
            <Col xs="auto" className="mx-auto mt-2">
              <GenerateCustomer saveCustomer={this.saveCustomer} />
            </Col>
          </Row>
        <Row>
          <Col>
            <Customer customers={filteredCustomers} deleteCustomer={this.deleteCustomer} updateCustomer={this.updateCustomer} /> 
          </Col>
        </Row>       
        <Alert className="fixed-bottom text-center" color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
          {this.state.customer.firstname} {this.state.customer.lastname} added successfully!
        </Alert>
      </Container>
    );
  }
}

export default App;
