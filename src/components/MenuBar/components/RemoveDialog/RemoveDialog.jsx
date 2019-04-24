import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { SnackBarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';

const styles = theme => ({
  textField: {
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

const DELETE_POST = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
      id
      createdBy
      text
      createdAt
      likes
      isLiked
    }
  }
`;

class RemoveDialog extends Component {
  handleRemovePost = (deletePost, openSnackbar) => {
    const { data, onClose, onMenuClose } = this.props;
    const { id } = data;
    deletePost({ variables: { id } }).then(response => {
      if (response.data.deletePost) {
        openSnackbar('Post Successfully Deleted', 'success');
        onClose();
        onMenuClose();
      } else {
        openSnackbar('Error in Deleting the Post', 'error');
        onClose();
        onMenuClose();
      }
    });
  };

  handleCancel = () => {
    const { onClose, onMenuClose } = this.props;
    onClose();
    onMenuClose();
  };

  render() {
    const {
      onClose,
      open,
    } = this.props;

    return (
      <Mutation mutation={DELETE_POST}>
        {(deletePost) => (
          <Dialog
            open={open}
            fullWidth
            maxWidth="md"
            onClose={onClose}
          >
            <DialogTitle>Remove POST</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Do you really want to remove this post?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={() => this.handleCancel()} color="default">
                Cancel
            </Button>
              <SnackBarConsumer>
                {({ openSnackbar }) => (
                  <Button
                    variant="contained"
                    onClick={() => this.handleRemovePost(deletePost, openSnackbar)}
                    color="primary"
                    autoFocus
                  >
                    Delete
                  </Button>
                )}
              </SnackBarConsumer>
            </DialogActions>
          </Dialog>
        )}
      </Mutation>
    );
  };
}

const propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  classes: PropTypes.objectOf.isRequired,
};

const defaultProps = {
  open: false,
  onSubmit: () => { },
};

RemoveDialog.propTypes = propTypes;
RemoveDialog.defaultProps = defaultProps;
export default withStyles(styles)(RemoveDialog);
