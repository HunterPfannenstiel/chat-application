import {
  UserInfo,
  UpdateUser,
  FollowerDetails,
  CreateUser,
} from "@_types/user";
import { UserProfile } from "@_types/user/profile";
import { mockFollowers, mockProfiles } from "mock-data/profiles";
import { getDB } from "utils/db/connect";
import { useDB } from "utils/db/helpers";
import { execCreateUser, getFollow } from "utils/db/user-commands";

export class User {
  static fetchProfile(userId: string): Promise<UserProfile> {
    //Query for profile with 'userId'
    return new Promise((resolve) => {
      resolve(mockProfiles[2]);
    });
  }

  static async fetchFollowers(userId: number): Promise<FollowerDetails[]> {
    const followers = await useDB(getFollow(userId, 0, "Followers"));
    return followers;
  }

  static async fetchFollowing(userId: number): Promise<FollowerDetails[]> {
    const following = await useDB(getFollow(userId, 0, "Following"));
    return following;
  }

  static async create(profile: CreateUser): Promise<number> {
    const db = await getDB();
    return execCreateUser(db, profile);
  }

  static update(userId: string, updates: UpdateUser): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
}
