import * as bodyParser from 'body-parser';
import express from 'express';
import { IConfig } from './config';
import { postRouter } from './controllers';
import { Database, errorHandler, notFoundRoute } from './libs';

export default class Server {
  public app: express.Express;

  constructor(private config: IConfig) {
    this.app = express();
  }

  public bootstrap() {
    this.initBodyParser();
    this.setupRoutes();
    return this;
  }

  public initBodyParser() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  public setupRoutes() {
    this.app.get('/', (_, res) => {
      res.send({value: 'I am root'});
    });
    this.app.use('/api/post', postRouter);
    this.app.use(notFoundRoute);
    this.app.use(errorHandler);
  }

  public async run() {
    try {
      const db = new Database();
      const conn = await db.open(this.config.mongo_url);
      if (conn) {
        this.app.listen(this.config.port, async (err: any) => {
          if (err) {
            console.log('err', err);
          } else {
            console.log(`Example app listening on port ${this.config.port}!`);
          }
        });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
