import mongoose, { Document, Schema } from "mongoose";

export interface IUserLog extends Document {
  address: string;
  loginTime: Date;
  ipAddress?: string;
  userAgent?: string;
}

const userLogSchema = new Schema<IUserLog>({
  address: {
    type: String,
    required: true,
    lowercase: true,
    index: true
  },
  loginTime: {
    type: Date,
    default: Date.now,
    index: true
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  }
});

// Compound index for faster address-based queries
userLogSchema.index({ address: 1, loginTime: -1 });

export default mongoose.model<IUserLog>("UserLog", userLogSchema);