import { FunctionComponent, useState } from "react";
import classes from "./Engagement.module.css";
import EComponent from "./EComponent";
import LikeIcon from "@ui/Resuable/Icons/LikeIcon";
import CommentIcon from "@ui/Resuable/Icons/CommentIcon";

interface EngagementProps {
  likeCount: number;
  commentCount: number;
}

const Engagement: FunctionComponent<EngagementProps> = ({
  likeCount,
  commentCount,
}) => {
  const [liked, setLiked] = useState(false);
  return (
    <div className={classes.engagement}>
      <EComponent
        count={likeCount}
        action={() => {
          let like = false;
          setLiked((prevState) => {
            like = !prevState;
            return like;
          });
          handleLike(like, "123");
        }}
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

const handleLike = (isLiked: boolean, postId: string) => {
  //send request to like/unlike post
  console.log("IMPLEMENT: POST LIKE TO DB");
};

export default Engagement;
