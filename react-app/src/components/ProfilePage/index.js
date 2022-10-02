import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./ProfilePage.css";
import PostCard from "../PostCard";

import { getUserPostsRequest } from "../../store/posts";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { userId } = useParams();
  userId = Number(userId);
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => Object.values(state.posts));

  const [postsLoaded, setPostsLoaded] = useState(false);
  const [userOwnsProfile, setUserOwnsProfile] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    dispatch(getUserPostsRequest(userId)).then(() => {
      setPostsLoaded(true);
    });
  }, [dispatch, userId]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${userId}`);
      const responseData = await response.json();
      console.log("USER");
      setUser(responseData);
      console.log(user);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setUserOwnsProfile(sessionUser.id === userId);
  }, [sessionUser, userId]);

  return (
    <div className="pageContainer">
      <div className="homePageDiv">
        <div className="rowOne">
          {/* <div className="createPostDiv">
            <div className="createInputContainer">
              <input
                type="text"
                placeholder="Create Post"
                className="inputBox"
                onClick={createPostPage}
              />
            </div>
          </div> */}
          {postsLoaded ? (
            posts.length ? (
              posts.map((post) => {
                return <PostCard post={post} />;
              })
            ) : (
              <div>No posts yet</div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="rowTwo">
          {user && (
            // user.map((user) => {
            // return (
            <div className="userProfileInfo">
              <div>{user.username}</div>
              <div className="userProfileBanner"></div>
              <div className="profileInfodDiv"></div>
            </div>
            // );
            // })}
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
