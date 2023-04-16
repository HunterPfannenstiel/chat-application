import { FunctionComponent } from "react";
import classes from "./HomeFeed.module.css";
import FeedPostList from "@ui/Resuable/FeedPost/FeedPostList";
import FeedNav from "@ui/HomeFeed/FeedNav/FeedNav";
import Menu from "./Menu/Menu";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import { UserFeed } from "@_types/user";
import PostModal from "@ui/Resuable/PostModal/PostModal";
import { ClientPost } from "@_types/post";
import useTensionScroll from "@hooks/animation/useTensionScroll";
import { ImageInfo } from "@ui/Resuable/PostModal/types";
import { formHandler } from "utils/form";

interface HomeFeedProps {
  user: UserFeed;
  isSignedIn: boolean;
}

const HomeFeed: FunctionComponent<HomeFeedProps> = ({ user, isSignedIn }) => {
  const { toggleModal, showModal, playAnimation } = useAnimateModal(300);
  const {
    toggleModal: toggleCreatePost,
    showModal: showPost,
    playAnimation: playPost,
  } = useAnimateModal(300);
  // useTensionScroll();
  return (
    <section>
      <FeedNav toggleModal={toggleModal} userImage={user.userImage} />
      <FeedPostList posts={user.posts} />
      <Menu
        showModal={showModal}
        playAnimation={playAnimation}
        user={user}
        toggleModal={toggleModal}
        isSignedIn={isSignedIn}
      />
      {showPost && (
        <PostModal
          modalTitle="Create a Post!"
          playAnimation={playPost}
          toggleModal={toggleCreatePost}
          animationTime={300}
          creatPostHandler={postPost}
        />
      )}

      <button className={classes.create_post} onClick={toggleCreatePost}>
        Create Post
      </button>
    </section>
  );
};

const postPost = async (content: string, images: ImageInfo[]) => {
  const blobs = images.map((image) => image.blob);
  console.log(blobs);
  const formData = formHandler({ content }, { images: blobs });
  const res = await fetch("/api/post", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Creating post failed");
  }
};

export default HomeFeed;
