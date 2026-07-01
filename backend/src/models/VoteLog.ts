import mongoose, { Document, Schema } from "mongoose";

export interface IVoteLog extends Document {
  voter: string;
  candidateId: number;
  txHash: string;
  blockNumber: number;
  timestamp: Date;
}

const voteLogSchema = new Schema<IVoteLog>({
  voter: {
    type: String,
    required: true,
    lowercase: true,
    index: true
  },
  candidateId: {
    type: Number,
    required: true,
    index: true
  },
  txHash: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  blockNumber: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

voteLogSchema.index({ candidateId: 1, timestamp: -1 });

export default mongoose.model<IVoteLog>("VoteLog", voteLogSchema);