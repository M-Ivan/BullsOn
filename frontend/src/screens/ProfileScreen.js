import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import ReactLoading from "react-loading";
import { Container, Button, Grid, makeStyles } from "@material-ui/core/index";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { detailsUser } from "../actions/userActions";
import { red } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import RenderPost from "../components/RenderPost";
import { listPosts, listReposts } from "../actions/postActions";

const useStyles = makeStyles({
  root: {
    maxWidth: "auto",
    "&:hover": {
      cursor: "normal",
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
});

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
  ]);
  return (
    <div>
      {console.log("user", user)}
      {console.log("props", props)}
      {console.log("reposts", reposts)}
      {console.log("posts", posts)}
      {user ? (
        <Container fixed maxWidth="md">
          <h1>Perfil {profileId}</h1>
          <Card variant="outlined" className={classes.root}>
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
                      <Button size="large" variant="outlined" color="primary">
                        Editar perfil
                      </Button>
                    </Box>
                  ) : (
                    <Box m={3}>
                      <Button size="large" variant="contained" color="primary">
                        Seguir{" "}
                      </Button>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <CardContent>
              <Typography gutterBottom variant="h4" component="h2">
                {user ? user.profile.name + " " + user.profile.lastname : null}
              </Typography>
              <Typography variant="body" color="textPrimary" component="p">
                {user ? user.profile.description : null}
              </Typography>
              <Typography variant="body" component="p"></Typography>
            </CardContent>
          </Card>
          <Grid item xs={12}>
            {loadingPosts ? (
              <ReactLoading className="loading" color="#2d91f0" type="cylon" />
            ) : errorPosts ? (
              <MessageBox variant="danger">{errorPosts}</MessageBox>
            ) : posts && reposts ? (
              postTotal.map((post) => (
                <RenderPost key={post._id} post={post}></RenderPost>
              ))
            ) : //TODO: Pantalla length === 0
            null}
          </Grid>
        </Container>
      ) : null}
    </div>
  );
}
