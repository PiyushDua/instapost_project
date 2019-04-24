import { IVersionableModel } from '../versionable';
export default interface IPostModel extends IVersionableModel {
  text: string;
  likes: [string];
  createdBy: string;
  isLiked: boolean;
}
