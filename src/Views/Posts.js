import { Fragment, useState, useEffect, useMemo, useCallback } from "react";
import {
  Button,
  Box,
  Toolbar,
  Container,
  Switch,
  Typography,
  Stack,
} from "@mui/material";
import { createPost, deletePost, editPost } from "../Helper/Crud";
import DisplayPosts from "../Components/DisplayPost";
import Loader from "../Components/Loader";
import PostModal from "../Components/PostModal";
import CommentModal from "../Components/CommentModal";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../Components/Navbar";
import "react-toastify/dist/ReactToastify.css";

const Posts = () => {
  const [commentData, setCommentData] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [openCommentsModal, setOpenCommentsModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [currentPostId, setCurrentPostId] = useState();
  const [showAllPosts, setShowAllPosts] = useState(true);

  const handleOpenPost = useCallback(() => setOpenPostModal(true), []);
  const handleClosePost = useCallback(() => setOpenPostModal(false), []);
  const navigate = useNavigate();

  const [postsData, setPostsData] = useState(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      return JSON.parse(storedPosts);
    } else {
      return [];
    }
  });

  const user = useMemo(() => {
    if (localStorage.getItem("users") != null) {
      return JSON.parse(localStorage.getItem("users")).find(
        (user) => user.id === parseInt(localStorage.getItem("current-login"))
      );
    } else {
      return [];
    }
  }, []);

  const handleOpenEditPostModal = useCallback((id) => {
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
  }, []);

  const handleCloseEditPostModal = useCallback(
    () => setOpenEditModal(false),
    []
  );

  const handleOpenComments = useCallback((id) => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => response.json())
      .then((json) => {
        setCommentData(json);
        setLoading(false);
      });
    setCurrentPostId(id);
    setOpenCommentsModal(true);
  }, []);

  const handleCloseComments = useCallback(
    () => setOpenCommentsModal(false),
    []
  );

  const handleCreatePost = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      let tempObj = {
        userId: user.id,
        id: postsData[postsData.length - 1].id + 1,
        title: title,
        body: body,
      };
      let response = await createPost(tempObj);
      if (response.status === 201) {
        setPostsData((postsData) => [...postsData, tempObj]);
        localStorage.setItem("posts", JSON.stringify([...postsData, tempObj]));
        setOpenPostModal(false);
        setTitle("");
        setBody("");
        toast.success(`Post Created!`);
      } else {
        toast.error("Error Creating Post. See Console Log!");
        console.log(response);
      }
    },
    [title, body, postsData, user]
  );

  const handleDeletePost = useCallback(
    async (id) => {
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
    },
    [postsData]
  );

  const handleEditPost = useCallback(async () => {
    setLoading(true);
    let obj = {
      userId: user.id,
      id: currentPostId,
      title: title,
      body: body,
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
  }, [title, body, currentPostId, postsData, user]);

  const handleAddComment = useCallback(() => {
    setLoading(true);
    let obj = {
      postId: currentPostId,
      id: commentData[commentData.length - 1].id + 1,
      name: user.name,
      email: user.email,
      body: comment,
    };
    setCommentData((commentData) => [...commentData, obj]);
    setComment("");
    toast.success("Comment Added!");
    setLoading(false);
  }, [comment, commentData, user, currentPostId]);

  useEffect(() => {
    const currentLogin = localStorage.getItem("current-login");
    if (currentLogin === null) {
      navigate("/");
      return;
    }
    if (!postsData.length) {
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
        .then((response) => response.json())
        .then((json) => {
          setPostsData(json);
          localStorage.setItem("posts", JSON.stringify(json));
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching data:", error);
        });
    }
    setLoading(false);
  }, [postsData.length, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <ToastContainer
            position="top-center"
            theme="dark"
            hideProgressBar
            autoClose={3000}
          />
          <Navbar />
          <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Typography>My Posts</Typography>
              <Switch
                checked={showAllPosts}
                inputProps={{ "aria-label": "ant design" }}
                onClick={() => setShowAllPosts(!showAllPosts)}
              />
              <Typography>All Posts</Typography>
            </Stack>
            <Button
              variant="contained"
              size="large"
              onClick={handleOpenPost}
              fullWidth
            >
              Create a new Post
            </Button>
            <PostModal
              openModal={openPostModal}
              closeModal={handleClosePost}
              heading="Create a Post"
              handleSubmit={handleCreatePost}
              action="Create"
              setTitle={setTitle}
              setBody={setBody}
            />
            {[...postsData].reverse()?.map((item) => (
              <Fragment key={item.id}>
                {showAllPosts ? (
                  <DisplayPosts
                    key={item.id}
                    title={item.title}
                    body={item.body}
                    id={item.id}
                    postUserId={item.userId}
                    userId={user.id}
                    handleOpenComments={handleOpenComments}
                    handleOpenEditPostModal={handleOpenEditPostModal}
                    handleDeletePost={handleDeletePost}
                  />
                ) : (
                  user.id === item.userId && (
                    <DisplayPosts
                      key={item.id}
                      title={item.title}
                      body={item.body}
                      id={item.id}
                      postUserId={item.userId}
                      userId={user.id}
                      handleOpenComments={handleOpenComments}
                      handleOpenEditPostModal={handleOpenEditPostModal}
                      handleDeletePost={handleDeletePost}
                    />
                  )
                )}
              </Fragment>
            ))}
            <PostModal
              openModal={openEditModal}
              closeModal={handleCloseEditPostModal}
              heading="Edit Post"
              handleSubmit={handleEditPost}
              action="Save"
              title={title}
              setTitle={setTitle}
              body={body}
              setBody={setBody}
            />
            <CommentModal
              openModal={openCommentsModal}
              closeModal={handleCloseComments}
              comment={comment}
              setComment={setComment}
              addComment={handleAddComment}
              commentData={commentData}
              currentUserEmail={user.email}
            />
          </Box>
        </Container>
      )}
    </>
  );
};

export default Posts;
