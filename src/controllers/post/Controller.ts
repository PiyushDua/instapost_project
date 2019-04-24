import { NextFunction, Request, Response } from 'express';
import postRepo from '../../repositories/post/PostRepository';

class PostClass {
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      // tslint:disable-next-line: no-shadowed-variable
      const post = await postRepo.readOnePost(id);
      res.send(post);
    } catch (err) {
      return next({ error: 'Bad Request', status: 400 });
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('pre-get-postcontroller');
      const { limit, skip } = req.query;
      const query = {
        limit,
        skip,
      };
      const posts = await postRepo.findPostsByQuery(query);
      posts.totalPosts = posts.length;
      res.send(posts);
    } catch (error) {
      return next({ error: error.message, status: 400 });
    }
  }

  public async post(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('pre-postendpoint-post service');
      const { text, createdBy } = req.body.post;
      console.log({text, createdBy});
      const newPost = await postRepo.createPost({
        createdBy,
        text,
      });
      console.log(newPost);
      res.send(newPost);
    } catch (error) {
      return next({ error: error.message, status: 400 });
    }
  }

  public async like(req: any, res: any, next: any) {
    try {
      console.log('Inside like(controller) pre');
      console.log(req.body);
      const { id, likedBy } = req.body;
      const likedPost = await postRepo.like(id, likedBy);
      console.log('Controller.ts [likedPost]', likedPost);
      res.send(likedPost);
    } catch ( error ) {
      return next({ error: error.message, status: 400 });
    }
  }
  public async dislike(req: any, res: any, next: any) {
    try {
      console.log('Inside like(controller) pre');
      console.log(req.body);
      const { id, likedBy } = req.body;
      const dislikedPost = await postRepo.dislike(id, likedBy);
      console.log('Controller.ts [dislikedPost]', dislikedPost);
      res.send(dislikedPost);
    } catch ( error ) {
      return next({ error: error.message, status: 400 });
    }
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, dataToUpdate } = req.body;
      // // check permission
      // const user = req.header('Authorization');
      const updatedPost = await postRepo.updatePost(id, dataToUpdate);
      res.send(updatedPost);
    } catch (error) {
      return next({ error: error.message, status: 400 });
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedPost = await postRepo.deletePost(id);
      res.send(deletedPost);
    } catch (error) {
      return next({ error: error.message, status: 400 });
    }
  }
}

const post = new PostClass();

export default post;
