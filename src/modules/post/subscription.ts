import { PubSub } from 'apollo-server-express';
console.log('subscription.ts');
const pubsub = new PubSub();

const Subscription = {
  newPost: {
    subscribe: () => pubsub.asyncIterator('NEW_POST'),
  },
};

export { Subscription, pubsub };
