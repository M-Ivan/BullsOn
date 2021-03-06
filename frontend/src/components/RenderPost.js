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
  MenuItem,
  Menu,
  Slide,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import ScreenShareOutlinedIcon from "@material-ui/icons/ScreenShareOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link, withRouter } from "react-router-dom";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import StarIcon from "@material-ui/icons/Star";
import {
  addComment,
  deletePost,
  likePost,
  repostPost,
  unlikePost,
  unrepostPost,
} from "../actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import ChatIcon from "@material-ui/icons/Chat";
import { DeleteOutline } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    borderBottom: "1px solid #e0e0e0",
    borderRadius: "0px",
    // Provisorio hasta diseñar el lado derecho
    [theme.breakpoints.up("md")]: {},
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
  repostBtn: {
    "&:hover": {
      color: "#00bb1b",
    },
  },
  likeBtn: {
    "&:hover": {
      color: "#ffc900",
    },
  },
  activeComment: {
    border: 0,
    color: "#006eff",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#006eff",
    },
  },
  activeRepost: {
    color: "#00bb1b",
  },
  activeLike: {
    color: "#ffc900",
  },
  commentForm: {
    padding: "1rem",
  },
}));

export default withRouter(function RenderPost(props) {
  const classes = useStyles();
  const { post } = props;
  const { profile } = post.profile;
  const [commentForm, setCommentForm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [comment, setComment] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const postId = post._id;
  const dispatch = useDispatch();

  const submitCommentHandler = () => {
    if (userInfo) {
      dispatch(addComment(postId, comment));
      setCommentForm(false);
    } else {
      props.history.push("/signin");
      setCommentForm(false);
    }
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const deleteHandler = () => {
    if (userInfo.username === post.profile._id) {
      dispatch(deletePost(postId));
      props.history.push("/");
    }
    setAnchorEl(null);
  };

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

  return (
    <Slide direction="up" in {...{ timeout: 1000 }}>
      <Card className={classes.root} elevation={0} key={post._id}>
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
            <Box>
              <IconButton
                className={classes.navlink}
                aria-label="settings"
                onClick={handleClick}
                aria-controls="simple-menu"
                aria-haspopup="true"
              >
                <MoreVertIcon />{" "}
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={deleteHandler}>
                  <DeleteOutline />
                  Borrar post
                </MenuItem>
              </Menu>
            </Box>
          }
          title={
            <Link to={`/${profile.username}`}>
              <div>
                <Typography color="textPrimary" variant="h6">
                  {profile.name + " " + profile.lastname}
                </Typography>
                <Typography color="textSecondary">
                  <strong>@{profile.username}</strong>
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
        <Link to={`/${profile.username}/post/${post._id}`}>
          {post.image ? (
            <CardMedia className={classes.media} image={post.image} />
          ) : null}
          <CardContent>
            <Typography variant="body" color="textPrimary" component="p">
              {post.post}
            </Typography>
          </CardContent>
        </Link>
        <CardActions disableSpacing>
          {post ? (
            <IconButton
              className={classes.commentBtn}
              onClick={() => setCommentForm(true)}
            >
              {!commentForm ? (
                <ChatBubbleOutlineIcon />
              ) : (
                <ChatIcon className={classes.activeComment} />
              )}
              {post.comments.length}
            </IconButton>
          ) : (
            <IconButton className={classes.commentBtn}>
              <ChatBubbleOutlineIcon />
              {post.comments.length}
            </IconButton>
          )}

          {post && userInfo && !post.repost.includes(userInfo.username) ? (
            <IconButton onClick={repostHandler} className={classes.repostBtn}>
              <RepeatIcon />
              {post.repost.length}
            </IconButton>
          ) : (
            post &&
            userInfo &&
            post.repost.includes(userInfo.username) && (
              <IconButton
                onClick={unrepostHandler}
                className={classes.repostBtn}
              >
                <RepeatIcon className={classes.activeRepost} />
                {post.repost.length}
              </IconButton>
            )
          )}
          {post && userInfo && !post.likes.includes(userInfo.username) ? (
            <IconButton
              className={classes.likeBtn}
              onClick={likeHandler}
              aria-label="indicar me gusta"
            >
              <Grid container alignItems="center">
                <StarOutlineIcon />
                {post.likes.length}{" "}
              </Grid>
            </IconButton>
          ) : (
            post &&
            userInfo &&
            post.likes.includes(userInfo.username) && (
              <IconButton
                onClick={unlikeHandler}
                aria-label="ya no me gusta"
                className={classes.likeBtn}
              >
                <Grid container alignItems="center">
                  <StarIcon className={classes.activeLike} />
                  {post.likes.length}{" "}
                </Grid>
              </IconButton>
            )
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
            </Grid>
          </Box>
        ) : null}
      </Card>
    </Slide>
  );
});
