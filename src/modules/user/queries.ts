import { userService } from '../../services';

const Query = {
  getUsers: async () => {
    console.log('Checkpoint');
    return userService.getUsers();
    // console.log(users);
    // return users;
  },
  // helloworld: async () => {
  //   console.log('Query Pinged');
  //   const { data } = await axios.get('http://localhost:9000/api/user');
  //   return data;
  // },

};
export default Query;
