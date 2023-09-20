import "./Profile.scss";
import React, { useState } from "react";
import Posts from "../../components/posts/Posts";
import Bottombar from "../../components/bottombar/Bottombar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { DarkModeContext } from "../../context/darkModeContext";

const Profile = () => {
  const {toggle, darkMode} = useContext(DarkModeContext);
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  const handleUpdateSuccess = () => {
    // Refetch user data after a successful update
    queryClient.invalidateQueries(["user"]);
    setOpenUpdate(false);
  };

  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="center">
                <div className="user-header">
                  <h1 className="username">{data.username}'s loops</h1>
                </div>
                <div className="follow">
                  {rIsLoading ? (
                    "loading"
                  ) : userId !== currentUser.id ?  (
                    <button onClick={handleFollow}>
                      {relationshipData.includes(currentUser.id)
                        ? "Following"
                        : "Follow"}
                    </button>
                  ): null }
                </div>
              </div>
            </div>
            <Posts userId={userId} />
          </div>
          <div className="bottombar">
            <Bottombar />
          </div>
        </>
      )}
      {openUpdate && (
        <Update
          setOpenUpdate={setOpenUpdate}
          user={data}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default Profile;
