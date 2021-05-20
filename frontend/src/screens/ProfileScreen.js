import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";
import ReactLoading from "react-loading";
import { Container, Grid, makeStyles } from "@material-ui/core/index";
import { Typography, Divider } from "@material-ui/core/";
import { detailsUser } from "../actions/userActions";
import { red } from "@material-ui/core/colors";

import RenderPost from "../components/RenderPost";
import { listPosts, listReposts } from "../actions/postActions";
import {
  USER_FOLLOW_RESET,
  USER_PROFILE_UPDATE_RESET,
  USER_UNFOLLOW_RESET,
} from "../constants/userConstants";
import NavLarge from "../components/NavLarge";
import { useState } from "react";
import TopicsNav from "../components/TopicsNav";

import RenderProfile from "../components/RenderProfile";
import ProfileEdit from "../components/ProfileEdit";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "auto",
    "&:hover": {
      cursor: "normal",
    },

    borderLeft: "1px solid #e0e0e0",
    borderRight: "1px solid #e0e0e0",
    borderBottom: "1px solid #e0e0e0",
    borderRadius: "0px",
  },
  title: {
    marginLeft: "1rem",
    padding: "1rem",
  },
  profileRoot: {
    borderRadius: "0px",
    [theme.breakpoints.up("md")]: {},
  },
  media: {
    height: 170,
    width: "100%",
  },
  mediaBgEdit: {
    height: 170,
    width: "100%",
  },
  bgIcon: {
    color: "#ffffff",
    width: "100px",
    height: "100px",
  },
  avatar: {
    backgroundColor: red[500],
    width: "100px",
    height: "100px",
    border: "5px solid #000000",
    zIndex: "10",
  },
  nameSection: {
    margin: theme.spacing(2),
  },
  descriptionSection: {
    margin: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  profilePicUploadBtn: {
    borderRadius: "50%",
  },
  backgroundUploadBtn: {
    width: "100%",
  },
  followSection: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
  descriptionTextField: {
    width: "25rem",
  },
}));

export default function ProfileScreen(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const postList = useSelector((state) => state.postList);
  const { loading: loadingPosts, error: errorPosts, posts } = postList;
  const repostList = useSelector((state) => state.repostList);
  const { reposts } = repostList;
  const commentAdd = useSelector((state) => state.commentAdd);
  const { success: successCommentAdd } = commentAdd;
  const postLike = useSelector((state) => state.postLike);
  const { success: successLikeAdd } = postLike;
  const postUnlike = useSelector((state) => state.postUnlike);
  const { success: successLikeRemove } = postUnlike;
  const postRepost = useSelector((state) => state.postRepost);
  const { success: successRepost } = postRepost;
  const postUnrepost = useSelector((state) => state.postUnrepost);
  const { success: successUnrepost } = postUnrepost;
  const userFollow = useSelector((state) => state.userFollow);
  const { success: successFollow } = userFollow;
  const userUnfollow = useSelector((state) => state.userUnfollow);
  const { success: successUnfollow } = userUnfollow;
  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { success: successUpdate } = userProfileUpdate;

  //state
  const [editMode, setEditMode] = useState(false);

  // utils
  const profileId = props.match.params.username;
  const postTotal = posts && reposts ? posts.concat(reposts) : null;
  // console.log("postTotal", postTotal);
  useEffect(() => {
    if (
      successCommentAdd ||
      successLikeAdd ||
      successLikeRemove ||
      successRepost ||
      successUnrepost
    ) {
      dispatch(listPosts({ profile: profileId }));
      dispatch(listReposts({ profile: profileId }));
    }
    if (successFollow) {
      dispatch(detailsUser(profileId));
      dispatch({ type: USER_FOLLOW_RESET });
    }
    if (successUnfollow) {
      dispatch(detailsUser(profileId));
      dispatch({ type: USER_UNFOLLOW_RESET });
    }
    if (successUpdate) {
      dispatch(detailsUser(profileId));
      dispatch({ type: USER_PROFILE_UPDATE_RESET });
      setEditMode(false);
    }

    if (!user) {
      dispatch(detailsUser(profileId));
      dispatch(listPosts({ profile: profileId }));
      dispatch(listReposts({ profile: profileId }));
    }
    if (user && profileId !== user.username) {
      dispatch(detailsUser(profileId));
      dispatch(listPosts({ profile: profileId }));
      dispatch(listReposts({ profile: profileId }));
    }
  }, [
    dispatch,
    userInfo,
    user,
    profileId,
    successCommentAdd,
    successLikeAdd,
    successLikeRemove,
    successRepost,
    successUnrepost,
    successFollow,
    successUnfollow,
    successUpdate,
  ]);

  //pasar como prop a renderProfile.
  const editProfileCallback = (childData) => {
    setEditMode(childData);
  };

  return (
    <div>
      {console.log("editMode", editMode)}
      {
        //   {console.log("reposts", reposts)}
        //   {console.log("posts", posts)
      }{" "}
      {console.log("props", props)}
      {
        //console.log("userInfo", userInfo)
      }
      {user ? (
        <Container fixed maxWidth="lg">
          <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.title}>
              <Typography variant="h4" color="textPrimary">
                {user.profile.name} {user.profile.lastname}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <NavLarge />

            <Grid item xs={12} lg={6}>
              {editMode ? (
                <ProfileEdit user={user} userInfo={userInfo} />
              ) : (
                <RenderProfile
                  user={user}
                  userInfo={userInfo}
                  editProfileCallback={editProfileCallback}
                  profileId={profileId}
                />
              )}
              <Divider />
              <Grid item xs={12}>
                {loadingPosts ? (
                  <ReactLoading
                    className="loading"
                    color="#2d91f0"
                    type="cylon"
                  />
                ) : errorPosts ? (
                  <MessageBox variant="danger">{errorPosts}</MessageBox>
                ) : posts && reposts ? (
                  postTotal.map((post) => (
                    <RenderPost key={post._id} post={post}></RenderPost>
                  ))
                ) : //TODO: Pantalla length === 0
                null}
              </Grid>
            </Grid>
            <TopicsNav />
          </Grid>
        </Container>
      ) : null}
    </div>
  );
}
