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
  Container,
  InputBase,
  Slide,
} from "@material-ui/core";
import RenderPost from "../components/RenderPost";
import { useState } from "react";
import { listUsers } from "../actions/userActions";
import PropTypes from "prop-types";
import RenderUsers from "../components/RenderUsers";
import { withRouter } from "react-router";
import NavLarge from "../components/NavLarge";
import TopicsNav from "../components/TopicsNav";

const useStyles = makeStyles((theme) => ({
  root: {
    borderLeft: "1px solid #e0e0e0",
    borderRight: "1px solid #e0e0e0",
    borderBottom: "1px solid #e0e0e0",
    borderRadius: "0px",
  },
  title: {
    marginLeft: "1rem",
    padding: "1rem",
  },
  tabs: {
    borderbottom: "1px solid #e0e0e0",
  },
  divider: {
    backgroundColor: "#cccccc",
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

export default withRouter(function SearchScreen(props) {
  const classes = useStyles();
  const query = props.match.params.query;
  const [profile, setProfile] = useState("");

  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { loading, error, posts } = postList;
  const userList = useSelector((state) => state.userList);
  const userFollow = useSelector((state) => state.userFollow);
  const { success: successFollow } = userFollow;
  const userUnfollow = useSelector((state) => state.userUnfollow);
  const { success: successUnfollow } = userUnfollow;
  const { users } = userList;

  const [showing, setShowing] = useState(0);

  useEffect(() => {
    if (!userInfo) {
      props.history.push("/signin");
    }
    dispatch(listPosts({ post: query }));
    dispatch(listUsers({ user: query }));
  }, [query, successFollow, successUnfollow, props.history, userInfo]);

  const handleChange = (event, newValue) => {
    setShowing(newValue);
  };
  const profileFilterHandler = (e) => {
    if (profile) {
      e.preventDefault();
      dispatch(listPosts({ post: query, profile: profile }));
    }
  };

  return (
    <Container fixed maxWidth="lg">
      <Grid container justify="center" className={classes.root}>
        <Grid item xs={12} className={classes.title}>
          <Slide direction="left" in {...{ timeout: 1000 }}>
            <Box>
              <Typography variant="h4" color="textPrimary">
                Busqueda
              </Typography>
              <form onSubmit={profileFilterHandler}>
                <label>Filtrar por perfil: </label>
                <InputBase
                  label=""
                  placeholder="@ o nombre/apellido"
                  onChange={(e) => setProfile(e.target.value)}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ type: "text", name: "q", id: "q" }}
                />
              </form>{" "}
            </Box>
          </Slide>
        </Grid>{" "}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <NavLarge />
        <Grid item xs={12} md={6}>
          <AppBar
            position="static"
            color="default"
            style={{ borderbottom: "1px solid #e0e0e0" }}
            className={classes.tabs}
            elevation={1}
          >
            <Tabs
              value={showing}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
            >
              <Tab label="Posts" {...a11yProps(0)} />
              <Tab label="Usuarios" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <div className="feed-separation">
            <br />
          </div>

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

              {users && users.length === 0 && showing === 1 && (
                <MessageBox>No se encontraron usuarios.</MessageBox>
              )}
              {posts && showing === 0
                ? posts.map((post) => <RenderPost key={post._id} post={post} />)
                : null}
              {users && showing === 1
                ? users.map((user) => (
                    <RenderUsers key={user._id} user={user} />
                  ))
                : null}
            </>
          )}
        </Grid>
        <TopicsNav />
      </Grid>
    </Container>
  );
});
