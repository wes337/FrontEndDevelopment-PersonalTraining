import React from 'react';

import { SignInForm } from '../SignIn';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';

const Landing = () => (
    <div className="logincontainer">
        <h1 className="display-1 py-3">Personal Training Company</h1>
        <hr className="w-50 py-3" />
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
    </div>
);

export default Landing;