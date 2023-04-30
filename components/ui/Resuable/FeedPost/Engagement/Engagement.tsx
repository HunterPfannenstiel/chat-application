import { FunctionComponent, useEffect, useState } from "react";
import classes from "./Engagement.module.css";
import EComponent from "./EComponent";
import LikeIcon from "@ui/Resuable/Icons/LikeIcon";
import CommentIcon from "@ui/Resuable/Icons/CommentIcon";
import { updatePostLike } from "utils/actions";
import EditButton from "@ui/Resuable/Icons/EditButton";
import Link from "next/link";
import ReplyIcon from "@ui/Resuable/Icons/ReplyIcon";

interface EngagementProps {
  postId: number;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isUsersProfile?: boolean;
  editPost?: () => void;
  replyToPostId?: number;
}

const Engagement: FunctionComponent<EngagementProps> = ({
  postId,
  likeCount,
  commentCount,
  isLiked,
  isUsersProfile,
  editPost,
  replyToPostId,
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

  useEffect(() => {
    setLikes(likeCount);
  }, [likeCount]);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  return (
    <div className={classes.engagement}>
      <EComponent
        count={likes}
        action={handleLike}
        icon={<LikeIcon liked={liked} />}
      />
      <Link href={`/post/${postId}`}>
        <EComponent
          count={commentCount}
          action={() => {}}
          icon={<CommentIcon />}
        />
      </Link>
      <ReplyIcon replyToPostId={replyToPostId} />
      {isUsersProfile && (
        <div className={classes.edit}>
          <EditButton onClick={editPost} />
        </div>
      )}
    </div>
  );
};

export default Engagement;
