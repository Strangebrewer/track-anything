import bcrypt from 'bcryptjs';
import { sign } from '../utils/passport';
import { UserModelInterface, IUser, UserDoc } from '../schema/user';

interface IReturnUser {
  token: string;
  user: IUser
}

export default class User {
  constructor(public Schema: UserModelInterface) { }

  async getCurrentUser(userId: string): Promise<IReturnUser> {
    const response = await this.Schema.findById(userId);
    if (!response) throw new Error('That user does not exist');

    const { _id, email, firstName, lastName } = response;
    const token = sign({ id: _id });
    const user = { _id, email, firstName, lastName };
    return { token, user };
  }

  async register(reqBody: IUser): Promise<IReturnUser> {
    const { email, password } = reqBody;
    if (email && !this.validateEmail(email))
      throw new Error('You must provide a valid email address.');

    const emailTaken = await this.Schema.findOne({ email });
    if (email && emailTaken)
      throw new Error('That email has already been used.');
      
    if (!password)
      throw new Error('You must provide a password.');

    const pw: string = this.hashPassword(password);
    reqBody.password = pw;
    const { _id, firstName, lastName }: UserDoc = await this.Schema.create(reqBody);

    const token = sign({ id: _id });
    const user = { _id, email, firstName, lastName };

    return { token, user };
  }
  
  validateEmail(email: string): boolean {
    return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
  }

  checkPassword(inputPassword: string, password: string): boolean {
    return bcrypt.compareSync(inputPassword, password);
  }

  hashPassword(plainTextPassword: string): string {
    return bcrypt.hashSync(plainTextPassword, bcrypt.genSaltSync(10));
  }
}