import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { AddPostDialog } from '../AddPostDialog';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { ShowPosts } from '../ShowPosts';

const GET_POSTS = gql`
  query {
    getPosts {
        id
        createdBy
        text
        createdAt
        likes
        isLiked
    }
  }
`;
const POST_SUBSCRIPTION = gql`
  subscription {
    newPost {
      id
      createdBy
      text
      createdAt
      likes
      isLiked
    }
  }
`;

const ADD_POST = gql`
  mutation($text: String!) {
    addPost(text: $text) {
      id
      createdBy
      text
      createdAt
      likes
      isLiked
    }
  }
`;


class PostsDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => () => {
    this.setState({
      open: false,
    });
  };

  subscribePost = (subscribeToMore) => {
    subscribeToMore({
      document: POST_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newData = subscriptionData.data.newPost;
        console.log('------------', newData, prev);
        if(prev.getPosts.length !== 0 && prev.getPosts[0].id === newData.id) {
          return prev;
        } else {
          const data = Object.assign({}, prev, {
            getPosts: [newData, ...prev.getPosts]
          });
          return data;
        }
      },
    });
  };

  render() {
    const { open } = this.state;
    return (
      <div align="center">
        <Query query={GET_POSTS}>
          {({ subscribeToMore, loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            const postRecord = data.getPosts;
            return (
              <div>
                <Mutation mutation={ADD_POST}>
                  {(addPost) => (
                    <div>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => this.handleClickOpen()}
                      >
                        Click here to post
                    </Button>
                      <AddPostDialog open={open} onClose={this.handleClose()} createPost={addPost} />
                    </div>
                  )}
                </Mutation>
                <ShowPosts data={postRecord} subscribe={() => this.subscribePost(subscribeToMore)} />
              </div>
            )
          }}
        </Query>
      </div>
    );
  }
}

PostsDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

export default PostsDialog;
