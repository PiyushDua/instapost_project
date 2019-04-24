import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { SnackBarConsumer } from '../../contexts/SnackBarProvider/SnackBarProvider';

const ADD_USER = gql`
  mutation($data: IData) {
    addUser(data: $data) {
      profile {
        firstName
        lastName
        email
        mobilePhone
      }
    }
  }
`;

export class FormPersonalDetails extends Component {
  constructor(props) {
    super(props);
    const { values } = this.props;
    const { email } = values;
    this.state = {
      login: email
    }
  }

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };


  handleContinue = (event, addUser, openSnackbar) => {
    const { values } = this.props;
    const { firstName, lastName, email, mobilePhone, password } = values;
    const { login } = this.state;
    addUser({
      variables: {
        data: {
          firstName,
          lastName,
          email,
          login,
          mobilePhone,
          password,
        }
      }
    }).then(response => {
      this.continue(event);
      if (response.data.addUser) {
        openSnackbar('User Successfully Created', 'success');
      } else {
        openSnackbar('User Not Created', 'error');
      }
    })
  }

  render() {
    const { values, handleChange } = this.props;
    return (
      <SnackBarConsumer>
        {({ openSnackbar }) => (
          <Mutation mutation={ADD_USER}>
            {(addUser) => (
              <MuiThemeProvider>
                <div align="center">
                  <AppBar position="static" >
                    <Typography variant="h6" color="inherit" align="center">
                      Enter Personal Details
                </Typography>
                  </AppBar>
                  <TextField
                    label="Enter Your password"
                    id="password"
                    type="password"
                    onChange={handleChange('password')}
                    value={values.password}
                  />
                  <br />
                  <TextField
                    label="Enter Your City"
                    id="City"
                    onChange={handleChange('city')}
                    value={values.city}
                  />
                  <br />
                  <TextField
                    label="Enter Your Phone Number"
                    id="mobilePhone"
                    onChange={handleChange('mobilePhone')}
                    value={values.mobilePhone}
                  />
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => this.handleContinue(event, addUser, openSnackbar)}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={styles.button}
                    onClick={this.back}
                  >
                    Back
                  </Button>
                </div>
              </MuiThemeProvider>
            )}
          </Mutation>
        )}
      </SnackBarConsumer>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
};

export default FormPersonalDetails;
