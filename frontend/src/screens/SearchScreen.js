import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPosts } from "../actions/postActions";
import ReactLoading from "react-loading";
import MessageBox from "../components/MessageBox";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Grid,
  AppBar,
  makeStyles,
  Divider,
} from "@material-ui/core";
import RenderPost from "../components/RenderPost";
import { useState } from "react";
import { listUsers } from "../actions/userActions";
import PropTypes from "prop-types";
import RenderUsers from "../components/RenderUsers";

const useStyles = makeStyles((theme) => ({
  tabs: {
    backgroundColor: "#ffffff",
    marginTop: "0.5rem",
  },
  divider: {
    backgroundColor: "#ffffff",
    padding: "0.5rem",
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function SearchScreen(props) {
  const classes = useStyles();
  const query = props.match.params.query;
  const profile = props.match.params.profile;
  const order = useState("nuevos");

  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList);
  const { loading, error, posts } = postList;
  const userList = useSelector((state) => state.userList);
  const userFollow = useSelector((state) => state.userFollow);
  const { success: successFollow } = userFollow;
  const userUnfollow = useSelector((state) => state.userUnfollow);
  const { success: successUnfollow } = userUnfollow;
  const {
    loading: loadingUsers,
    success: successUsers,
    error: errorUsers,
    users,
  } = userList;

  const [showing, setShowing] = useState(0);

  useEffect(() => {
    dispatch(listPosts({ post: query, order }));
    dispatch(listUsers({ user: query }));
  }, [query, successFollow, successUnfollow]);

  const getFilterUrl = (filter) => {
    const filterQuery = filter.query || query;
    const filterProfile = filter.profile || profile;
    const sortOrder = filter.order || order;
    return `/search/?query=${filterQuery}&profile=${filterProfile}&order=${sortOrder}`;
  };
  // console.log("props", props);
  console.log("posts", posts);
  console.log("users", users);
  console.log("showing", showing);

  const handleChange = (event, newValue) => {
    setShowing(newValue);
  };

  return (
    <Grid container justify="center">
      <Grid item xs={3}></Grid>
      <Grid item xs={12} md={6}>
        <AppBar position="static" className={classes.tabs}>
          <Tabs
            //TODO: Render condicional de users y posts
            value={showing}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
          >
            <Tab label="Destacados" {...a11yProps(0)} />
            <Tab label="Mas recientes" {...a11yProps(1)} />
            <Tab label="Usuarios" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <Divider light />

        <Grid className={classes.divider}></Grid>
        <Divider />
        {loading ? (
          <ReactLoading color="#2d91f0" type="bars" />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {posts && posts.length === 0 && showing === 0 && (
              <MessageBox>
                Lo sentimos, no encontramos publicaciones que incluyan las
                palabras solicitadas.
              </MessageBox>
            )}
            {posts && posts.length === 0 && showing === 1 && (
              <MessageBox>
                Lo sentimos, no encontramos publicaciones que incluyan las
                palabras solicitadas.
              </MessageBox>
            )}
            {users && users.length === 0 && showing === 2 && (
              <MessageBox>No se encontraron usuarios.</MessageBox>
            )}
            {posts && showing === 1
              ? posts.map((post) => <RenderPost key={post._id} post={post} />)
              : null}
            {users && showing === 2
              ? users.map((user) => <RenderUsers key={user._id} user={user} />)
              : null}
          </>
        )}
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
}
