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
  },
  media: {
    height: 140,
    position: "relative",
  },
  avatar: {
    backgroundColor: red[500],
    width: "80px",
    height: "80px",
    border: "5px solid #000000",
    zIndex: "10",
  },
});

export default function ProfileScreen(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profileId = props.match.params.id;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user) {
      dispatch(detailsUser(userInfo._id));
    }
  }, [dispatch, userInfo._id, user]);

  return (
    <div>
      {console.log("userDetails", userDetails.user)}
      <Container fixed maxWidth="md">
        <h1>Perfil</h1>
        <Card className={classes.root}>
          {
            //  loading ? (
            //   <div className="row center">
            //      <ReactLoading className="loading" color="#2d91f0" type="cylon" />{" "}
            //    </div>
            //  ) : error ? (
            //    <MessageBox variant="danger">{error}</MessageBox>
            //  ) : null
          }
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="/images/p1.jpg"
            ></CardMedia>
            <Grid container>
              <Grid item xs={2}>
                <Avatar
                  src={user ? user.author.profilePic : null}
                  aria-label="recipe"
                  className={classes.avatar}
                ></Avatar>
              </Grid>
              <Grid item xs={10}>
                <Grid container direction="column" alignItems="flex-end">
                  <Button size="large" variant="contained" color="primary">
                    Seguir
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {user ? user.name : null}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              ></Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    </div>
  );
}
