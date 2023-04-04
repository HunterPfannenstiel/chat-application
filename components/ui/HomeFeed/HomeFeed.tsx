import { FunctionComponent } from "react";
import classes from "./HomeFeed.module.css";
import FeedPostList from "@ui/Resuable/FeedPost/FeedPostList";
import FeedNav from "@ui/HomeFeed/FeedNav/FeedNav";
import Menu from "./Menu/Menu";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import { UserFeed } from "@_types/user";

interface HomeFeedProps {
  user: UserFeed;
}

const HomeFeed: FunctionComponent<HomeFeedProps> = ({ user }) => {
  const { toggleModal, showModal, playAnimation } = useAnimateModal(300);
  console.log("Width", screen.width);
  return (
    <>
      <FeedNav toggleModal={toggleModal} userImage={user.userImage} />
      <FeedPostList posts={user.posts} />
      <Menu
        showModal={showModal}
        playAnimation={playAnimation}
        user={user}
        toggleModal={toggleModal}
      />
    </>
  );
};

export default HomeFeed;
