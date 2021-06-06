export type WithSequelizeTimestamps<T extends object> = T & {
  createdAt: Date;
  updatedAt: Date;
};
