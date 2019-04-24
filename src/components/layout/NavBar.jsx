import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { UserForm } from '../SignUp';

const styles = {
  root: {
    marginBottom: '10px',
  },
  grow: {
    flexGrow: 1,
  },
};

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      signup: false,
    };
  }

  handleSignUp = () => {
    this.setState({
        signup: true,
    })
  }

  render() {
    const { classes, login } = this.props;
    const { signup } = this.state;
    console.log('props', this.props);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4 " color="inherit" className={classes.grow}>
              Welcome To Instapost : Connecting People
              </Typography>
            <Button color="inherit" onClick={() => login()}>LOGIN</Button>
            <Button color="inherit" onClick={this.handleSignUp}>Sign Up</Button>
          </Toolbar>
        </AppBar>
        {
          signup ? <UserForm /> : ''
        }
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(Navbar);