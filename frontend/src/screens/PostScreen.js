import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import RenderPost from "../components/RenderPost";
import { detailsPost } from "../actions/postActions";
import MessageBox from "../components/MessageBox";
import ReactLoading from "react-loading";
import { Container, Button, Grid } from "@material-ui/core/index";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ScreenShareOutlinedIcon from "@material-ui/icons/ScreenShareOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import StarIcon from "@material-ui/icons/Star";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import RenderComments from "../components/RenderComments";

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
}));

export default function PostScreen(props) {
  const classes = useStyles();
  const postId = props.match.params.id;
  const dispatch = useDispatch();
  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post } = postDetails;

  useEffect(() => {
    dispatch(detailsPost(postId));
  }, [postId, dispatch]);

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
                      <IconButton>
                        <ChatBubbleOutlineIcon />
                        {post.comments.length}{" "}
                      </IconButton>{" "}
                      Respuestas
                      <IconButton>
                        <RepeatIcon />
                        {post.repost}{" "}
                      </IconButton>{" "}
                      Repost
                      <IconButton aria-label="add to favorites">
                        <StarIcon />
                        {post.likes}{" "}
                      </IconButton>
                      Me gusta{" "}
                      <IconButton aria-label="share">
                        <ScreenShareOutlinedIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                  {post.comments
                    ? post.comments.map((comment) => (
                        //TODO: Hacer backend y frontend del POST COMMENT
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
      {console.log("props", props)}
      {console.log("post", post)}{" "}
    </>
  );
}
