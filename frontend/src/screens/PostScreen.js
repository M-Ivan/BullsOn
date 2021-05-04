import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import {
  addComment,
  detailsPost,
  likePost,
  repostPost,
  unlikePost,
  unrepostPost,
} from "../actions/postActions";
import MessageBox from "../components/MessageBox";
import ReactLoading from "react-loading";
import TopicsNav from "../components/TopicsNav";
import {
  Container,
  Button,
  Grid,
  TextField,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  Divider,
  Hidden,
} from "@material-ui/core/index";
import { red } from "@material-ui/core/colors";
import ScreenShareOutlinedIcon from "@material-ui/icons/ScreenShareOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import StarIcon from "@material-ui/icons/Star";
import RenderComments from "../components/RenderComments";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import ChatIcon from "@material-ui/icons/Chat";
import NavLarge from "../components/NavLarge";
import RenderUsers from "../components/RenderUsers";
import { detailsUser, listUsers } from "../actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    borderLeft: "1px solid #e0e0e0",
    borderRight: "1px solid #e0e0e0",
    borderBottom: "1px solid #e0e0e0",
    borderRadius: "0px",
  },
  title: {
    marginLeft: "1rem",
    padding: "1rem",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  iconSmall: {
    width: "1rem",
    marginLeft: "2px",
  },
  commentBtn: {
    "&:hover": {
      color: "#006eff",
    },
  },
  activeComment: {
    color: "#006eff",
  },
  activeRepost: {
    color: "#00bb1b",
  },
  likeIcon: {
    "&:hover": {
      color: "#ffc900",
    },
  },
  repostIcon: {
    "&:hover": {
      color: "#00bb1b",
    },
  },
  likedIcon: {
    color: "#ffc900",
  },

  commentForm: {
    padding: "1rem",
  },
}));

