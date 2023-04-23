import { FunctionComponent, RefObject } from "react";
import FeedPostList from "@ui/Resuable/FeedPost/FeedPostList";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import { UserFeed } from "@_types/user";
import PostModal from "@ui/Resuable/PostModal/PostModal";
import CreatePostIcon from "@ui/Resuable/Icons/CreatePostIcon";
import { createPost } from "utils/actions";

interface HomeFeedProps {
  user: UserFeed;
  scrollElement: RefObject<HTMLUListElement>;
}

const HomeFeed: FunctionComponent<HomeFeedProps> = ({
  user,
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
        posts={user.posts}
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
          createPostHandler={createPost}
        />
      )}

      <CreatePostIcon onClick={toggleCreatePost} />
    </section>
  );
};
export default HomeFeed;
