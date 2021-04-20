import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listPosts } from "../actions/postActions";
import ReactLoading from "react-loading";
import MessageBox from "../components/MessageBox";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Grid,
  Container,
  Button,
  AppBar,
} from "@material-ui/core";
import RenderPost from "../components/RenderPost";
import { useState } from "react";
import { listUsers } from "../actions/userActions";
import { POST_LIST_RESET } from "../constants/postConstants";
import PropTypes from "prop-types";

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
  const query = props.match.params.query;
  const profile = props.match.params.profile;
  const order = useState("nuevos");

  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList);
  const { loading, error, success: successPosts, posts } = postList;
  const userList = useSelector((state) => state.userList);

  const [showing, setShowing] = useState(0);
  const {
    loading: loadingUsers,
    success: successUsers,
    error: errorUsers,
    users,
  } = userList;

  useEffect(() => {
    dispatch(listPosts({ post: query, order }));
    dispatch(listUsers({ user: query }));
  }, [query]);

  const getFilterUrl = (filter) => {
    const filterQuery = filter.query || query;
    const filterProfile = filter.profile || profile;
    const sortOrder = filter.order || order;
    return `/search/?query=${filterQuery}&profile=${filterProfile}&order=${sortOrder}`;
  };
  // console.log("props", props);
  console.log("posts", posts);
  console.log("users", users);

  const handleChange = (event, newValue) => {
    setShowing(newValue);
  };

  return (
    <Grid container justify="center">
      <Grid item xs={3}></Grid>
      <Grid item xs={12} md={6}>
        <AppBar position="static" color="default">
          <Tabs
            //TODO: Render condicional de users y posts
            value={showing}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        {loading ? (
          <ReactLoading color="#2d91f0" type="bars" />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {posts && posts.length === 0 && (
              <MessageBox>Nada que mostrar</MessageBox>
            )}
            {posts
              ? posts.map((post) => <RenderPost key={post._id} post={post} />)
              : null}
          </>
        )}
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
}
