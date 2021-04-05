import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ScreenShareOutlinedIcon from "@material-ui/icons/ScreenShareOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import StarIcon from "@material-ui/icons/Star";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RenderPost(props) {
  const classes = useStyles();
  const { post } = props;
  const { profile } = post.profile;

  console.log(props);
  return (
    <Card variant="outlined" key={post._id} className={classes.root}>
      <Link to={`/${profile.username}`}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              src={post ? profile.profile : null}
              className={classes.avatar}
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <div>
              <Typography color="textPrimary" variant="h6">
                {profile.name + " " + profile.lastname}
              </Typography>
              <Typography color="textSecondary">
                <strong>{profile.username}</strong>
              </Typography>
            </div>
          }
          subheader={
            "Publicado el: " +
            post.createdAt.substring(0, 10) +
            "   A las:  " +
            post.createdAt.substring(11, 16)
          }
        />
      </Link>

      {
        // TODO: Revisar por que solo devuelve el ID Del autor
        // Pero no otras caracteristicas.
      }
      {
        //console.log("props", props)
      }
      <Link to={`/${profile.username}/post/${post._id}`}>
        {post.image ? (
          <CardMedia
            className={classes.media}
            image={post.image}
            title="Paella dish"
          />
        ) : null}
        <CardContent>
          <Typography variant="body" color="textPrimary" component="p">
            {post.post}
          </Typography>
        </CardContent>
      </Link>
      <CardActions disableSpacing>
        <IconButton>
          <ChatBubbleOutlineIcon />
          {post.comments.length}
        </IconButton>
        <IconButton>
          <RepeatIcon />
          {post.repost}
        </IconButton>
        <IconButton aria-label="add to favorites">
          <StarIcon />
          {post.likes}
        </IconButton>{" "}
        <IconButton aria-label="share">
          <ScreenShareOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
