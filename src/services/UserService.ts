import axios from 'axios';
import { configuration } from '../configuration';

// const url = 'https://dev-246708.okta.com';
// const apiToken = '00_DXV0IY-_byweMpMupTPh7ujdcx6qjYCvDvR1RHS';
// const headers = {
//   'Accept' : 'application/json',
//   'Authorization': `SSWS ${apiToken}`,
//   'Content-Type': 'application/json',
// };
const userServicePort = configuration.userServicePort;

class UserService {
  public async getUsers() {
    try {
      // console.log('Pre GET req from graphql');
      const res = await axios.get(`http://localhost:${userServicePort}/api/user`);
      // console.log('Post GET req from graphql');
      // console.log(res.data);
      return res.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public async createUser(data: any) {
    try {
      // console.log('PRE-REQ-SENT-CHECK');
      const res = await axios.post(`http://localhost:${userServicePort}/api/user`, {
        data,
      });
      // console.log('POST-REQ-SENT-CHECK');
      // console.log(res.data);
      return res.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new UserService();
