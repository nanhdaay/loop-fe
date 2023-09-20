import { useContext, useState } from "react";
import "./Comments.scss"
import {AuthContext} from "../../context/authContext"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SendRoundedIcon from '@mui/icons-material/SendRounded';


const Comments = ({postId}) => {

    const [desc, setDesc] = useState("")
    const {currentUser} = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId="+postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment)=>{
    return makeRequest.post("/comments", newComment);
  }, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["comments"]);
    },
  })

  const handleClick = async (e) =>{
    e.preventDefault()
    mutation.mutate({desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
        <div className="write">
            <span>{currentUser.username}</span>
            <input type="text" placeholder="write a comment" value={desc} onChange={(e) => setDesc(e.target.value)}/>
            <SendRoundedIcon onClick={handleClick}/>
        </div>
        {isLoading ? "loading" : data.map(comment => (
            <div className="comment">
                <div className="info">
                    <span>{comment.username}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className="date">{moment(comment.createdAt).fromNow()}</span>
            </div>
        ))}
    </div>
  )
}

export default Comments