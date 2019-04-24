import { postService } from '../../services';
import { pubsub } from './subscription';

const Mutation = {
  addPost: async (parent: any, args: any, context: any) => {
    // console.log('inside addPost');
    const { text } = args;
    // console.log(text);
    const createdBy = await context.sub;
    // console.log('data', {text, createdBy});
    const newPost =  postService.createPost({ text, createdBy});
    pubsub.publish('NEW_POST', {newPost});
    return newPost;
  },
  dislike: async (parent: any, args: any, context: any) => {
    const sub = await context.sub;
    const { id } = args;
    return postService.dislike(id, sub);
  },
  like: async (parent: any, args: any, context: any) => {
    const sub = await context.sub;
    const { id } = args;
    console.log({ id, sub });
    return postService.like(id, sub);
  },
  updatePost: async (parent: any, args: any, context: any) => {
    const { id, text } = args;
    const updatedPost = postService.updatePost(id, text);
    pubsub.publish('NEW_POST', {newPost: updatedPost});
    return updatedPost;
  },
};

export default Mutation;
