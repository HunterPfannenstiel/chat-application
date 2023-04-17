import { FunctionComponent, useEffect, useState } from "react";
import classes from "./Engagement.module.css";
import EComponent from "./EComponent";
import LikeIcon from "@ui/Resuable/Icons/LikeIcon";
import CommentIcon from "@ui/Resuable/Icons/CommentIcon";
import { updatePostLike } from "utils/actions";

interface EngagementProps {
  postId: number;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

const Engagement: FunctionComponent<EngagementProps> = ({
  postId,
  likeCount,
  commentCount,
  isLiked,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likeCount);
  const handleLike = () => {
    if (liked) {
      updatePostLike(postId, "unlike");
      setLikes((prevState) => prevState - 1);
    } else {
      updatePostLike(postId, "like");
      setLikes((prevState) => prevState + 1);
    }
    setLiked((prevState) => !prevState);
  };

  return (
    <div className={classes.engagement}>
      <EComponent
        count={likes}
        action={handleLike}
        icon={<LikeIcon fillColor={liked ? "red" : "gray"} />}
      />
      <EComponent
        count={commentCount}
        action={() => {
          console.log("IMPLMENT: BRING UP CREATE COMMENT PAGE");
        }}
        icon={<CommentIcon fillColor="" />}
      />
    </div>
  );
};

export default Engagement;
