import { PageProcedureParams } from "@_types/db";
import {
  UpdateUser,
  ConnectionsDetails,
  CreateUser,
  UserImage,
} from "@_types/user";
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
  static fetchPosts(
    handle: string,
    params: PageProcedureParams,
    category?: string
  ) {
    return fetchUserPosts(handle, params, category);
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

  static search(
    searchTerm: string,
    params: PageProcedureParams,
    userId?: number
  ) {
    return searchForUsers(searchTerm, params, userId);
  }

  static fetchByHandle(handle: string, userId?: number) {
    return fetchUserProfileByHandle(handle, userId);
  }

  static fetchAnalytics(handle: string, userId?: number) {
    return fetchUserAnalytics(handle, userId);
  }
}
