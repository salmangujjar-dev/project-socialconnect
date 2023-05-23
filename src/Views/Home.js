import { useState, useEffect, useMemo } from "react";
import { Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createPost, deletePost, editPost } from "../Helper/Crud";
import Posts from "../Components/Posts";
import Loader from "../Components/Loader";
import ModalPost from "../Components/ModalPost";
import ModalComment from "../Components/ModalComment";
import LogoutIcon from "@mui/icons-material/Logout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const [commentData, setCommentData] = useState();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [openCommentsModal, setOpenCommentsModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [currentPostId, setCurrentPostId] = useState();

  const handleOpenPost = () => setOpenPostModal(true);
  const handleClosePost = () => setOpenPostModal(false);

  const navigateUser = (page) => navigate(page);

  const [postsData, setPostsData] = useState(() => {
    if (localStorage.getItem("posts")) {
      return JSON.parse(localStorage.getItem("posts"));
    }
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((response) => response.json())
      .then((json) => {
        setPostsData(json);
        setLoading(false);
      });
  });

  const userObj = useMemo(() => {
    return JSON.parse(localStorage.getItem("users")).find(
      (user) => user.id == localStorage.getItem("current-login")
    );
  });

  const handleOpenEdit = (id) => {
    setLoading(true);
    setOpenEditModal(true);
    setCurrentPostId(id);
    let posts = JSON.parse(localStorage.getItem("posts"));
    let index = posts.findIndex((post) => post.id === id);
    if (index > -1) {
      setTitle(posts[index].title);
      setBody(posts[index].body);
    }
    setLoading(false);
  };
  const handleCloseEdit = () => setOpenEditModal(false);

  const handleOpenComments = (id) => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => response.json())
      .then((json) => {
        setCommentData(json);
        setLoading(false);
      });
    setOpenCommentsModal(true);
  };
  const handleCloseComments = () => setOpenCommentsModal(false);

  const signoutUser = () => {
    localStorage.removeItem("current-login");
    window.location.reload();
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    let tempObj = {
      userId: userObj.id,
      id: postsData[postsData.length - 1].id + 1,
      title: title,
      body: body,
    };
    let response = await createPost(tempObj);
    if (response.status === 201) {
      setPostsData([...postsData, tempObj]);
      localStorage.setItem("posts", JSON.stringify([...postsData, tempObj]));
      setOpenPostModal(false);
      setLoading(false);
      toast.success(`Post Created!`);
    } else {
      toast.error("Error Creating Post. See Console Log!");
      console.log(response);
    }
  };

  const handleDeletePost = async (id) => {
    setLoading(true);
    let response = await deletePost(id);
    if (response.status === 200) {
      let index = postsData.findIndex((post) => post.id === id);
      if (index > -1) {
        postsData.splice(index, 1);
        localStorage.setItem("posts", JSON.stringify(postsData));
        toast.success(`Post Deleted! PostId: ${id}`);
      }
      setLoading(false);
    } else {
      toast.error("Error Deleting Post. See Console Log!");
      console.log(response);
    }
  };

  const handleEditPost = async () => {
    setLoading(true);
    let obj = {
      id: currentPostId,
      title: title,
      body: body,
      userId: userObj.id,
    };
    let response = await editPost(currentPostId, obj);
    if (response.status === 200) {
      console.log(`Successfully Updated post for postId: ${currentPostId}`);
      let index = postsData.findIndex((post) => post.id === currentPostId);
      if (index > -1) {
        postsData.splice(index, 1, obj);
      }

      let posts = JSON.parse(localStorage.getItem("posts"));
      index = posts.findIndex((post) => post.id === currentPostId);
      if (index > -1) {
        posts.splice(index, 1, obj);
        localStorage.setItem("posts", JSON.stringify(posts));
      }
      setOpenEditModal(false);
      toast.success(`Post Edited! PostId: ${currentPostId}`);
      setLoading(false);
    } else {
      toast.error("Error Editing Post. See Console Log!");
      console.log(response);
    }
  };

  const handleAddComment = () => {
    setLoading(true);
    let obj = {
      body: comment,
      postId: currentPostId,
      id: commentData[commentData.length - 1].id + 1,
      name: userObj.name,
      email: userObj.email,
    };
    setCommentData([...commentData, obj]);
    setComment("");
    toast.success("Comment Added!");
    setLoading(false);
  };

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(postsData));
    setLoading(false);
  }, [postsData]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ToastContainer
            position="top-center"
            theme="dark"
            hideProgressBar
            autoClose={3000}
          />
          <div
            style={{
              float: "right",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                navigateUser("/posts");
              }}
            >
              My Posts
            </Button>
            <LogoutIcon
              color="error"
              fontSize="large"
              sx={{ cursor: "pointer" }}
              onClick={() => signoutUser()}
            />
          </div>
          <div>
            <h1>Wecome Home {userObj.name}</h1>
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={handleOpenPost}
              fullWidth
            >
              Create a new Post
            </Button>
            <ModalPost
              openModal={openPostModal}
              closeModal={handleClosePost}
              heading="Create a Post"
              handleSubmit={handleCreatePost}
              action="Create"
              title={title}
              setTitle={setTitle}
              body={body}
              setBody={setBody}
            />
            {postsData?.map((item) => (
              <Posts
                key={item.id}
                title={item.title}
                body={item.body}
                id={item.id}
                postUserId={item.userId}
                userId={userObj.id}
                handleOpenComments={handleOpenComments}
                handleOpenEdit={handleOpenEdit}
                handleDeletePost={handleDeletePost}
              />
            ))}
            <ModalPost
              openModal={openEditModal}
              closeModal={handleCloseEdit}
              heading="Edit Post"
              handleSubmit={handleEditPost}
              action="Save"
              title={title}
              setTitle={setTitle}
              body={body}
              setBody={setBody}
            />
            <ModalComment
              openModal={openCommentsModal}
              closeModal={handleCloseComments}
              comment={comment}
              setComment={setComment}
              addComment={handleAddComment}
              commentData={commentData}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
