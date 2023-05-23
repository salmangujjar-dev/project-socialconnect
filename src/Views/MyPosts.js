import { useState, useMemo, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { deletePost, editPost } from "../Helper/Crud";
import ModalPost from "../Components/ModalPost";
import ModalComment from "../Components/ModalComment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoutIcon from "@mui/icons-material/Logout";
import Posts from "../Components/Posts";
import Loader from "../Components/Loader";

const MyPosts = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [currentPostId, setCurrentPostId] = useState();
  const [loading, setLoading] = useState(true);
  const [commentData, setCommentData] = useState([]);
  const [openCommentsModal, setOpenCommentsModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [comment, setComment] = useState("");

  const handleOpenComments = (id) => {
    setLoading(true);
    setCurrentPostId(id);
    console.log(`Fetching comments for Post id: ${id}`);
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => response.json())
      .then((json) => {
        setCommentData(json);
        setLoading(false);
      });
    setOpenCommentsModal(true);
  };
  const handleCloseComments = () => setOpenCommentsModal(false);

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

  const handleDeletePost = async (id) => {
    setLoading(true);
    let response = await deletePost(id);
    if (response.status === 200) {
      let index = postsData.findIndex((post) => post.id === id);
      if (index > -1) {
        postsData.splice(index, 1);
      }
      let posts = JSON.parse(localStorage.getItem("posts"));
      index = posts.findIndex((post) => post.id === id);
      if (index > -1) {
        posts.splice(index, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
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
  const navigateUser = (page) => navigate(page);

  const userObj = useMemo(() => {
    return JSON.parse(localStorage.getItem("users")).find(
      (user) => user.id == localStorage.getItem("current-login")
    );
  });

  const [postsData, setPostsData] = useState(() => {
    let tempObj = JSON.parse(localStorage.getItem("posts")).filter(
      (post) => post.userId == userObj.id
    );
    setLoading(false);
    return JSON.parse(JSON.stringify(tempObj));
  });

  const signoutUser = () => {
    localStorage.removeItem("current-login");
    navigateUser("/");
  };

  useEffect(() => {
    localStorage.getItem("current-login") ?? navigateUser("/");
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <LogoutIcon
            color="error"
            fontSize="large"
            sx={{ cursor: "pointer", float: "right" }}
            onClick={signoutUser}
          />
          <ToastContainer
            position="top-center"
            theme="dark"
            hideProgressBar
            autoClose={3000}
          />
          <ArrowBackIcon
            color="error"
            fontSize="large"
            sx={{ cursor: "pointer" }}
            onClick={() => navigateUser(-1)}
          />
          <h1>My Posts</h1>
          {postsData.length == 0 && <h1>No Posts Available</h1>}
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
          <ModalComment
            openModal={openCommentsModal}
            closeModal={handleCloseComments}
            comment={comment}
            setComment={setComment}
            addComment={handleAddComment}
            commentData={commentData}
          />
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
        </>
      )}
    </>
  );
};

export default MyPosts;
