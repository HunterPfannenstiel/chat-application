import { FeedPost } from "@_types/post/feed-post";
import { FunctionComponent, useEffect, useState } from "react";
import classes from "./Home.module.css";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [posts, setPosts] = useState<FeedPost[]>();
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("/api/feed")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("ERROR");
      })
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);
  if (posts) {
    return (
      <div>
        <h1>{posts[0].content}</h1>
        <p>{posts[0].userName}</p>
        <p>{`Likes: ${posts[0].likeCount}`}</p>
        <p>{`Comments: ${posts[0].commentCount}`}</p>
      </div>
    );
  }
  return <h1>LOADING...</h1>;
};

export default Home;
