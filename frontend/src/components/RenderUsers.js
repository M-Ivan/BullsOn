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
} from "@material-ui/core";
import { followUser, unfollowUser, detailsUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  USER_FOLLOW_RESET,
  USER_UNFOLLOW_RESET,
} from "../constants/userConstants";
import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  followButton: {
    display: "block",
    borderRadius: "1rem",
    color: "#ffffff",
    backgroundColor: "#ff6100",
    fontWeight: "bold",
    border: "2px solid transparent",
    boxShadow: "0px",
    "&:hover": {
      backgroundColor: "#fff",
      border: "2px solid #ff6100",
      color: "#ff6100",
    },
  },
  unfollowButton: {
    display: "block",
    borderRadius: "1rem",
    backgroundColor: "#ffffff",
    fontWeight: "bold",
    border: "2px solid #ff6100",
    color: "#ff6100",
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
  const classes = useStyles();
  const { user } = props;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userFollow = useSelector((state) => state.userFollow);
  const { success: successFollow } = userFollow;
  const userUnfollow = useSelector((state) => state.userUnfollow);
  const { success: successUnfollow } = userUnfollow;

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
  console.log("userInfo", userInfo);

  useEffect(() => {
    if (successFollow) {
      dispatch(detailsUser(user._id));
      dispatch({ type: USER_FOLLOW_RESET });
    }
    if (successUnfollow) {
      dispatch(detailsUser(user._id));
      dispatch({ type: USER_UNFOLLOW_RESET });
    }
  }, [dispatch, successFollow, user._id, successUnfollow]);

  console.log("user", user);
  return (
    <List disablePadding className={classes.root}>
      <Link to={`/${user.username}`}>
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
                {`@${user.username}`}
                <Typography variant="body2" color="textPrimary">
                  {user.profile.description}
                </Typography>
              </Box>
            }
          />
          <ListItemSecondaryAction>
            {user && userInfo && !user.followers.includes(userInfo.username) ? (
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
            )}
          </ListItemSecondaryAction>
        </ListItem>
      </Link>
      <Divider component="li" />
    </List>
  );
}
