import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Grid,
  makeStyles,
  TextField,
  Divider,
  Box,
  withStyles,
  Typography,
} from "@material-ui/core/index";
import ReactLoading from "react-loading";
import RenderPost from "../components/RenderPost";
import { useDispatch, useSelector } from "react-redux";
import { POST_CREATE_RESET } from "../constants/postConstants";
import { listPosts, createPost } from "../actions/postActions";
import MessageBox from "../components/MessageBox";
import PostAddIcon from "@material-ui/icons/PostAdd";

import NavLarge from "../components/NavLarge";

const useStyles = makeStyles((theme) => ({
  root: {
    borderLeft: "1px solid #e0e0e0",
    borderRight: "1px solid #e0e0e0",
    borderBottom: "1px solid #e0e0e0",
  },
  title: {
    marginLeft: "1rem",
    padding: "1rem",
  },
  btnRoundedOr: {
    background: "#ea6d0b",
    borderRadius: "3rem",
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    "&:hover": {
      background: "#e16828",
    },
    postForm: {},
  },
}));

const MyTextField = withStyles({
  root: {
    marginLeft: "1rem",
    marginRight: "1rem",
    marginTop: "0.3rem",

    "& .MuiInput-underline:after": {
      borderBottomColor: "#ea6d0b",
    },
    "& label": {},
    "& label.Mui-focused": {
      color: "#ea6d0b",
    },
    "& .MuiOutlinedInput-root": {
      "& label": {
        fontSize: "1.05rem",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ea6d0b",
      },
    },
  },
})(TextField);

export default function HomeScreen(props) {
  const classes = useStyles();
  //Hooks
  const postList = useSelector((state) => state.postList);
  const { loading, error, posts } = postList;
  const postCreate = useSelector((state) => state.postCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    post: createdPost,
  } = postCreate;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
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

  useEffect(() => {
    dispatch(listPosts({}));
    if (successCreate) {
      dispatch({ type: POST_CREATE_RESET });
      setPost("");
    }
    if (
      successUnrepost ||
      successRepost ||
      successLikeAdd ||
      successLikeRemove ||
      successCommentAdd
    ) {
      dispatch(listPosts({}));
    }
    dispatch(listPosts({}));
  }, [
    createdPost,
    dispatch,
    successCommentAdd,
    successLikeAdd,
    successUnrepost,
    successRepost,
    successLikeRemove,
    successCreate,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    //Hace dispatch al nuevo post
    dispatch(createPost(post));
  };

  return (
    <div>
      <Container maxWidth="lg" fixed>
        <Grid container className={classes.root}>
          <Grid item xs={12} className={classes.title}>
            <Typography variant="h4" color="textPrimary">
              Inicio
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid container justify="center">
            <NavLarge />
            <Grid item xs={12} lg={6}>
              {userInfo ? (
                <Grid item xs={12}>
                  <form onSubmit={submitHandler}>
                    <Grid
                      container
                      className="form-control"
                      direction="column"
                      justify="center"
                    >
                      <MyTextField
                        id="postText"
                        variant="standard"
                        multiline
                        label="Hola, Mundo!"
                        placeholder="En que estas pensando?.."
                        rows={6}
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                      />
                    </Grid>
                    <Grid
                      container
                      justify="center"
                      alignItems="flex-end"
                      direction="column"
                    >
                      {" "}
                      {post.length > 0 ? (
                        <Button
                          classes={{
                            root: classes.btnRoundedOr,
                          }}
                          variant="contained"
                          type="submit"
                        >
                          <PostAddIcon />
                          Compartir una idea
                        </Button>
                      ) : (
                        <Button
                          classes={{
                            root: classes.btnRoundedOr,
                          }}
                          variant="contained"
                          disabled
                        >
                          <PostAddIcon />
                          Compartir una idea
                        </Button>
                      )}
                    </Grid>
                  </form>
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <div className="feed-separation">
                  <br />
                </div>
              </Grid>
              <Divider />
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  {loading ? (
                    <ReactLoading color="#2d91f0" type="bars" />
                  ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                  ) : (
                    <>
                      {posts.length === 0 && (
                        <MessageBox>Nada que mostrar</MessageBox>
                      )}
                      {posts.map((post) => (
                        <RenderPost key={post._id} post={post} />
                      ))}
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </Grid>
      </Container>{" "}
    </div>
  );
}
