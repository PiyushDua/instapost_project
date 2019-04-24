import { Model, model } from 'mongoose';
import IPostModel from './IPostModel';
import PostSchema from './PostSchema';

// interface IUserModel extends mongoose.Document {}

const postSchema = new PostSchema({
  collection: 'posts',

  toJSON: {
    transform: (doc: any, ret: any) => {
      ret.id = ret.originalId;
    },
  },

  toObject: {
    transform: (doc: any, ret: any) => {
      ret.id = ret.originalId;
    },
  },
});

export const Post: Model<IPostModel> = model<IPostModel>('Post', postSchema);
