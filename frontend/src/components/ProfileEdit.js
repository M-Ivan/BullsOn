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
    borderRadius: "0px",
    [theme.breakpoints.up("sm")]: {},
  },
  save: {
    marginRight: "10px",
    borderRadius: "3rem",
    color: "#fff",
    backgroundColor: "#ea6d0b",
    [theme.breakpoints.down("x")]: { fontSize: "8pt" },
    "&:hover": {
      backgroundColor: "#e16828",
      boxShadow: "0 2px 2px #00000050",
    },
  },

  media: {
    height: 170,
    width: "100%",
    display: "flex",
    alignItems: "center",
  },

  bgIcon: {
    color: "#ffffff",
    width: "100px",
    height: "100px",
    zIndex: 2,
  },

  avatar: {
    backgroundColor: red[500],
    width: "100px",
    height: "100px",
    [theme.breakpoints.down("xs")]: {
      width: "70px",
      height: "70px",
    },
    border: "5px solid #000000",
    display: "flex",
    justifyContent: "center",
  },

  name: {
    margin: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },

  descriptionSection: {
    margin: theme.spacing(2),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
  profilePicUploadBtn: {
    borderRadius: "50%",
  },
  backgroundUploadBtn: {
    width: "100%",
    padding: 0,
  },
  followSection: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      margin: 0,
      marginTop: "1rem",
    },
  },
  textField: {
    width: "70%",
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
    <Card elevation={0} className={classes.root}>
      <Box m={1}>
        <Button
          classes={{ root: classes.backgroundUploadBtn }}
          component="label"
        >
          <CardMedia
            className={classes.media}
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
            <AddAPhotoIcon className={classes.bgIcon} />
          </CardMedia>
          <input type="file" hidden onChange={uploadBackgroundHandler} />
        </Button>
      </Box>
      <Grid container>
        <Grid
          item
          xs={6}
          style={{
            display: "grid",
            justifyContent: "flex-start",
          }}
        >
          <Grid container alignItems="center" direction="column" justify="">
            <Button
              classes={{ root: classes.profilePicUploadBtn }}
              component="label"
            >
              <Avatar
                src={user.profile.profile ? user.profile.profile : null}
                className={classes.avatar}
              >
                {" "}
              </Avatar>

              <input type="file" hidden onChange={uploadProfilePicHandler} />
            </Button>
            <Button
              style={{
                borderRadius: "50%",
              }}
              component="label"
            >
              {" "}
              <input type="file" hidden onChange={uploadProfilePicHandler} />
              <AddAPhotoIcon />
            </Button>
          </Grid>
          {loadingUpload && (
            <div className="row center">
              <ReactLoading className="loading" color="#2d91f0" type="cylon" />{" "}
            </div>
          )}
          {errorUpload && (
            <MessageBox variant="danger">{errorUpload}</MessageBox>
          )}
        </Grid>{" "}
        <Grid
          item
          xs={6}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            onClick={saveProfileHandler}
            size="large"
            className={classes.save}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
      <CardContent>
        <Grid container>
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
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {"@" + user.profile.username}
            </Typography>
          </Grid>
        </Grid>

        <Typography
          variant="body"
          color="textPrimary"
          component="p"
          gutterBottom
        >
          {" "}
          <Grid container>
            {editDescription ? (
              <Grid container alignItems="center">
                <MyTextField
                  className={classes.textField}
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