export default function PostScreen(props) {
  const classes = useStyles();
  const postId = props.match.params.id;
  const dispatch = useDispatch();
  const [commentForm, setCommentForm] = useState(false);
  const [comment, setComment] = useState("");
  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post } = postDetails;
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
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userList = useSelector((state) => state.userList);

  useEffect(() => {
    if (
      successUnrepost ||
      successRepost ||
      successLikeAdd ||
      successLikeRemove ||
      successCommentAdd
    ) {
      dispatch(detailsPost(postId));
    }
    dispatch(detailsPost(postId));
  }, [
    dispatch,
    postId,
    successCommentAdd,
    successLikeAdd,
    successUnrepost,
    successRepost,
    successLikeRemove,
  ]);

  const submitCommentHandler = () => {
    if (userInfo) {
      dispatch(addComment(postId, comment));
      setCommentForm(false);
    } else {
      props.history.push("/signin");
      setCommentForm(false);
    }
  };

  //TODO: Handler para redirect a signIn si no hay userInfo
  const likeHandler = () => {
    if (userInfo) {
      dispatch(likePost(postId));
    } else {
      props.history.push("/signin");
    }
  };
  const unlikeHandler = () => {
    if (userInfo) {
      dispatch(unlikePost(postId));
    } else {
      props.history.push("/signin");
    }
  };
  const repostHandler = () => {
    if (userInfo) {
      dispatch(repostPost(postId));
    } else {
      props.history.push("/signin");
    }
  };
  const unrepostHandler = () => {
    if (userInfo) {
      dispatch(unrepostPost(postId));
    } else {
      props.history.push("/signin");
    }
  };
  console.log("userList", userList);
  return (
    <Container maxWidth="lg" fixed>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.title}>
          <Typography variant="h4" color="textPrimary">
            Compartido por {post ? post.profile._id : "un inversor anonimo"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {loading ? (
          <ReactLoading className="loading" color="#2d91f0" type="cylon" />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Grid xs={12}>
            <Grid container direction="row" justify="center">
              <NavLarge />
              <Grid item xs={12} lg={6}>
                <Card elevation={0} key={post._id}>
                  <CardHeader
                    avatar={
                      <Link to={`/${post.profile.profile.username}`}>
                        <Avatar
                          aria-label="recipe"
                          src={post ? post.profile.profile.profile : null}
                          className={classes.avatar}
                        ></Avatar>
                      </Link>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={
                      <div>
                        <Link to={`/${post.profile.profile.username}`}>
                          <Typography color="textPrimary" variant="h6">
                            {post.profile.profile.name +
                              " " +
                              post.profile.profile.lastname}
                          </Typography>
                          <Typography color="textSecondary">
                            <strong> {post.profile.profile.username}</strong>
                          </Typography>
                        </Link>
                      </div>
                    }
                    subheader={
                      "Publicado el: " +
                      post.createdAt.substring(0, 10) +
                      "   A las:  " +
                      post.createdAt.substring(11, 16)
                    }
                  />

                  {post.image ? (
                    <CardMedia
                      className={classes.media}
                      image={post.image}
                      title="Paella dish"
                    />
                  ) : null}
                  <CardContent>
                    <Typography
                      variant="body"
                      color="textPrimary"
                      component="p"
                    >
                      {post.post}
                    </Typography>
                  </CardContent>

                  <CardActions disableSpacing>
                    {" "}
                    <IconButton
                      className={classes.commentBtn}
                      onClick={() => setCommentForm(true)}
                    >
                      <Grid container alignItems="center">
                        {!commentForm ? (
                          <ChatBubbleOutlineIcon />
                        ) : (
                          <ChatIcon className={classes.activeComment} />
                        )}
                        {post.comments.length}{" "}
                      </Grid>
                    </IconButton>
                    Respuestas
                    {post &&
                    userInfo &&
                    !post.repost.includes(userInfo.username) ? (
                      <IconButton onClick={repostHandler}>
                        <RepeatIcon />
                        {post.repost.length}
                      </IconButton>
                    ) : post &&
                      userInfo &&
                      post.repost.includes(userInfo.username) ? (
                      <IconButton onClick={unrepostHandler}>
                        <RepeatIcon className={classes.activeRepost} />
                        {post.repost.length}
                      </IconButton>
                    ) : (
                      <IconButton onClick={repostHandler}>
                        <RepeatIcon />
                        {post.repost.length}
                      </IconButton>
                    )}
                    Repost
                    {post &&
                    userInfo &&
                    !post.likes.includes(userInfo.username) ? (
                      <IconButton
                        onClick={likeHandler}
                        aria-label="indicar me gusta"
                        className={classes.likeIcon}
                      >
                        <Grid container alignItems="center">
                          <StarOutlineIcon />
                          {post.likes.length}{" "}
                        </Grid>
                      </IconButton>
                    ) : post &&
                      userInfo &&
                      post.likes.includes(userInfo.username) ? (
                      <IconButton
                        onClick={unlikeHandler}
                        aria-label="ya no me gusta"
                      >
                        <Grid
                          container
                          alignItems="center"
                          className={classes.likeIcon}
                        >
                          <StarIcon className={classes.likedIcon} />
                          {post.likes.length}{" "}
                        </Grid>
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={likeHandler}
                        aria-label="indicar me gusta"
                        className={classes.likeIcon}
                      >
                        <Grid container alignItems="center">
                          <StarOutlineIcon />
                          {post.likes.length}{" "}
                        </Grid>
                      </IconButton>
                    )}
                    Me gusta
                    <IconButton aria-label="share">
                      <ScreenShareOutlinedIcon />
                    </IconButton>
                  </CardActions>
                  {commentForm ? (
                    <Box className={classes.commentForm}>
                      <Grid container alignItems="center">
                        <Grid item xs={10}>
                          <TextField
                            id="comment-form"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            fullWidth
                            label="Agregar un comentario..."
                          ></TextField>
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            className={classes.activeComment}
                            variant="outlined"
                            size="small"
                            onClick={submitCommentHandler}
                          >
                            +1 <ChatIcon className={classes.iconSmall} />
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  ) : null}
                </Card>
                <Divider />
                {post.comments
                  ? post.comments.map((comment) => (
                      <RenderComments key={comment._id} comment={comment} />
                    ))
                  : null}
              </Grid>
              <Hidden>
                <TopicsNav />
              </Hidden>
            </Grid>
          </Grid>
        )}
      </Grid>
      {
        // console.log("props", props)}
        // {console.log("postId", postId)}
        // {console.log("commentAdd", commentAdd)} {console.log("comment", comment)}
      }
    </Container>
  );
}
