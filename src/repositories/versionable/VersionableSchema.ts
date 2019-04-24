import { Schema } from 'mongoose';

export default class VersionableSchema extends Schema {
  constructor(userSchema: any, options: any) {
    const VersionSchema = Object.assign(
      {
        createdAt: {
          default: () => Date(),
          required: true,
          type: String,
        },
        deletedAt: {
          required: false,
          type: Date,
        },
        originalId: {
          required: true,
          type: String,
        },
      },
      userSchema,
    );
    super(VersionSchema, options);
  }
}
