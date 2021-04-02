import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import ReactLoading from "react-loading";
import { Container, Button, Grid, makeStyles } from "@material-ui/core/index";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { detailsUser } from "../actions/userActions";
import { red } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  root: {
    maxWidth: "auto",
    "&:hover": {
      cursor: "normal",
    },
  },
  media: {
    height: 170,
  },
  avatar: {
    backgroundColor: red[500],
    width: "100px",
    height: "100px",
    border: "5px solid #000000",
    zIndex: "10",
  },
});

export default function ProfileScreen(props) {
  console.log(props.match.params);

  const classes = useStyles();
  const dispatch = useDispatch();
  const profileId = props.match.params.id;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user && userInfo) {
      dispatch(detailsUser(userInfo._id));
    }
  }, [dispatch, userInfo, user]);

  return (
    <div>
      {console.log("userDetails", userDetails.user)}
      {console.log("userinfo", userInfo)}

      <Container fixed maxWidth="md">
        <h1>Perfil</h1>
        <Card variant="outlined" className={classes.root}>
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
              image="/images/p1.jpg"
            ></CardMedia>
          </Box>
          <Grid container>
            <Grid item xs={3}>
              <Grid container alignItems="center" direction="column">
                <Avatar
                  src={user ? user.author.profilePic : null}
                  className={classes.avatar}
                ></Avatar>
              </Grid>
            </Grid>
            <Grid item xs={9}>
              <Grid container direction="column" alignItems="flex-end">
                {userInfo && user && userInfo._id !== user._id ? (
                  <Box m={3}>
                    <Button size="large" variant="contained" color="primary">
                      Seguir
                    </Button>
                  </Box>
                ) : (
                  <Box m={3}>
                    <Button size="large" variant="outlined" color="primary">
                      Editar perfil
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2">
              {user ? user.name : null}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
            ></Typography>
            <Typography variant="body" component="p"></Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
