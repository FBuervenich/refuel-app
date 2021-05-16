declare module Express {
  export interface Request {
    user: {
      sub: string;
    };
  }
  export interface Response {
    callingUserId: string;
  }
}
