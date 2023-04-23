import { UpdateUser, ConnectionsDetails, CreateUser } from "@_types/user";
import { UserProfile } from "@_types/user/profile";
import { mockProfiles } from "mock-data/profiles";
import { useDB } from "utils/db/helpers";
import {
  execCreateUser,
  execFollowUser,
  fetchUserProfile,
  getFollow,
} from "utils/db/user-commands";

export class User {
  static fetchProfile(handle: string, userId?: number) {
    //Query for profile with 'userId'
    return fetchUserProfile(handle, userId);
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

  static follow(
    userId: number,
    followedUserId: number,
    action: "follow" | "unfollow"
  ) {
    return execFollowUser(userId, followedUserId, action === "follow" ? 1 : 0);
  }
}
