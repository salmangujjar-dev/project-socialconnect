import {
  Modal,
  Box,
  FormControl,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import style from "../Styles/HomeStyle";

const ModalPost = (props) => {
  return (
    <Modal
      open={props.openModal}
      onClose={props.closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style.postsStyle}>
        <h1>{props.heading}</h1>
        <form onSubmit={props.handleSubmit}>
          <FormControl fullWidth>
            <Stack spacing={2} direction="column">
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                value={props.title}
                onChange={(e) => props.setTitle(e.target.value)}
                required
                fullWidth
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Body"
                variant="outlined"
                value={props.body}
                onChange={(e) => props.setBody(e.target.value)}
                required
                fullWidth
                multiline
                rows={6}
              />
              <Button type="submit" variant="contained" color="success">
                {props.action}
              </Button>
            </Stack>
          </FormControl>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalPost;
