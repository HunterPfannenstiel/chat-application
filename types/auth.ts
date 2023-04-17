export type SessionToken = {
  user: { name: string; userId: number; isNew: boolean; isWeb3: boolean };
  expires: Date;
};
