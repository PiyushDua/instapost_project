import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SnackBarConsumer } from '../../contexts/SnackBarProvider/SnackBarProvider';

class AddPostDialog extends Component {
    state = {
        text: '',
        disabled: true,
    };

    handleChange = (field) => (event) => {
        this.setState({
            disabled: false,
            [field]: event.target.value
        });
        (event.target.value === '') 
        ? this.setState({ disabled: true })
        : this.setState({ disabled: false })
    };

    handleCancel = (openSnackbar) => {
        const { onClose } = this.props;
        onClose();
        openSnackbar('Post Cancelled', 'error');
        this.setState({ post: '' });
    };

    handleCreatePost = (openSnackbar) => {
        const { onClose, createPost } = this.props;
        onClose();
        const { text } = this.state;
        this.setState({ disabled: true });
        createPost({ variables: { text } }).then(response => {
            if (response.data.addPost) {
                openSnackbar('Post Successfully Created', 'success');
            } else {
                openSnackbar('Post Not Created', 'error');
            }
        });
    };

    render() {
        const { open, onClose } = this.props;
        const { disabled } = this.state;
        return (
            <div>
                <SnackBarConsumer>
                    {({ openSnackbar }) => (
                        <Dialog open={open} onClose={onClose}>
                            <DialogTitle>{"What's on your Mind?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <TextField
                                        id="filled-textarea"
                                        label="Start expressing"
                                        multiline
                                        onChange={this.handleChange('text')}
                                        fullWidth="true"
                                        margin="normal"
                                        variant="filled"
                                    />
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <div>
                                    <Button
                                        onClick={() => this.handleCancel(openSnackbar)}
                                        color="primary"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        color="primary"
                                        autoFocus
                                        disabled={disabled}
                                        onClick={() => this.handleCreatePost(openSnackbar)}
                                    >
                                        Post
                                    </Button>
                                </div>
                            </DialogActions>
                        </Dialog>
                    )}
                </SnackBarConsumer>
            </div>
        );
    }
};

export default AddPostDialog;

