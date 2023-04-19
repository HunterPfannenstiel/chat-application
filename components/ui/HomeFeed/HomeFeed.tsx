import { FunctionComponent } from "react";
import classes from "./HomeFeed.module.css";
import FeedPostList from "@ui/Resuable/FeedPost/FeedPostList";
import FeedNav from "@ui/HomeFeed/FeedNav/FeedNav";
import Menu from "./Menu/Menu";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import { UserFeed } from "@_types/user";
import PostModal from "@ui/Resuable/PostModal/PostModal";
import useTensionScroll from "@hooks/animation/useTensionScroll";
import { ImageInfo } from "@ui/Resuable/PostModal/types";
import { createFormData } from "utils/form";
import { createPost } from "utils/actions";

interface HomeFeedProps {
  user: UserFeed;
  isSignedIn: boolean;
}

const HomeFeed: FunctionComponent<HomeFeedProps> = ({ user, isSignedIn }) => {
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
          createPostHandler={createPost}
        />
      )}

      <button className={classes.create_post} onClick={toggleCreatePost}>
        Create Post
      </button>
    </section>
  );
};
export default HomeFeed;
