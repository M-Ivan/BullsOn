import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { detailsPost } from "../actions/postActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
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
        <ListItemAvatar>
          <Avatar alt={profile.username} src={profile.profile} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography color="textPrimary" variant="h7">
              {`${profile.name} ${profile.lastname}`}
            </Typography>
          }
          secondary={
            <Box>
              <Typography color="textSecondary">
                <strong>{profile.username}</strong>{" "}
              </Typography>
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
      <Divider variant="inset" component="li" />
    </List>
  );
}
