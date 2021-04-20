import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import ScreenShareOutlinedIcon from "@material-ui/icons/ScreenShareOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import StarIcon from "@material-ui/icons/Star";
import {
  addComment,
  likePost,
  repostPost,
  unlikePost,
  unrepostPost,
} from "../actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import ChatIcon from "@material-ui/icons/Chat";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
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

export default function RenderPost(props) {
  const classes = useStyles();
  const { post } = props;
  const { profile } = post.profile;
  const [commentForm, setCommentForm] = useState(false);
  const [comment, setComment] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const postId = post._id;
  const dispatch = useDispatch();

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
    <Card variant="outlined" key={post._id} className={classes.root}>
      <CardHeader
        avatar={
          <Link to={`/${profile.username}`}>
            <Avatar
              aria-label="recipe"
              src={post ? profile.profile : null}
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
          <Link to={`/${profile.username}`}>
            <div>
              <Typography color="textPrimary" variant="h6">
                {profile.name + " " + profile.lastname}
              </Typography>
              <Typography color="textSecondary">
                <strong>{profile.username}</strong>
              </Typography>
            </div>
          </Link>
        }
        subheader={
          "Publicado el: " +
          post.createdAt.substring(0, 10) +
          "   A las:  " +
          post.createdAt.substring(11, 16)
        }
      />

      {
        // TODO: Revisar por que solo devuelve el ID Del autor
        // Pero no otras caracteristicas.
      }
      {
        //console.log("props", props)
      }
      <Link to={`/${profile.username}/post/${post._id}`}>
        {post.image ? (
          <CardMedia
            className={classes.media}
            image={post.image}
            title="Paella dish"
          />
        ) : null}
        <CardContent>
          <Typography variant="body" color="textPrimary" component="p">
            {post.post}
          </Typography>
        </CardContent>
      </Link>
      <CardActions disableSpacing>
        <IconButton
          className={classes.commentBtn}
          onClick={() => setCommentForm(true)}
        >
          {!commentForm ? (
            <ChatBubbleOutlineIcon />
          ) : (
            <ChatIcon className={classes.activeComment} />
          )}{" "}
          {post.comments.length}
        </IconButton>
        {post && userInfo && !post.repost.includes(userInfo.username) ? (
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
        {post && userInfo && !post.likes.includes(userInfo.username) ? (
          <IconButton
            className={classes.likeIcon}
            onClick={likeHandler}
            aria-label="indicar me gusta"
          >
            <Grid container alignItems="center">
              <StarOutlineIcon />
              {post.likes.length}{" "}
            </Grid>
          </IconButton>
        ) : (
          <IconButton onClick={unlikeHandler} aria-label="ya no me gusta">
            <Grid container alignItems="center" className={classes.likeIcon}>
              <StarIcon className={classes.likedIcon} />
              {post.likes.length}{" "}
            </Grid>
          </IconButton>
        )}
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
      {
        // console.log("post", post)
      }
    </Card>
  );
}
