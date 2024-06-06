import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  name: string;
  profilePic?: string;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: false,
    trim: true,
  },
  profilePic: String,
}, { timestamps: true });

const UserModel = mongoose.model<User>("user", userSchema);

export default UserModel;
