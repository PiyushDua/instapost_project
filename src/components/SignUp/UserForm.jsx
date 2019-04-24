import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Success from './Success';

export class UserForm extends Component {
  state = {
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    mobilePhone: '',
    city: '',
    password: ''
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { firstName, lastName, email, mobilePhone, city,password } = this.state;
    const values = { firstName, lastName, email, mobilePhone, city,password };

    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormPersonalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Success values={values}/>
        );
      default:
        return (
          <p></p>
        );
    }
  }
}

export default UserForm;
