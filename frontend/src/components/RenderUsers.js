import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  ListItem,
  List,
  Avatar,
  Box,
  Typography,
  Divider,
  Grid,
  Grow,
} from "@material-ui/core";
import { followUser, unfollowUser, detailsUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  USER_FOLLOW_RESET,
  USER_UNFOLLOW_RESET,
} from "../constants/userConstants";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import ReactLoading from "react-loading";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  followButton: {
    display: "block",
    borderRadius: "1rem",
    color: [theme.palette.background.paper],
    backgroundColor: [theme.palette.secondary.main], //"#ff6100",
    fontWeight: "bold",
    border: "2px solid transparent",
    boxShadow: "0px",
    "&:hover": {
      backgroundColor: [theme.palette.background.paper],
      border: `2px solid ${[theme.palette.secondary.main]}`,
      color: [theme.palette.secondary.main],
    },
  },
  unfollowButton: {
    display: "block",
    borderRadius: "1rem",
    backgroundColor: [theme.palette.background.paper],
    fontWeight: "bold",
    border: `2px solid ${[theme.palette.secondary.main]}`,
    color: [theme.palette.secondary.main],
    boxShadow: "0px",
    "&:hover": {
      backgroundColor: "#ff3232",
      border: "2px solid transparent",
      color: "#ffffff",
    },
  },
}));

export default function RenderUsers(props) {
  const dispatch = useDispatch();
  const { user } = props;
  const classes = useStyles();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userFollow = useSelector((state) => state.userFollow);
  const { success: successFollow } = userFollow;
  const userUnfollow = useSelector((state) => state.userUnfollow);
  const { success: successUnfollow } = userUnfollow;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error } = userDetails;

  const followHandler = () => {
    if (userInfo) {
      dispatch(followUser(user.username));
    }
  };
  const unfollowHandler = () => {
    if (userInfo) {
      dispatch(unfollowUser(user.username));
    }
  };

  useEffect(() => {
    if (successFollow) {
      dispatch(detailsUser(user._id));
      dispatch({ type: USER_FOLLOW_RESET });
    }
    if (successUnfollow) {
      dispatch(detailsUser(user._id));
      dispatch({ type: USER_UNFOLLOW_RESET });
    }
    dispatch(detailsUser(user._id));
  }, [dispatch, successFollow, user._id, successUnfollow]);

  return (
    <Grow in {...{ timeout: 1000 }}>
      <Grid>
        {loading ? (
          <ReactLoading className="loading" color="#2d91f0" type="cylon" />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <List disablePadding className={classes.root}>
            <Link to={`/${user.profile.username}`}>
              <ListItem key={user._id} button>
                <ListItemAvatar>
                  <Avatar alt={user.username} src={user.profile.profile} />
                </ListItemAvatar>
                <ListItemText
                  id={user}
                  primary={
                    <Typography variant="h6" color="textPrimary">
                      {`${user.profile.name} ${user.profile.lastname}`}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      {`@${user.profile.username}`}
                      <Typography variant="body2" color="textPrimary">
                        {user.profile.description}
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  {user.followers || user.following ? (
                    user &&
                    userInfo &&
                    !user.followers.includes(userInfo.username) ? (
                      <Button
                        disableElevation
                        variant="contained"
                        classes={{ root: classes.followButton }}
                        onClick={followHandler}
                      >
                        Seguir
                      </Button>
                    ) : user &&
                      userInfo &&
                      user.followers.includes(userInfo.username) ? (
                      <Button
                        disableElevation
                        classes={{ root: classes.unfollowButton }}
                        onClick={unfollowHandler}
                      >
                        Dejar de seguir
                      </Button>
                    ) : (
                      !userInfo && (
                        <Link to="/signin">
                          <Button
                            disableElevation
                            variant="contained"
                            classes={{ root: classes.followButton }}
                            onClick={followHandler}
                          >
                            Seguir
                          </Button>
                        </Link>
                      )
                    )
                  ) : null}
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
            <Divider component="li" />
          </List>
        )}
      </Grid>
    </Grow>
  );
}
