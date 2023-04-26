import { PageProcedureParams } from "@_types/db";
import {
  UpdateUser,
  ConnectionsDetails,
  CreateUser,
  UserImage,
} from "@_types/user";
import { UserProfile } from "@_types/user/profile";
import { mockProfiles } from "mock-data/profiles";
import { useDB } from "utils/db/helpers";
import {
  execCreateUser,
  execFollowUser,
  execUpdateUser,
  fetchUserAnalytics,
  fetchUserDetials,
  fetchUserPosts,
  fetchUserProfileByHandle,
  getFollow,
  searchForUsers,
} from "utils/db/user-commands";

export class User {
  static fetchPosts(handle: string, userId?: number) {
    //Query for profile with 'userId'
    return fetchUserPosts(handle, userId);
  }

  static async fetchFollowers(
    userHandle: string,
    params: PageProcedureParams
  ): Promise<ConnectionsDetails[]> {
    const followers = getFollow(userHandle, "Followers", params);
    return followers;
  }

  static async fetchDetails(userId: number) {
    return fetchUserDetials(userId);
  }

  static async fetchFollowing(
    userHandle: string,
    params: PageProcedureParams
  ): Promise<ConnectionsDetails[]> {
    const following = await getFollow(userHandle, "Following", params);
    return following;
  }

  static async create(profile: CreateUser): Promise<number> {
    return execCreateUser(profile);
  }

  static update(
    userId: number,
    updates: UpdateUser,
    image: UserImage | undefined
  ): Promise<string | null> {
    return execUpdateUser(userId, updates, image);
  }

  static follow(
    userId: number,
    followedUserId: number,
    action: "follow" | "unfollow"
  ) {
    return execFollowUser(userId, followedUserId, action === "follow" ? 1 : 0);
  }

  static search(searchTerm: string, userId: number) {
    return searchForUsers(searchTerm, userId);
  }

  static fetchByHandle(handle: string, userId?: number) {
    return fetchUserProfileByHandle(handle, userId);
  }

  static fetchAnalytics(handle: string, userId?: number) {
    return fetchUserAnalytics(handle, userId);
  }
}
