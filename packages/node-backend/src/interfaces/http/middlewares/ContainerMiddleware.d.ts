declare module Express {
  export interface Request {
    container: {
      cradle: import('../../../container').ICradle;
    };
  }
}
