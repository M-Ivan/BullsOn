import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../actions/postActions";
import Axios from "axios";
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  withStyles,
} from "@material-ui/core/index";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ImageIcon from "@material-ui/icons/Image";
import MessageBox from "../components/MessageBox";
import ReactLoading from "react-loading";
import { POST_CREATE_RESET } from "../constants/postConstants";

const useStyles = makeStyles((theme) => ({
  root: {},
  imgBtn: {
    border: "1px solid #00a6ff",
    color: "#00a6ff",
    margin: "0.5rem",
  },
  button: {
    background: "#ea6d0b",
    borderRadius: "3rem",
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    "&:hover": {
      background: "#e16828",
    },
  },
  buttonsBox: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
}));

const MyTextField = withStyles({
  root: {
    marginLeft: "1rem",
    marginRight: "1rem",
    marginTop: "0.3rem",

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

export default function PostCreateBox(props) {
  const classes = useStyles();
  // Hooks
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [post, setPost] = useState("");
  const [image, setImage] = useState("");
  const postCreate = useSelector((state) => state.postCreate);
  const { success: successCreate, post: createdPost } = postCreate;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: POST_CREATE_RESET });
      setPost("");
    }
  }, [createdPost, dispatch, successCreate]);

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const uploadFileHandler = async (e) => {
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
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    //Hace dispatch al nuevo post
    dispatch(createPost(post, image));
  };

  return (
    <Grid className={classes.root}>
      <form onSubmit={submitHandler}>
        <Grid container className="form-control">
          <MyTextField
            style={{ width: "100%" }}
            id="postText"
            variant="standard"
            multiline
            label="Hola, Mundo!"
            placeholder="En que estas pensando?.."
            rows={6}
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </Grid>
        <Grid container justify="flex-end">
          <Grid item xs={12} lg={7} className={classes.buttonsBox}>
            <Button
              classes={{ root: classes.imgBtn }}
              variant="outlined"
              component="label"
            >
              {" "}
              <ImageIcon />
              <input type="file" hidden onChange={uploadFileHandler} />
            </Button>
          </Grid>

          <Grid item xs={12} lg={5} className={classes.buttonsBox}>
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
            {post.length > 0 ? (
              <Button
                classes={{
                  root: classes.button,
                }}
                variant="contained"
                type="submit"
              >
                <PostAddIcon />
                Compartir una idea
              </Button>
            ) : (
              <Button
                classes={{
                  root: classes.button,
                }}
                variant="contained"
                disabled
              >
                <PostAddIcon />
                Compartir una idea
              </Button>
            )}{" "}
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
