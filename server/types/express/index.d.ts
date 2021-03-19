declare namespace Express {
  interface Request {
    user: IRequestUser
  }
}

interface IRequestUser {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}