import { UpdateUser, ConnectionsDetails, CreateUser } from "@_types/user";
import { UserProfile } from "@_types/user/profile";
import { mockProfiles } from "mock-data/profiles";
import { useDB } from "utils/db/helpers";
import { execCreateUser, getFollow } from "utils/db/user-commands";

export class User {
  static fetchProfile(userId: string): Promise<UserProfile> {
    //Query for profile with 'userId'
    return new Promise((resolve) => {
      resolve(mockProfiles[2]);
    });
  }

  static async fetchFollowers(
    userHandle: string
  ): Promise<ConnectionsDetails[]> {
    const followers = await useDB(getFollow(userHandle, 0, "Followers"));
    return followers;
  }

  static async fetchFollowing(
    userHandle: string
  ): Promise<ConnectionsDetails[]> {
    const following = await useDB(getFollow(userHandle, 0, "Following"));
    return following;
  }

  static async create(profile: CreateUser): Promise<number> {
    return execCreateUser(profile);
  }

  static update(userId: number, updates: UpdateUser): Promise<string | null> {
    throw new Error("Method not implemented.");
  }

  static follow(userId: number, followingUserId: number) {
    throw new Error("Method not implemented.");
  }
}
