import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import FeedPostList from "@ui/Resuable/FeedPost/FeedPostList";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import PostModal from "@ui/Resuable/PostModal/PostModal";
import CreatePostIcon from "@ui/Resuable/Icons/CreatePostIcon";
import { createPost } from "utils/actions";
import { ImageInfo } from "@ui/Resuable/PostModal/types";
import classes from "./HomeFeed.module.css";
import { FeedPost } from "@_types/post/feed-post";
import { SetScrollEvent } from "@hooks/page-fetch/types";
import { useRouter } from "next/router";

interface HomeFeedProps {
  posts: FeedPost[] | undefined;
  setScrollEvent: SetScrollEvent;
}

const HomeFeed: FunctionComponent<HomeFeedProps> = ({
  posts,
  setScrollEvent,
}) => {
  const [newPosts, setNewPosts] = useState<FeedPost[]>([]);
  const {
    toggle: toggleCreatePost,
    showModal: showPost,
    playAnimation: playPost,
  } = useAnimateModal(300);
  const { query } = useRouter();
  return (
    <section>
      {posts && posts.length > 0 && (
        <FeedPostList
          scroll
          setScrollEvent={setScrollEvent}
          posts={posts}
          emptyPostDisplay={<></>}
          globalPosts={newPosts}
          query={query}
        />
      )}
      {posts?.length === 0 && (
        <p className={classes.no_posts}>No posts to show here!</p>
      )}
      {showPost && (
        <PostModal
          modalTitle="Create a Post!"
          modalProps={{
            toggle: toggleCreatePost,
            playAnimation: playPost,
            animationTime: 300,
          }}
          buttonText="Post"
          createPostHandler={handleCreatePost(setNewPosts)}
        />
      )}

      <CreatePostIcon onClick={toggleCreatePost} />
    </section>
  );
};

const handleCreatePost =
  (setNewPosts: Dispatch<SetStateAction<FeedPost[]>>) =>
  async (content: string, images: ImageInfo[], deleteImage: boolean) => {
    try {
      const post = await createPost(content, images);

      setNewPosts((prevPosts) => {
        post.likeCount = 0;
        post.commentCount = 0;
        return [post, ...prevPosts];
      });
    } catch (error) {
      console.log("Error creating post");
    }
  };
export default HomeFeed;
