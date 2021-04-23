import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";
import ReactLoading from "react-loading";
import { Container, Button, Grid, makeStyles } from "@material-ui/core/index";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Hidden,
} from "@material-ui/core/";
import { detailsUser, followUser, unfollowUser } from "../actions/userActions";
import { red } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import RenderPost from "../components/RenderPost";
import { listPosts, listReposts } from "../actions/postActions";
import {
  USER_FOLLOW_RESET,
  USER_UNFOLLOW_RESET,
} from "../constants/userConstants";
import NavLarge from "../components/NavLarge";

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
    [theme.breakpoints.up("md")]: {
      borderRight: "1px solid #e0e0e0",
    },
  },
  media: {
    height: 170,
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
  followSection: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(3),
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
    if (!user) {
      dispatch(detailsUser(profileId));
      dispatch(listPosts({ profile: profileId }));
      dispatch(listReposts({ profile: profileId }));
    }
    if (user && profileId !== user.username) {
      dispatch(detailsUser(profileId));
      //TODO: Arreglar este problema, busca por ambos parametros
      //Por lo que la respuesta es 0 posts
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
  ]);

  const followHandler = () => {
    dispatch(followUser(profileId));
  };
  const unfollowHandler = () => {
    dispatch(unfollowUser(profileId));
  };
  return (
    <div>
      {console.log("user", user)}
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
          {" "}
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

            <Grid item xs={12} md={6}>
              <Card elevation={0} className={classes.profileRoot}>
                {
                  //  loading ? (
                  //   <div className="row center">
                  //      <ReactLoading className="loading" color="#2d91f0" type="cylon" />{" "}
                  //    </div>
                  //  ) : error ? (
                  //    <MessageBox variant="danger">{error}</MessageBox>
                  //  ) : null
                }
                <Box m={1}>
                  <CardMedia
                    className={classes.media}
                    image="/images/p1.jpg"
                  ></CardMedia>
                </Box>
                <Grid container>
                  <Grid item xs={3}>
                    <Grid container alignItems="center" direction="column">
                      <Avatar
                        src={user ? user.profile.profile : null}
                        className={classes.avatar}
                      ></Avatar>
                    </Grid>
                  </Grid>
                  <Grid item xs={9}>
                    <Grid container direction="column" alignItems="flex-end">
                      {userInfo && user && userInfo._id === user._id ? (
                        <Box m={3}>
                          <Button
                            size="large"
                            variant="outlined"
                            color="primary"
                          >
                            Editar perfil
                          </Button>
                        </Box>
                      ) : !user.followers.includes(userInfo.username) ? (
                        <Box m={3}>
                          <Button
                            onClick={followHandler}
                            size="large"
                            variant="contained"
                            color="primary"
                          >
                            Seguir{" "}
                          </Button>
                        </Box>
                      ) : (
                        <Box m={3}>
                          <Button
                            onClick={unfollowHandler}
                            size="large"
                            variant="contained"
                            color="primary"
                          >
                            Dejar de seguir
                          </Button>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <CardContent>
                  <Grid container className={classes.nameSection}>
                    <Grid item xs={12}>
                      <Typography gutterBottom variant="h4" component="h2">
                        {user.profile.name + " " + user.profile.lastname}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" color="textSecondary">
                        {"@" + user.profile.username}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.descriptionSection}>
                    <Typography
                      variant="body"
                      color="textPrimary"
                      component="p"
                    >
                      {user ? user.profile.description : null}
                    </Typography>
                  </Grid>
                  <Divider />
                  <Grid container className={classes.followSection}>
                    {" "}
                    <Typography variant="body" component="p">
                      {`${user.following.length} siguiendo
                ${user.followers.length} seguidores`}
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>{" "}
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
            <Grid item xs={3}></Grid>
          </Grid>
        </Container>
      ) : null}
    </div>
  );
}
