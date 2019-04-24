import { VersionableRepository } from '../versionable';
import { Post } from './PostModel';

class PostRepository extends VersionableRepository {
  constructor() {
    super(Post);
  }

  public async createPost(data: any) {
    return await super.create(data);
  }

  public async readOnePost(id: any) {
    return await super.readOne(id);
  }

  public async readPosts() {
    return await super.read();
  }

  public async deletePost(id: any) {
    return await super.delete(id);
  }

  public async updatePost(id: any, dataToUpdate: any) {
    return await super.update(id, dataToUpdate);
  }

  public async findPostsByQuery(data: any) {
    data.deletedAt = undefined;
    return await super.findByQuery(data);
  }

  public async like(id: string, likedBy: string) {
    try {
      console.log({id, likedBy});
      console.log('Inside like(repo) pre');
      const { n } = await Post.updateOne({
        deletedAt: undefined,
        originalId: id,
      }, {
        $push: {
          likes: likedBy,
        },
      });
      if (n === 1) {
        const likedPost = await this.readOnePost(id);
        console.log('PostRepository.ts [ likedPost ]', likedPost);
        return likedPost;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async dislike(id: string, likedBy: string) {
    try {
      console.log({id, likedBy});
      console.log('Inside like(repo) pre');
      const { n } = await Post.updateOne({
        deletedAt: undefined,
        originalId: id,
      }, {
        $pull: {
          likes: likedBy,
        },
      });
      if (n === 1) {
        const dislikedPost = await this.readOnePost(id);
        console.log('PostRepository.ts [ ================== dislikedPost ]', dislikedPost);
        return dislikedPost;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

}

export default new PostRepository();
