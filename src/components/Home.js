import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                <h1 className="display-3">Welcome!</h1>
                <p className="lead">This is a simple app created with React for a Personal Training Company. Begin by clicking the buttons above to view the customers and trainings available.</p>
                <hr className="my-2" />
                <p className="text-muted">Wesley Moses (a1703070) - Front End Development 2018</p>
                </Jumbotron>
            </div>
        );
    }
}

export default Home;