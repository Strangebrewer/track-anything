import bcrypt from 'bcryptjs';
import { sign } from '../utils/passport';
import { UserModelInterface, IUser, UserDoc } from '../schema/user';

export interface IReturnUser {
  token: string;
  user: IUser
}

export default class User {
  constructor(public Schema: UserModelInterface) { }

  async getCurrentUser(userId: string): Promise<IReturnUser> {
    const response: UserDoc | null = await this.Schema.findById(userId);
    if (!response) throw new Error('That user does not exist');

    const { _id, email, firstName, lastName } = response;
    const token = sign({ id: _id });
    const user = { _id, email, firstName, lastName };
    return { token, user };
  }

  async login(reqBody: IUser): Promise<IReturnUser> {
    const { email, password } = reqBody;

    if (!email || !password)
      throw new Error('You have to supply an email and a password, stupid');

    const response: UserDoc | null = await this.Schema.findOne({ email });

    if (!response)
      throw new Error('Something went wrong; please try again.');
    
    const passwordValid = this.checkPassword(password, response.password);

    if (passwordValid)  {
      const { _id, email } = response;
      const token = sign({ id: _id });
      const user = { _id, email };
      return { token, user };
    } else {
      throw new Error('Something went wrong; please try again.');
    }
  }

  async register(reqBody: IUser): Promise<IReturnUser> {
    const { email, password } = reqBody;
    if (email && !this.validateEmail(email))
      throw new Error('You must provide a valid email address.');

    const emailTaken: UserDoc | null = await this.Schema.findOne({ email });
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