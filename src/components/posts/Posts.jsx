import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PostsDialog from './PostsDialog';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function Posts(props) {
  const { classes } = props;
  return (
    <div align="center">
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          What's on your Mind ?
        </Typography>
        <Typography component="p">
          <PostsDialog />
        </Typography>
      </Paper>
    </div>
  );
}

Posts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Posts);