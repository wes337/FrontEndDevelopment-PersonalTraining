import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Customerlist from './components/Customerlist.js';
import Trainingslist from './components/Trainingslist.js';
import Home from './components/Home.js';
import { Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <Container>
        <Row>
          <Col className="text-center m-2">
            <h1 className="display-5">Personal Training Company</h1>
            <Link to="/Customers/"><Button outline color="primary">Customers</Button></Link>{' '}
            <Link to="/Trainings/"><Button outline color="primary">Trainings</Button></Link> 
          </Col>
        </Row>
        <Row>
          <Col>
            <Route path="/" exact component={Home} />
            <Route path="/Customers/" component={Customerlist} />
            <Route path="/Trainings/" component={Trainingslist} />
          </Col>
        </Row>
      </Container>
    </Router>
    );
  }
}

export default App;
