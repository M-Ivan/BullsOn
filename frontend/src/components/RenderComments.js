import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  Box,
  Divider,
  ListItemText,
  ListItemAvatar,
  Grid,
  Avatar,
  Typography,
  Button,
  Grow,
} from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { likeComment, unlikeComment } from "../actions/commentActions";
import { detailsPost } from "../actions/postActions";
import {
  COMMENT_LIKE_RESET,
  COMMENT_UNLIKE_RESET,
} from "../constants/commentConstants";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  button: {
    color: "#000",
    padding: 0,
    "&:hover": {
      backgroundColor: "#00000000",
      textDecoration: "underline",
    },
  },
  ActiveButton: {
    color: "#2878e1",
    "&:hover": {
      backgroundColor: "#00000000",
      textDecoration: "underline",
    },
  },
  icon: {
    width: "20px",
    height: "20px",
    color: "#2878e1",
  },
}));

export default function RenderComments(props) {
  const { comment, postId, commentId } = props;
  const { profile } = comment.profile;
  const classes = useStyles();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const commentLike = useSelector((state) => state.commentLike);
  const commentUnlike = useSelector((state) => state.commentUnlike);
  const { success: successLike } = commentLike;
  const { success: successUnlike } = commentUnlike;

  useEffect(() => {
    if (successLike) {
      dispatch(detailsPost(postId));
      dispatch({ type: COMMENT_LIKE_RESET });
    }
    if (successUnlike) {
      dispatch(detailsPost(postId));
      dispatch({ type: COMMENT_UNLIKE_RESET });
    }
  }, [successLike, successUnlike, postId, dispatch]);

  const likeHandler = () => {
    if (userInfo) {
      dispatch(likeComment(postId, commentId));
    } else {
      props.history.push("/signin");
    }
  };
  const unlikeHandler = () => {
    if (userInfo) {
      dispatch(unlikeComment(postId, commentId));
    } else {
      props.history.push("/signin");
    }
  };

  return (
    <Grow in {...{ timeout: 700 }}>
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <Link to={`/${profile.username}`}>
            <ListItemAvatar>
              <Avatar alt={profile.username} src={profile.profile} />
            </ListItemAvatar>
          </Link>
          <ListItemText
            primary={
              <Link to={`/${profile.username}`}>
                <Typography color="textPrimary" variant="h7">
                  <strong>{`${profile.name} ${profile.lastname}`}</strong>
                </Typography>{" "}
              </Link>
            }
            secondary={
              <Box>
                <Link to={`/${profile.username}`}>
                  <Typography color="textSecondary">
                    <strong>{profile.username}</strong>{" "}
                  </Typography>
                </Link>
                <Typography color="textSecondary" gutterBottom>
                  {"Publicado el: " +
                    comment.createdAt.substring(0, 10) +
                    " A las: " +
                    comment.createdAt.substring(11, 16)}
                </Typography>
                <Typography
                  component="span"
                  variant="body1"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {comment.comment} <br />
                  <Grid container alignItems="center">
                    {comment.likes.length > 0 ? comment.likes.length : null}
                    {comment.likes.includes(userInfo.username) ? (
                      <Button
                        onClick={unlikeHandler}
                        className={classes.ActiveButton}
                      >
                        Ya no me gusta
                        <ThumbUpIcon className={classes.icon} />
                      </Button>
                    ) : (
                      <Button onClick={likeHandler} className={classes.button}>
                        Me gusta
                        <ThumbUpIcon className={classes.icon} />
                      </Button>
                    )}
                  </Grid>
                </Typography>
              </Box>
            }
          />
        </ListItem>

        <Divider component="li" />
      </List>
    </Grow>
  );
}
