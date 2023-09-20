import Post from "../post/Post";
import "./Posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({userId, userProfilePic}) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userId="+userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "Loading..."
        : data.map((post) => <Post post={post} key={post.id} userProfilePic={userProfilePic} />)}
    </div>
  );
};

export default Posts;
