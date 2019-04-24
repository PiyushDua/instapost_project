import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export class FormUserDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <div align="center">
          <AppBar position="static" >
          <Typography variant="h6" color="inherit" align="center">
             Hi, Create an account
          </Typography>
          </AppBar>
          <TextField
            label="Enter Your First Name"
            id="First Name"
            onChange={handleChange('firstName')}
            value={values.firstName}
          />
          <br />
          <TextField
            label="Enter Your Last Name"
            id="Last Name"
            onChange={handleChange('lastName')}
            value={values.lastName}
          />
          <br />
          <TextField
            label="Enter Your Email"
            id="Email"
            onChange={handleChange('email')}
            value={values.email}
          />
          <br />
          <Button
            variant="contained" 
            color="primary"
            style={styles.button}
            onClick={this.continue}
          >
          Click here to continue
          </Button>
        </div>
      </MuiThemeProvider>
    );
  }
}

const styles  = {
  button: {
    margin: 15
  }
};

export default FormUserDetails;
