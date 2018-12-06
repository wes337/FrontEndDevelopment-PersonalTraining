import React from 'react';

import { withAuthorization } from '../Session';
import App from '../App/App.js';

const HomePage = () => (
    <App />
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);