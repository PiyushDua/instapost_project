
import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
export class Success extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  refreshPage = () => {
    window.location.reload();
  }

  render() {
    return (
          <MuiThemeProvider>
            <React.Fragment>
              <AppBar position="static">
                <Typography variant="h6" color="inherit" align="center">
                  Thank You For Your Submission !
                </Typography>
              </AppBar>
              <Typography variant="h6" color="inherit" align="center">
                You are successfully registered
              </Typography>
              <Link
                component={RouterLink}
                to="/"
                color="inherit"
                underline="none"
                onClick={this.refreshPage}
              >
                <Typography color="inherit" align="center">
                  Click Here to go back to Homepage !
                </Typography>
              </Link>
            </React.Fragment>
          </MuiThemeProvider>
    );
  }
}

export default Success;
