import { FunctionComponent, RefObject } from "react";
import FeedPostList from "@ui/Resuable/FeedPost/FeedPostList";
import FeedNav from "@ui/HomeFeed/FeedNav/FeedNav";
import Menu from "./Menu/Menu";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import { UserFeed } from "@_types/user";
import PostModal from "@ui/Resuable/PostModal/PostModal";
import CreatePostIcon from "@ui/Resuable/Icons/CreatePostIcon";
import { createPost } from "utils/actions";

interface HomeFeedProps {
  user: UserFeed;
  isSignedIn: boolean;
  scrollElement: RefObject<HTMLUListElement>;
}

const HomeFeed: FunctionComponent<HomeFeedProps> = ({
  user,
  isSignedIn,
  scrollElement,
}) => {
  const { toggle, showModal, playAnimation } = useAnimateModal(300);
  const {
    toggle: toggleCreatePost,
    showModal: showPost,
    playAnimation: playPost,
  } = useAnimateModal(300);
  // useTensionScroll();
  return (
    <section>
      <FeedNav toggleModal={toggle} userImage={user.userImage} />
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
      <Menu
        showModal={showModal}
        playAnimation={playAnimation}
        user={user}
        toggleModal={toggle}
        isSignedIn={isSignedIn}
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
