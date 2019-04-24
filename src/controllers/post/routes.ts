import * as express from 'express';
import post from './Controller';

const router = express.Router();

router
  .get(
    '/:id',
    post.getById,
  )
  .get(
    '/',
    post.get,
  )
  .post(
    '/',
    post.post,
  )
  .post(
    '/like',
    post.like,
  )
  .post(
    '/dislike',
    post.dislike,
  )
  .put(
    '/',
    post.put,
  )
  .delete(
    '/:id',
    post.delete,
  );

export default router;
