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
  CardMedia,
  IconButton,
} from "@material-ui/core/index";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ImageIcon from "@material-ui/icons/Image";
import MessageBox from "../components/MessageBox";
import ReactLoading from "react-loading";
import { POST_CREATE_RESET } from "../constants/postConstants";
import { DeleteOutline } from "../../node_modules/@material-ui/icons/index";

const useStyles = makeStyles((theme) => ({
  root: {},
  imgBtn: {
    border: "1px solid #2978e1",
    color: "#2978e1",
    height: "100%",
    marginLeft: "2vw",
    "&:hover": {
      background: "#2978e1",
      color: "#fff",
    },
  },
  delete: {
    background: "#ffffff50",
    color: "#bd0d0d",
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
  preview: {
    width: "100px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 3px #1e1e1e",
    borderRadius: "0.3em",
  },
  buttonsBox: {
    marginTop: "0.3rem",
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
  const [hover, setHover] = useState(false);

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

  const deleteUpload = () => {
    setImage(null);
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
            {image && (
              <CardMedia
                component="div"
                image={image}
                className={classes.preview}
                alt="preview"
                onMouseEnter={() => setHover(!hover)}
                onMouseLeave={() => setHover(!hover)}
              >
                {hover && (
                  <IconButton className={classes.delete} onClick={deleteUpload}>
                    <DeleteOutline />
                  </IconButton>
                )}
              </CardMedia>
            )}{" "}
            <Button classes={{ root: classes.imgBtn }} component="label">
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
