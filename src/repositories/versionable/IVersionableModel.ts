import { Document } from 'mongoose';
export default interface IVersionableModel extends Document {
  _id: string;
  createdAt: string;
  deletedAt: Date;
  originalId: string;
}
