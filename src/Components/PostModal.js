import {
  Modal,
  Box,
  FormControl,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import Styles from "../Styles/Styles";

const PostModal = (props) => {
  return (
    <Modal
      open={props.openModal}
      onClose={props.closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={Styles.postsStyle}>
        <h1 style={Styles.color.primary}>{props.heading}</h1>
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
              <Button type="submit" variant="contained">
                {props.action}
              </Button>
            </Stack>
          </FormControl>
        </form>
      </Box>
    </Modal>
  );
};

export default PostModal;
