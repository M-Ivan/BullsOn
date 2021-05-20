import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";
import ReactLoading from "react-loading";
import { Container, Button, Grid, makeStyles } from "@material-ui/core/index";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  IconButton,
  TextField,
  withStyles,
} from "@material-ui/core/";
import EditIcon from "@material-ui/icons/Edit";
import {
  detailsUser,
  followUser,
  unfollowUser,
  updateProfile,
} from "../actions/userActions";
import { red } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import RenderPost from "../components/RenderPost";
import { listPosts, listReposts } from "../actions/postActions";
import {
  USER_FOLLOW_RESET,
  USER_PROFILE_UPDATE_RESET,
  USER_UNFOLLOW_RESET,
} from "../constants/userConstants";
import NavLarge from "../components/NavLarge";
import { useState } from "react";
import TopicsNav from "../components/TopicsNav";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "auto",
    "&:hover": {
      cursor: "normal",
    },

    borderLeft: "1px solid #e0e0e0",
    borderRight: "1px solid #e0e0e0",
    borderBottom: "1px solid #e0e0e0",
    borderRadius: "0px",
  },
  title: {
    marginLeft: "1rem",
    padding: "1rem",
  },
  profileRoot: {
    borderRadius: "0px",
    [theme.breakpoints.up("md")]: {},
  },
  media: {
    height: 170,
    width: "100%",
  },
  mediaBgEdit: {
    height: 170,
    width: "100%",
  },
  bgIcon: {
    color: "#ffffff",
    width: "100px",
    height: "100px",
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
  profilePicUploadBtn: {
    borderRadius: "50%",
  },
  backgroundUploadBtn: {
    width: "100%",
  },
  followSection: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
  descriptionTextField: {
    width: "25rem",
  },
}));
const MyTextField = withStyles({
  root: {
    marginRight: "20px",
    "& .MuiInput-underline:after": {
      borderBottomColor: "#ea6d0b",
    },
    "& label": {},
    "& label.Mui-focused": {
      color: "#ea6d0b",
    },
    "& .MuiOutlinedInput-root": {
      "& label": {
        fontSize: "1.05rem",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ea6d0b",
      },
    },
  },
})(TextField);

