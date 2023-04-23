import { FunctionComponent, useState } from "react";
import classes from "./IndividualPost.module.css";
import { FeedPost as FeedPosts } from "@_types/post/feed-post";
import FeedPost from "@ui/Resuable/FeedPost/FeedPost";
import PostModal from "@ui/Resuable/PostModal/PostModal";
import useAnimateModal from "@hooks/animation/useAnimateModal";
import { ImageInfo } from "@ui/Resuable/PostModal/types";
import { createPost } from "utils/actions";

interface IndividualPostProps {
	mainPost: FeedPosts;
	commentPosts: FeedPosts[];
}

const IndividualPost: FunctionComponent<IndividualPostProps> = ({
	mainPost,
	commentPosts,
}) => {
	const [comments, setComments] = useState(commentPosts);
	const { showModal, playAnimation, toggle } = useAnimateModal(300);
	const replyCount = commentPosts.length;

	const addNewComment = (comment: FeedPost) => {
		setComments((prevState) => [...prevState, comment]);
	};
	return (
		<>
			<FeedPost post={mainPost} />
			<div className={classes.add_comment}>
				<button onClick={toggle}>Post a Reply</button>
			</div>
			<p className={classes.count}>
				Replies: <span>{replyCount}</span>
			</p>
			<ul>
				{comments.map((post) => {
					return <FeedPost post={post} key={post.postId} />;
				})}
			</ul>
			{showModal && (
				<PostModal
					modalProps={{ playAnimation, toggle, animationTime: 300 }}
					modalTitle="Create a Comment"
					createPostHandler={createCommentHandler(
						mainPost.postId,
						addNewComment
					)}
				/>
			)}
		</>
	);
};

const createCommentHandler =
	(postId: number, newComment: (comment: FeedPosts) => void) =>
	async (content: string, images: ImageInfo[]) => {
		const comment = await createPost(content, images, postId);
		newComment(comment);
	};

export default IndividualPost;
