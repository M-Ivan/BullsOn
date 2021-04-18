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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginTop: "1rem",
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
    postId,
    dispatch,
    successCommentAdd,
    successLikeAdd,
    successUnrepost,
    successRepost,
    successLikeRemove,
  ]);

  const submitCommentHandler = () => {
    dispatch(addComment(postId, comment));
    setCommentForm(false);
  };

  const likeHandler = () => {
    dispatch(likePost(postId));
  };
  const unlikeHandler = () => {
    dispatch(unlikePost(postId));
  };
  const repostHandler = () => {
    dispatch(repostPost(postId));
  };
  const unrepostHandler = () => {
    dispatch(unrepostPost(postId));
  };

  return (
    <>
      {loading ? (
        <ReactLoading className="loading" color="#2d91f0" type="cylon" />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Container maxWidth="xl">
            <Grid xs={12}>
              <Grid container direction="row" justify="center">
                <Grid item xs={3}>
                  <h1>Links de nav</h1>
                </Grid>
                <Grid item xs={6}>
                  <Card
                    variant="outlined"
                    key={post._id}
                    className={classes.root}
                  >
                    <Link to={`/${post.profile.profile.username}`}>
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            src={post ? post.profile.profile.profile : null}
                            className={classes.avatar}
                          ></Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={
                          <div>
                            <Typography color="textPrimary" variant="h6">
                              {post.profile.profile.name +
                                " " +
                                post.profile.profile.lastname}
                            </Typography>
                            <Typography color="textSecondary">
                              <strong> {post.profile.profile.username}</strong>
                            </Typography>
                          </div>
                        }
                        subheader={
                          "Publicado el: " +
                          post.createdAt.substring(0, 10) +
                          "   A las:  " +
                          post.createdAt.substring(11, 16)
                        }
                      />
                    </Link>

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
                      ) : (
                        <IconButton onClick={unrepostHandler}>
                          <RepeatIcon className={classes.activeRepost} />
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
                      ) : (
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
                        </Grid>{" "}
                      </Box>
                    ) : null}
                  </Card>
                  {post.comments
                    ? post.comments.map((comment) => (
                        <RenderComments key={comment._id} comment={comment} />
                      ))
                    : null}
                </Grid>
                <Grid item xs={3}>
                  <h1>Perfiles del post</h1>
                </Grid>{" "}
              </Grid>
            </Grid>
          </Container>
        </>
      )}
      {
        // console.log("props", props)}
        // {console.log("postId", postId)}
        // {console.log("commentAdd", commentAdd)} {console.log("comment", comment)}
      }
    </>
  );
}
