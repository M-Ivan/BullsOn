import React, { useState, useEffect } from "react";
import { Container, Button, Grid, makeStyles } from "@material-ui/core/index";
import TextField from "@material-ui/core/TextField";
import ReactLoading from "react-loading";
import RenderPost from "../components/RenderPost";
import { useDispatch, useSelector } from "react-redux";
import { POST_CREATE_RESET } from "../constants/postConstants";
import { listPosts, createPost } from "../actions/postActions";
import MessageBox from "../components/MessageBox";

const useStyles = makeStyles({
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
  },
});

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

  useEffect(() => {
    dispatch(listPosts({}));
    if (successCreate) {
      dispatch({ type: POST_CREATE_RESET });
    }
    // if (successDelete) {
    //  dispatch({ type: PRODUCT_DELETE_RESET });
    // }
    dispatch(listPosts({ author: userInfo._id }));
  }, [createdPost, dispatch, props.history, successCreate, userInfo._id]);

  const submitHandler = (e) => {
    e.preventDefault();
    //Hace dispatch al nuevo post
    dispatch(createPost(post));
  };

  return (
    <div>
      <Container maxWidth="md" fixed>
        <Grid container justify="flex-start" direction="column">
          <Grid item xs={12}>
            <h1>Inicio</h1>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <hr />
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={submitHandler}>
            <Grid
              container
              className="form-control"
              direction="column"
              justify="center"
            >
              <TextField
                id="postText"
                multiline
                label="Comparte con el mundo"
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
              {post.length > 0 ? (
                <Button
                  classes={{
                    root: classes.btnRoundedOr,
                  }}
                  variant="contained"
                  type="submit"
                >
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
                  Compartir una idea
                </Button>
              )}
            </Grid>
          </form>
          <Grid item xs={12}>
            <div className="feed-separation">
              <br />
            </div>{" "}
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
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
      </Container>
    </div>
  );
}
