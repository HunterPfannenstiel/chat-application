import { FunctionComponent, RefObject } from "react";
import FeedPostList from "@ui/Resuable/FeedPost/FeedPostList";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import { UserFeed } from "@_types/user";
import PostModal from "@ui/Resuable/PostModal/PostModal";
import CreatePostIcon from "@ui/Resuable/Icons/CreatePostIcon";
import { createPost } from "utils/actions";
import { ImageInfo } from "@ui/Resuable/PostModal/types";
import classes from "./HomeFeed.module.css";
import { FeedPost } from "@_types/post/feed-post";

interface HomeFeedProps {
  posts: FeedPost[] | undefined;
  scrollElement: RefObject<HTMLUListElement>;
}

const HomeFeed: FunctionComponent<HomeFeedProps> = ({
  posts,
  scrollElement,
}) => {
  const {
    toggle: toggleCreatePost,
    showModal: showPost,
    playAnimation: playPost,
  } = useAnimateModal(300);
  // useTensionScroll();
  return (
    <section>
      <FeedPostList
        scrollElement={scrollElement}
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
          createPostHandler={handleCreatePost}
        />
      )}

      <CreatePostIcon onClick={toggleCreatePost} />
    </section>
  );
};

const handleCreatePost = async (
  content: string,
  images: ImageInfo[],
  deleteImage: boolean
) => {
  const post = await createPost(content, images);
};
export default HomeFeed;
