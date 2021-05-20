import React from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, makeStyles } from "@material-ui/core/index";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
} from "@material-ui/core/";
import { followUser, unfollowUser } from "../actions/userActions";
import { red } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  profileRoot: {
    borderRadius: "0px",
    [theme.breakpoints.up("md")]: {},
  },
  media: {
    height: 170,
    width: "100%",
  },
  avatar: {
    backgroundColor: red[500],
    width: "100px",
    height: "100px",
    border: "5px solid #000000",
    zIndex: "10",
  },
  nameSection: {
    margin: theme.spacing(2),
  },
  descriptionSection: {
    margin: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  followSection: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
}));

export default function RenderProfile(props) {
  console.log(props);

  const { user, userInfo, profileId } = props;
  const classes = useStyles();

  const dispatch = useDispatch();

  const editProfileHandler = (e) => {
    props.editProfileCallback(true);
    e.preventDefault();
  };

  const followHandler = () => {
    if (userInfo) {
      dispatch(followUser(profileId));
    } else {
      props.history.push("/signin");
    }
  };
  const unfollowHandler = () => {
    dispatch(unfollowUser(profileId));
  };
  return (
    <Card elevation={0} className={classes.profileRoot}>
      {
        //  loading ? (
        //   <div className="row center">
        //      <ReactLoading className="loading" color="#2d91f0" type="cylon" />{" "}
        //    </div>
        //  ) : error ? (
        //    <MessageBox variant="danger">{error}</MessageBox>
        //  ) : null
      }
      <Box m={1}>
        <CardMedia
          className={classes.media}
          image={
            user.profile.background ? user.profile.background : "/images/p1.jpg"
          }
        ></CardMedia>
      </Box>
      <Grid container>
        <Grid item xs={3}>
          <Grid container alignItems="center" direction="column">
            <Box>
              <Avatar
                src={user ? user.profile.profile : null}
                className={classes.avatar}
              ></Avatar>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Grid container direction="column" alignItems="flex-end">
            {userInfo && user && userInfo._id === user._id ? (
              <Box m={3}>
                <Button
                  size="large"
                  variant="outlined"
                  color="primary"
                  onClick={editProfileHandler}
                >
                  Editar perfil
                </Button>
              </Box>
            ) : userInfo && user.followers.includes(userInfo.username) ? (
              <Box m={3}>
                <Button
                  onClick={unfollowHandler}
                  size="large"
                  variant="contained"
                  color="primary"
                >
                  Dejar de seguir
                </Button>
              </Box>
            ) : (
              <Box m={3}>
                <Button
                  onClick={followHandler}
                  size="large"
                  variant="contained"
                  color="primary"
                >
                  Seguir{" "}
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
      <CardContent>
        <Grid container className={classes.nameSection}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h4" component="h2">
              {user.profile.name + " " + user.profile.lastname}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              {"@" + user.profile.username}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body" color="textPrimary" component="p">
          {" "}
          <Grid container className={classes.descriptionSection}>
            {user.profile.description}
          </Grid>
        </Typography>
        <Divider />
        <Grid container className={classes.followSection}>
          {" "}
          <Typography variant="body" component="p">
            {`${user.following.length} siguiendo
                ${user.followers.length} seguidores`}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
}
