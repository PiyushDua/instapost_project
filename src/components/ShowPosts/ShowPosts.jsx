import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { MenuBar } from '../MenuBar';
import * as moment from 'moment';
import gql from 'graphql-tag';
import { ThemeContext } from '../../App';
import { Mutation } from 'react-apollo';

const styles = (theme) => ({
    card: {
        maxWidth: 400,
        margin: theme.spacing.unit * 5,
    },
    head: {
        fontSize: 20,
        textAlign: 'left',
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
})

const ADD_LIKES = gql`
  mutation($id: String!) {
    like(id: $id) {
      id
      createdBy
      text
      createdAt
      likes
      isLiked
    }
  }
`;

const ADD_DISLIKES = gql`
  mutation($id: String!) {
    dislike(id: $id) {
      id
      createdBy
      text
      createdAt
      likes
      isLiked
    }
  }
`;

class ShowPosts extends React.Component {
    state = {
        isLiked: false,
        color: 'grey',
        id: '',
    }

    componentDidMount() {
        const { subscribe } = this.props;
        subscribe();
    };

    getDate = (date) => {
        const defaultFormat = 'dddd, MMMM Do YYYY, h:mm:ss a';
        return (moment(date).format(defaultFormat));
    }

    getSortedData = (posts) => {
        posts.sort(function (a, b) {
            return (a.createdAt - b.createdAt);
        });
        return posts;
    }

    getFirstLetter = (name) => {
        return name.charAt(0).toUpperCase();
    };

    getName = (name) => {
        const firstName = name.split('.');
        return firstName[0];
    }

    handleLike = (like, id) => {
        like({ variables: { id } }).then(() => {
            this.setState({
                isLiked: true,
                id,
            })
        })
    }

    handleUnlike = (unlike, id) => {
        unlike({ variables: { id } }).then(() => {
            this.setState({
                isLiked: true,
                id,
            })
        })
    }

    render() {
        const { classes, data } = this.props;
        const newArray = this.getSortedData(data);
        return (
            newArray.map(post => (
                <ThemeContext.Consumer>
                    {user => (
                        <div>
                            <Mutation mutation={ADD_LIKES}>
                                {(like) => (
                                    <div align="center">
                                        <Card className={classes.card}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="Recipe" className={classes.avatar}>
                                                        {this.getFirstLetter(post.createdBy)}
                                                    </Avatar>
                                                }
                                                action={
                                                    (post.createdBy === user.email)
                                                        ? <MenuBar data={post} />
                                                        : ''
                                                }
                                                title={this.getName(post.createdBy)}
                                                subheader={this.getDate(post.createdAt)}
                                                className={classes.head}
                                            />
                                            <CardContent>
                                                <Typography variant="h6">{post.text}</Typography>
                                            </CardContent>
                                            <CardActions className={classes.actions} disableActionSpacing>
                                                <Mutation mutation={ADD_DISLIKES}>
                                                    {(dislike) => (
                                                        <IconButton aria-label="Add to favorites">
                                                            {
                                                                (post.likes.includes(user.email))
                                                                    ? <FavoriteIcon style={{ color: 'red' }} onClick={() => this.handleUnlike(dislike, post.id)} />
                                                                    : <FavoriteIcon style={{ color: 'grey' }} onClick={() => this.handleLike(like, post.id)} />
                                                            }
                                                        </IconButton>
                                                    )}
                                                </Mutation>
                                                {
                                                    (post.likes.length !== 0)
                                                        ? (post.likes.length === 1) 
                                                            ? `Liked by ${this.getName(user.name)}`
                                                            : `Liked by ${this.getName(post.likes[post.likes.length-1])} and ${post.likes.length-1} others`
                                                        : ''
                                                }
                                            </CardActions>
                                        </Card>
                                    </div>
                                )}
                            </Mutation>
                        </div>
                    )}
                </ThemeContext.Consumer>
            ))
        )
    }
}
ShowPosts.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ShowPosts);