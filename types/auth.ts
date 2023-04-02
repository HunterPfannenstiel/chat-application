export type SessionToken = {
  user: { name: string; userId: string; isNew: boolean };
  expires: Date;
};
