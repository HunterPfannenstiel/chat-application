import { UserInfo, User as UserT, UpdateUser } from "@_types/user";
import { UserProfile } from "@_types/user/profile";
import { mockProfiles } from "mock-data/profiles";

export class User {
  static fetchProfile(userId: string): Promise<UserProfile> {
    //Query for profile with 'userId'
    return new Promise((resolve) => {
      resolve(mockProfiles[2]);
    });
  }

  static fetchFollowers(userId: string): Promise<UserInfo[]> {
    throw new Error("Method not implemented.");
  }

  static fetchFollowing(userId: string): Promise<UserInfo[]> {
    throw new Error("Method not implemented.");
  }

  static create(profile: UserT): Promise<void> {
    throw new Error("Method not implemented.");
  }

  static update(userId: string, updates: UpdateUser): Promise<void> {
    throw new Error("Method not implemented.");
  }
}