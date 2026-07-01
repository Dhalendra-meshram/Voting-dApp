import mongoose, { Document, Schema } from "mongoose";

export interface ICandidateCache extends Document {
  candidateId: number;
  cid: string;
  metadata: Record<string, any>;
  cachedAt: Date;
}

const candidateCacheSchema = new Schema<ICandidateCache>({
  candidateId: {
    type: Number,
    required: true,
    index: true
  },
  cid: {
    type: String,
    required: true
  },
  metadata: {
    type: Schema.Types.Mixed,
    required: true
  },
  cachedAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Prevent duplicate cache entries per candidate
candidateCacheSchema.index({ candidateId: 1 }, { unique: true });

export default mongoose.model<ICandidateCache>(
  "CandidateCache",
  candidateCacheSchema
);