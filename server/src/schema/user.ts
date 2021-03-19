import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const tempPw: string = bcrypt.hashSync('1234', bcrypt.genSaltSync(10));

export interface IUser {
  _id: string
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
}

export interface UserDoc extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserModelInterface extends mongoose.Model<UserDoc> { }

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    default: tempPw
  }
});

const User = mongoose.model<UserDoc, UserModelInterface>('User', userSchema);

// userSchema.statics.build = (attr: IUser): UserDoc => {
//   return new User(attr);
// };

export default User;
