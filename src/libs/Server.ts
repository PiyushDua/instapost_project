import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import fetchUser from './fetchUser';

export default class Server {
  public server: any;
  public app: express.Express;

  constructor(private config: any) {
    this.app = express();
  }
  public setupApolloServer(schema: any) {
    const { app } = this;
    this.server = new ApolloServer({...schema, ...{
      context: ({ req }) => {
        console.log('context running');
        let token = '';
        try {
          token = req.headers.authorization || '';
        } catch ( err ) {
          token = '';
          console.log('empty token');
        }
        // get the user token from the headers
        // const token = '';
        // try to retrieve a user with the token
        const sub  = fetchUser(token);
        // add the user to the context
        return { sub };
      },
    }});
    this.server.applyMiddleware({ app, path: '/' });
    this.run();
  }
  public async run() {
    const s = this.app.listen(this.config.port, () => {
      console.log(`Listening on port: ${this.config.port}`);
    });
    this.server.installSubscriptionHandlers(s);

  }
  public initCors() {
    const corsOptions = {
      optionsSuccessStatus: 200,
      origin: '*',
    };
    this.app.use(cors(corsOptions));
  }
}
