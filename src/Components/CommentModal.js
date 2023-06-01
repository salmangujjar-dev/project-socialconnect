import { Modal, Box, Stack, TextField, Button } from "@mui/material";
import DisplayComment from "./DisplayComment";
import style from "../Styles/Styles";
const CommentModal = ({
  openModal,
  closeModal,
  comment,
  setComment,
  addComment,
  commentData,
  currentUserEmail,
}) => {
  return (
    <Modal
      open={openModal}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style.commentStyle}>
        <h1>Comments</h1>
        <Stack spacing={2} direction="column">
          <TextField
            id="outlined-basic"
            label="Add a Comment"
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            multiline
            autoFocus
            rows={2}
          />
          <Button variant="contained" color="success" onClick={addComment}>
            Add
          </Button>
          {[...commentData].reverse()?.map((item) => (
            <DisplayComment
              key={item.id}
              commentId={item.id}
              postId={item.postId}
              email={item.email}
              body={item.body}
              currentUserEmail={currentUserEmail}
            />
          ))}
        </Stack>
      </Box>
    </Modal>
  );
};

export default CommentModal;
