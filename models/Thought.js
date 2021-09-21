const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// const ReplySchema = new Schema(
//   {
//     // set custom id to avoid confusion with parent comment _id
//     replyId: {
//       type: Schema.Types.ObjectId,
//       default: () => new Types.ObjectId()
//     },
//     replyBody: {
//       type: String,
//       required: true
//     },
//     writtenBy: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       get: createdAtVal => dateFormat(createdAtVal)
//     }
//   },
//   {
//     toJSON: {
//       getters: true
//     }
//   }
// );

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true
    },
    commentBody: {
      type: String,
      required: true,
      len: [1, 280]
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true
    },
    //   // use ReactionSchema to validate
    //   reactions : [ReactionSchema]
    reactions: []
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
