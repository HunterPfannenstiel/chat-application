export type SessionToken = {
  user: { name: string; userId: string; isNew: boolean; isWeb3: boolean };
  expires: Date;
};
