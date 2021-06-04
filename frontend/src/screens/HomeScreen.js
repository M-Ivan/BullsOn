import React, { useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Divider,
  Typography,
} from "@material-ui/core/index";
import RenderPost from "../components/RenderPost";
import { useDispatch, useSelector } from "react-redux";
import { POST_CREATE_RESET } from "../constants/postConstants";
import { listPosts } from "../actions/postActions";
import MessageBox from "../components/MessageBox";
import ReactLoading from "react-loading";

import NavLarge from "../components/NavLarge";
import TopicsNav from "../components/TopicsNav";
import PostCreateBox from "../components/PostCreateBox";

const useStyles = makeStyles((theme) => ({
  root: {
    borderLeft: "1px solid #e0e0e0",
    borderRight: "1px solid #e0e0e0",
    borderBottom: "1px solid #e0e0e0",
  },
  title: {
    marginLeft: "0rem",
    padding: "1rem 2rem",
    borderTop: "1px solid #e0e0e0",
    borderBottom: "1px solid #e0e0e0",
  },
}));

export default function HomeScreen(props) {
  const classes = useStyles();
  //Hooks
  const postList = useSelector((state) => state.postList);
  const { loading, error, posts } = postList;
  const postCreate = useSelector((state) => state.postCreate);
  const { success: successCreate, post: createdPost } = postCreate;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

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
    if (!userInfo) {
      props.history.push("/signin");
    }
    dispatch(listPosts({}));
    if (successCreate) {
      dispatch({ type: POST_CREATE_RESET });
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

  return (
    <div>
      <Container maxWidth="lg" fixed>
        <Grid container className={classes.root}>
          <Grid item xs={12} className={classes.title}>
            <Typography variant="h4" color="textPrimary">
              Inicio
            </Typography>
          </Grid>

          <Grid container justify="center">
            <NavLarge />
            <Grid item xs={12} lg={6}>
              {userInfo && <PostCreateBox />}
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
            <TopicsNav />
          </Grid>
        </Grid>
      </Container>{" "}
    </div>
  );
}
