import { postService } from '../../services';

function sortDate(a: any, b: any) {
  const dateA = new Date(a.createdAt);
  const dateB = new Date(b.createdAt);

  if (dateA > dateB) {
    return -1;
  }
  if (dateA < dateB) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

const Query = {
  getPosts: async () => {
    console.log('inside getPosts');
    const posts = await postService.getPosts();
    posts.sort(sortDate);
    return posts;
  },
};
export default Query;
