import {
  Dispatch,
  FunctionComponent,
  RefObject,
  SetStateAction,
  useState,
} from "react";
import FeedPostList from "@ui/Resuable/FeedPost/FeedPostList";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import { UserFeed } from "@_types/user";
import PostModal from "@ui/Resuable/PostModal/PostModal";
import CreatePostIcon from "@ui/Resuable/Icons/CreatePostIcon";
import { createPost } from "utils/actions";
import { ImageInfo } from "@ui/Resuable/PostModal/types";
import classes from "./HomeFeed.module.css";
import { FeedPost } from "@_types/post/feed-post";
import { SetScrollEvent } from "@hooks/page-fetch/types";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

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
  // const { query } = useRouter();
  // useTensionScroll();
  // let viewPosts: FeedPost[] = [];
  // if (query.feed) viewPosts = newPosts;
  // if (posts) viewPosts = [...viewPosts, ...posts];
  return (
    <section>
      <FeedPostList
        scroll
        setScrollEvent={setScrollEvent}
        posts={posts}
        emptyPostDisplay={
          <p>
            No one you follow has posted! Follow more people or view the
            'Global' page!
          </p>
        }
      />
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
        return [post, ...prevPosts];
      });
    } catch (error) {
      console.log("Error creating post");
    }
  };
export default HomeFeed;
