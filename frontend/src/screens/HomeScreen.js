import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Typography,
  MenuItem,
  InputLabel,
  Select,
  Slide,
  FormControl,
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
  formControl: {
    marginTop: [theme.spacing(1)],
    minWidth: 120,
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
  const postDelete = useSelector((state) => state.postDelete);
  const { success: successDelete } = postDelete;
  const [order, setOrder] = useState("Destacados");

  useEffect(() => {
    if (!userInfo) {
      props.history.push("/signin");
    }
    dispatch(listPosts({ order: order }));
    if (successCreate) {
      dispatch({ type: POST_CREATE_RESET });
    }
    if (
      successUnrepost ||
      successRepost ||
      successLikeAdd ||
      successLikeRemove ||
      successCommentAdd ||
      successDelete
    ) {
      dispatch(listPosts({ order: order }));
    }
    dispatch(listPosts({ order: order }));
  }, [
    createdPost,
    dispatch,
    successCommentAdd,
    successLikeAdd,
    successUnrepost,
    successRepost,
    successLikeRemove,
    successCreate,
    successDelete,
    props.history,
    userInfo,
    order,
  ]);

  console.log("order", order);
  return (
    <div>
      <Container maxWidth="lg" fixed>
        <Grid container className={classes.root}>
          <Grid item xs={12} className={classes.title}>
            <Slide direction="left" in {...{ timeout: 1000 }}>
              <Grid container justify="space-between" alignItems="center">
                <Typography variant="h4" color="textPrimary">
                  Inicio
                </Typography>

                <FormControl className={classes.formControl}>
                  <InputLabel id="order-label">
                    <Typography color="textSecondary">Ordenar por:</Typography>
                  </InputLabel>
                  <Select
                    labelId="order-label"
                    id="demo-simple-select"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                  >
                    <MenuItem value="Destacados">Destacados</MenuItem>
                    <MenuItem value="Recientes">Recientes</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Slide>
          </Grid>

          <Grid container justify="center">
            <NavLarge />
            <Grid item xs={12} lg={6}>
              {userInfo && <PostCreateBox />}
              <Grid item xs={12}>
                <div
                  className="feed-separation"
                  style={{ marginTop: "0.5rem" }}
                >
                  <br />
                </div>
              </Grid>
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
