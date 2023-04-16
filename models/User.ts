import {
  UserInfo,
  UpdateUser,
  FollowerDetails,
  CreateUser,
} from "@_types/user";
import { UserProfile } from "@_types/user/profile";
import { mockFollowers, mockProfiles } from "mock-data/profiles";
import { getDB } from "utils/db/connect";
import { execCreateUser } from "utils/db/user-commands";

export class User {
  static fetchProfile(userId: string): Promise<UserProfile> {
    //Query for profile with 'userId'
    return new Promise((resolve) => {
      resolve(mockProfiles[2]);
    });
  }

  static fetchFollowers(userId: string): Promise<FollowerDetails[]> {
    return new Promise((resolve) => {
      resolve(mockFollowers);
    });
  }

  static fetchFollowing(userId: string): Promise<FollowerDetails[]> {
    throw new Error("Method not implemented.");
  }

  static async create(profile: CreateUser): Promise<number> {
    const db = await getDB();
    return execCreateUser(db, profile);
  }

  static update(userId: string, updates: UpdateUser): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
}
