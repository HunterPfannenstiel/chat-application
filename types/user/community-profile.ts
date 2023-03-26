import { CommunityPost } from "@_types/post/community-post";
import { UserInfo } from ".";

export type CommunityProfile = {
  bio: string;
  communityCount: number;
  communityJoinDate: Date;
  posts: CommunityPost[];
} & UserInfo;
