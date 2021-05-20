import React from "react";
import { useDispatch } from "react-redux";
import MessageBox from "../components/MessageBox";
import ReactLoading from "react-loading";
import { Button, Grid, makeStyles } from "@material-ui/core/index";
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
import { updateProfile } from "../actions/userActions";
import { red } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

import { useState } from "react";
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

export default function ProfileEdit(props) {
  const { userInfo, user } = props;

  const classes = useStyles();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [description, setDescription] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [background, setBackground] = useState("");
  const [editName, setEditName] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const dispatch = useDispatch();

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

  const saveProfileHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        userId: user._id,
        name,
        lastname,
        profile: profilePic,
        description,
        background,
      })
    );
    setEditName(false);
    setEditDescription(false);
  };

  return (
    <Card elevation={0} className={classes.profileRoot}>
      <Box m={1}>
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
          <input type="file" hidden onChange={uploadBackgroundHandler} />
        </Button>
      </Box>
      <Grid container>
        <Grid item xs={3}>
          <Grid container alignItems="center" direction="column">
            <Button
              classes={{ root: classes.profilePicUploadBtn }}
              component="label"
            >
              <Avatar
                src={user.profile.profile ? user.profile.profile : null}
                className={classes.avatar}
                style={{
                  justifyContent: "center",
                  display: "flex",
                }}
              ></Avatar>
              <AddAPhotoIcon />

              <input type="file" hidden onChange={uploadProfilePicHandler} />
            </Button>
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
        </Grid>{" "}
        <Grid item xs={9}>
          <Grid container direction="column" alignItems="flex-end">
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
                  <IconButton
                    size="small"
                    onClick={() => setEditName(!editName)}
                  >
                    {" "}
                    <EditIcon />
                  </IconButton>
                </Grid>
              ) : name && lastname ? (
                name + " " + lastname
              ) : (
                user.profile.name + " " + user.profile.lastname
              )}
              {!editName ? (
                <IconButton size="small" onClick={() => setEditName(!editName)}>
                  {" "}
                  <EditIcon />
                </IconButton>
              ) : null}
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

                <IconButton
                  size="small"
                  onClick={() => setEditDescription(!editDescription)}
                >
                  {" "}
                  <EditIcon />
                </IconButton>
              </Grid>
            ) : description ? (
              description
            ) : (
              user.profile.description
            )}
            {!editDescription ? (
              <IconButton
                size="small"
                onClick={() => setEditDescription(!editDescription)}
              >
                <EditIcon />
              </IconButton>
            ) : null}
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
      </CardContent>{" "}
      {console.log("name", name)}
      {console.log("lastname", lastname)}
      {console.log("description", description)}
      {console.log("user", user)}
      {console.log("user", user._id)}
    </Card>
  );
}
