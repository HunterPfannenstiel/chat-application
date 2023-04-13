import { FunctionComponent, useEffect, useState } from "react";
import classes from "./Engagement.module.css";
import EComponent from "./EComponent";
import LikeIcon from "@ui/Resuable/Icons/LikeIcon";
import CommentIcon from "@ui/Resuable/Icons/CommentIcon";

interface EngagementProps {
  postId: string;
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

  useEffect(() => {
    if (liked !== isLiked || likeCount !== likes) {
      handleLike(liked, postId);
      setLikes((prevState) => {
        if (liked) {
          return prevState + 1;
        } else {
          return prevState - 1;
        }
      });
    }
  }, [liked]);
  return (
    <div className={classes.engagement}>
      <EComponent
        count={likes}
        action={() => {
          setLiked((prevState) => !prevState);
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
  fetch("/api/post/like", {
    method: "POST",
    body: JSON.stringify({ postId, action: isLiked ? "delete" : "create" }),
    headers: { "Content-Type": "application/json" },
  });
};

export default Engagement;
