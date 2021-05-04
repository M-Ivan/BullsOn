import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  Box,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function RenderComments(props) {
  const { comment } = props;
  const { profile } = comment.profile;
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {console.log(props)}
      <ListItem alignItems="flex-start">
        <Link to={`/${profile.username}`}>
          <ListItemAvatar>
            <Avatar alt={profile.username} src={profile.profile} />
          </ListItemAvatar>
        </Link>
        <ListItemText
          primary={
            <Link to={`/${profile.username}`}>
              <Typography color="textPrimary" variant="h7">
                {`${profile.name} ${profile.lastname}`}
              </Typography>{" "}
            </Link>
          }
          secondary={
            <Box>
              <Link to={`/${profile.username}`}>
                <Typography color="textSecondary">
                  <strong>{profile.username}</strong>{" "}
                </Typography>
              </Link>
              <Typography color="textSecondary" gutterBottom>
                {"Publicado el: " +
                  comment.createdAt.substring(0, 10) +
                  " A las: " +
                  comment.createdAt.substring(11, 16)}
              </Typography>
              <Typography
                component="span"
                variant="body1"
                className={classes.inline}
                color="textPrimary"
              >
                {comment.comment}
              </Typography>
            </Box>
          }
        />
      </ListItem>
      <Divider component="li" variant="inset" />
    </List>
  );
}