export default function ProfileScreen(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const postList = useSelector((state) => state.postList);
  const { loading: loadingPosts, error: errorPosts, posts } = postList;
  const repostList = useSelector((state) => state.repostList);
  const { reposts } = repostList;
  const commentAdd = useSelector((state) => state.commentAdd);
  const { success: successCommentAdd } = commentAdd;
  const postLike = useSelector((state) => state.postLike);
  const { success: successLikeAdd } = postLike;
  const postUnlike = useSelector((state) => state.postUnlike);
  const { success: successLikeRemove } = postUnlike;
  const postRepost = useSelector((state) => state.postRepost);
  const { success: successRepost } = postRepost;
  const postUnrepost = useSelector((state) => state.postUnrepost);
  const { success: successUnrepost } = postUnrepost;
  const userFollow = useSelector((state) => state.userFollow);
  const { success: successFollow } = userFollow;
  const userUnfollow = useSelector((state) => state.userUnfollow);
  const { success: successUnfollow } = userUnfollow;
  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { success: successUpdate } = userProfileUpdate;

  //state
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [description, setDescription] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [background, setBackground] = useState("");
  const [username, setUsername] = useState("");
  const [editName, setEditName] = useState(false);
  const [editLastname, setEditLastname] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  // utils
  const profileId = props.match.params.username;
  const postTotal = posts && reposts ? posts.concat(reposts) : null;
  // console.log("postTotal", postTotal);
  useEffect(() => {
    if (
      successCommentAdd ||
      successLikeAdd ||
      successLikeRemove ||
      successRepost ||
      successUnrepost
    ) {
      dispatch(listPosts({ profile: profileId }));
      dispatch(listReposts({ profile: profileId }));
    }
    if (successFollow) {
      dispatch(detailsUser(profileId));
      dispatch({ type: USER_FOLLOW_RESET });
    }
    if (successUnfollow) {
      dispatch(detailsUser(profileId));
      dispatch({ type: USER_UNFOLLOW_RESET });
    }
    if (successUpdate) {
      dispatch(detailsUser(profileId));
      dispatch({ type: USER_PROFILE_UPDATE_RESET });
    }

    if (!user) {
      dispatch(detailsUser(profileId));
      dispatch(listPosts({ profile: profileId }));
      dispatch(listReposts({ profile: profileId }));
    }
    if (user && profileId !== user.username) {
      dispatch(detailsUser(profileId));
      dispatch(listPosts({ profile: profileId }));
      dispatch(listReposts({ profile: profileId }));
    }
  }, [
    dispatch,
    userInfo,
    user,
    profileId,
    successCommentAdd,
    successLikeAdd,
    successLikeRemove,
    successRepost,
    successUnrepost,
    successFollow,
    successUnfollow,
    successUpdate,
  ]);

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const uploadProfilePicHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setProfilePic(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  const uploadBackgroundHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setBackground(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
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
  const editProfileHandler = () => {
    setEditMode(true);
  };
  const saveProfileHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        userId: user._id,
        name,
        lastname,
        profile: profilePic,
        description,
        username,
        background,
      })
    );
    setEditMode(false);
    setEditName(false);
    setEditLastname(false);
    setEditUsername(false);
    setEditDescription(false);
  };

  return (
    <div>
      {console.log("name", name)}
      {console.log("lastname", lastname)}
      {console.log("username", username)}
      {console.log("description", description)}
      {console.log("editMode", editMode)}
      {
        //   {console.log("reposts", reposts)}
        //   {console.log("posts", posts)
      }{" "}
      {console.log("props", props)}
      {
        //console.log("userInfo", userInfo)
      }
      {user ? (
        <Container fixed maxWidth="lg">
          <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.title}>
              <Typography variant="h4" color="textPrimary">
                {user.profile.name} {user.profile.lastname}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <NavLarge />

            <Grid item xs={12} lg={6}>
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
                  {editMode ? (
                    <Button
                      classes={{ root: classes.backgroundUploadBtn }}
                      component="label"
                    >
                      <CardMedia
                        className={classes.mediaBgEdit}
                        image={
                          user.profile.background
                            ? user.profile.background
                            : "/images/p1.jpg"
                        }
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          filter: "brightness(70%)",
                        }}
                      >
                        <Grid
                          container
                          justify="center"
                          alignItems="center"
                          direction="column"
                        >
                          <AddAPhotoIcon className={classes.bgIcon} />
                        </Grid>
                      </CardMedia>
                      <input
                        type="file"
                        hidden
                        onChange={uploadBackgroundHandler}
                      />
                    </Button>
                  ) : (
                    <CardMedia
                      className={classes.media}
                      image={
                        user.profile.background
                          ? user.profile.background
                          : "/images/p1.jpg"
                      }
                    ></CardMedia>
                  )}
                </Box>
                <Grid container>
                  <Grid item xs={3}>
                    <Grid container alignItems="center" direction="column">
                      {editMode ? (
                        <Button
                          classes={{ root: classes.profilePicUploadBtn }}
                          component="label"
                        >
                          <Avatar
                            src={
                              user.profile.profile ? user.profile.profile : null
                            }
                            className={classes.avatar}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                            }}
                          ></Avatar>
                          <AddAPhotoIcon />

                          <input
                            type="file"
                            hidden
                            onChange={uploadProfilePicHandler}
                          />
                        </Button>
                      ) : (
                        <Box>
                          <Avatar
                            src={user ? user.profile.profile : null}
                            className={classes.avatar}
                          ></Avatar>
                        </Box>
                      )}
                      {loadingUpload && (
                        <div className="row center">
                          <ReactLoading
                            className="loading"
                            color="#2d91f0"
                            type="cylon"
                          />{" "}
                        </div>
                      )}
                      {errorUpload && (
                        <MessageBox variant="danger">{errorUpload}</MessageBox>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={9}>
                    <Grid container direction="column" alignItems="flex-end">
                      {userInfo &&
                      user &&
                      userInfo._id === user._id &&
                      editMode === false ? (
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
                      ) : userInfo &&
                        user &&
                        userInfo._id === user._id &&
                        editMode === true ? (
                        <Box m={3}>
                          <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={saveProfileHandler}
                          >
                            Guardar cambios
                          </Button>
                        </Box>
                      ) : userInfo &&
                        user.followers.includes(userInfo.username) ? (
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
                        {editName ? (
                          <Grid container alignItems="center">
                            <MyTextField
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              label="Nombre(s)"
                              margin="dense"
                            />
                            <MyTextField
                              value={lastname}
                              onChange={(e) => setLastname(e.target.value)}
                              label="Apellido"
                              margin="dense"
                            />
                            {editMode ? (
                              <IconButton
                                size="small"
                                onClick={() => setEditName(!editName)}
                              >
                                {" "}
                                <EditIcon />
                              </IconButton>
                            ) : null}
                          </Grid>
                        ) : editMode && name && lastname ? (
                          name + " " + lastname
                        ) : (
                          user.profile.name + " " + user.profile.lastname
                        )}
                        {editMode && !editName ? (
                          <IconButton
                            size="small"
                            onClick={() => setEditName(!editName)}
                          >
                            {" "}
                            <EditIcon />
                          </IconButton>
                        ) : null}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1" color="textSecondary">
                        {editUsername ? (
                          <Grid container alignItems="center">
                            <MyTextField
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              label="@User"
                              margin="dense"
                            />
                            {editMode ? (
                              <IconButton
                                size="small"
                                onClick={() => setEditUsername(!editUsername)}
                              >
                                {" "}
                                <EditIcon />
                              </IconButton>
                            ) : null}
                          </Grid>
                        ) : editMode && username ? (
                          "@" + username
                        ) : (
                          "@" + user.profile.username
                        )}
                        {editMode && !editUsername ? (
                          <IconButton
                            size="small"
                            onClick={() => setEditUsername(!editUsername)}
                          >
                            {" "}
                            <EditIcon />
                          </IconButton>
                        ) : null}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Typography variant="body" color="textPrimary" component="p">
                    {" "}
                    <Grid container className={classes.descriptionSection}>
                      {editDescription ? (
                        <Grid container alignItems="center">
                          <MyTextField
                            className={classes.descriptionTextField}
                            multiline
                            rows={2}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            label="Biografia"
                            placeholder="Escribe una breve descripción de tu persona...."
                            margin="dense"
                          />

                          {editMode ? (
                            <IconButton
                              size="small"
                              onClick={() =>
                                setEditDescription(!editDescription)
                              }
                            >
                              {" "}
                              <EditIcon />
                            </IconButton>
                          ) : null}
                        </Grid>
                      ) : editMode && description ? (
                        description
                      ) : (
                        user.profile.description
                      )}
                      {editMode && !editDescription ? (
                        <IconButton
                          size="small"
                          onClick={() => setEditDescription(!editDescription)}
                        >
                          <EditIcon />
                        </IconButton>
                      ) : null}{" "}
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
              </Card>{" "}
              <Divider />
              <Grid item xs={12}>
                {loadingPosts ? (
                  <ReactLoading
                    className="loading"
                    color="#2d91f0"
                    type="cylon"
                  />
                ) : errorPosts ? (
                  <MessageBox variant="danger">{errorPosts}</MessageBox>
                ) : posts && reposts ? (
                  postTotal.map((post) => (
                    <RenderPost key={post._id} post={post}></RenderPost>
                  ))
                ) : //TODO: Pantalla length === 0
                null}
              </Grid>
            </Grid>
            <TopicsNav />
          </Grid>
        </Container>
      ) : null}
    </div>
  );
}
