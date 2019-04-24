import axios from 'axios';
import { configuration } from '../configuration';

const postServicePort = configuration.postServicePort;

class PostService {
  public async createPost(post: any) {
    console.log(post);
    console.log('pre-create post- microservice arch');
    const { data } = await axios.post(
      `http://localhost:${postServicePort}/api/post`,
      {
        post,
      },
    );
    console.log('post-create post-microservice arch');
    return data;
  }

  public async like(id: string, likedBy: string) {
    console.log('Inside like pre');
    const { data } = await axios.post(
      `http://localhost:${postServicePort}/api/post/like`,
      { id, likedBy },
    );
    console.log('PostService.ts', data);
    return data;
  }
  public async dislike(id: string, likedBy: string) {
    console.log('Inside like pre');
    const { data } = await axios.post(
      `http://localhost:${postServicePort}/api/post/dislike`,
      { id, likedBy },
    );
    console.log('PostService.ts', data);
    return data;
  }
  public async getPosts() {
    const { data } = await axios.get(
      `http://localhost:${postServicePort}/api/post`
    );
    return data;
  }

  public async updatePost(id: string, text: string) {
    const dataToUpdate = { text };
    const { data } = await axios.put(
      `http://localhost:${postServicePort}/api/post`,
      { id, dataToUpdate }
    );
    return data;
  }
}

export default new PostService();
