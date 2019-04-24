import { connect, disconnect } from 'mongoose';
export default class Database {
  public async open(url: string) {
    try {
      const conn = await connect(url, { useNewUrlParser: true });
      return conn;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  public disconnect() {
    disconnect();
  }
}
