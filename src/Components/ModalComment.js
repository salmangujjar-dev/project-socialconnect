import { Modal, Box, Stack, TextField, Button } from "@mui/material";
import Comments from "../Components/Comments";
import style from "../Styles/HomeStyle";
const ModalComment = (props) => {
  return (
    <Modal
      open={props.openModal}
      onClose={props.closeModal}
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
            value={props.comment}
            onChange={(e) => props.setComment(e.target.value)}
            fullWidth
            multiline
            focused
            rows={2}
          />
          <Button
            variant="contained"
            color="success"
            onClick={props.addComment}
          >
            Add
          </Button>
          {props.commentData?.map((item) => (
            <Comments
              key={item.id}
              email={item.email}
              body={item.body}
              id={item.id}
            />
          ))}
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalComment;
