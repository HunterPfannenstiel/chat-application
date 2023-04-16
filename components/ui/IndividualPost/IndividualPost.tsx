import { FunctionComponent } from "react";
import classes from "./IndividualPost.module.css";
import { FeedPost as FeedPosts } from "@_types/post/feed-post";
import FeedPost from "@ui/Resuable/FeedPost/FeedPost";

interface IndividualPostProps {
	mainPost: FeedPost;
    commentPosts: FeedPosts[];
}

const IndividualPost: FunctionComponent<IndividualPostProps> = ({ mainPost, commentPosts }) => {

	return (
		<>
			<FeedPost post={mainPost} />
            {commentPosts.map((post) => {
                return <FeedPost post={post}/>
            })}
		</>
	);
};

export default IndividualPost;
