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
import { addComment, likePost } from "../actions/postActions";
import { useDispatch } from "react-redux";

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
  const postId = post._id;
  const dispatch = useDispatch();

  const submitCommentHandler = () => {
    dispatch(addComment(postId, comment));
  };

  const likeHandler = () => {
    dispatch(likePost(postId));
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
        <IconButton color="primary" onClick={() => setCommentForm(true)}>
          <ChatBubbleOutlineIcon />
          {post.comments.length}
        </IconButton>
        <IconButton>
          <RepeatIcon />
          {post.repost}
        </IconButton>
        <IconButton onClick={likeHandler} aria-label="add to favorites">
          <StarIcon
          // TODO LIKE HANDLER
          />
          {post.likes.length}
        </IconButton>{" "}
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
                className={classes.commentBtn}
                variant="outlined"
                color="primary"
                size="small"
                onClick={submitCommentHandler}
              >
                +1 <ChatBubbleOutlineIcon className={classes.iconSmall} />
              </Button>
            </Grid>
          </Grid>{" "}
        </Box>
      ) : null}
      {console.log("post", post)}
    </Card>
  );
}
