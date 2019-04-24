import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Person from '@material-ui/icons/Person';
import TextField from '@material-ui/core/TextField';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { SnackBarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';

const styles = theme => ({
  field: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
  spinner: {
    position: 'absolute',
  }
});

const UPDATE_POST = gql`
  mutation($id: String!, $text: String!) {
    updatePost(id: $id, text: $text) {
      id
      createdBy
      text
      createdAt
      likes
      isLiked
    }
  }
`;

class EditDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      disabled: true,
    };
  }

  handleSubmit = () => {
    const { name, email } = this.state;
    const { onSubmit } = this.props;
    onSubmit({ name, email });
  }

  handleEditPost = (updatePost, openSnackbar) => {
    const { data, onClose, onMenuClose } = this.props;
    const { id } = data;
    const { text } = this.state;
    updatePost({ variables: { id, text } }).then(response => {
      if (response.data.updatePost) {
        openSnackbar('Post Successfully Updated', 'success');
        onClose();
        onMenuClose();
      } else {
        openSnackbar('Post Not Updated', 'error');
        onClose();
        onMenuClose();
      }
    });
    this.setState({ disabled: true });
  }

  handleOnChange = (field) => (event) => {
    const { data } = this.props;
    this.setState({
      disabled: false,
      [field]: event.target.value
    });
    (event.target.value === data.text)
      ? this.setState({ disabled: true })
      : this.setState({ disabled: false })
  };

  handleCancel = () => {
    const { onClose, onMenuClose } = this.props;
    onClose();
    onMenuClose();
  }

  render() {
    const {
      classes,
      onClose,
      data,
      open,
    } = this.props;
    const { disabled } = this.state;
    return (
      <Mutation mutation={UPDATE_POST}>
        {(updatePost) => (
          <div>
            <Dialog
              open={open}
              fullWidth
              maxWidth="md"
              onClose={onClose}
            >
              <DialogTitle>Edit POST</DialogTitle>
              <DialogContent>
                <List>
                  <ListItem>
                    <TextField
                      label="Post"
                      className={classes.field}
                      defaultValue={data.text}
                      onChange={this.handleOnChange('text')}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </ListItem>
                </List>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={() => this.handleCancel()} color="default">
                  Cancel
                </Button>
                <SnackBarConsumer>
                  {({ openSnackbar }) => (
                    <Button
                      variant="contained"
                      disabled={disabled}
                      onClick={() => this.handleEditPost(updatePost, openSnackbar)}
                      color="primary"
                      autoFocus
                    >
                      Submit
                    </Button>
                  )}
                </SnackBarConsumer>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </Mutation>
    );
  }
}

const propTypes = {
  edit: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  Name: PropTypes.string.isRequired,
  Email: PropTypes.string.isRequired,
  data: PropTypes.objectOf.isRequired,
  classes: PropTypes.objectOf.isRequired,
};

const defaultProps = {
  edit: false,
  onSubmit: () => { },
};

EditDialog.propTypes = propTypes;
EditDialog.defaultProps = defaultProps;
export default withStyles(styles)(EditDialog);
