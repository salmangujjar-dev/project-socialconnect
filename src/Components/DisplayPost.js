import { memo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Stack,
  Typography,
  Button,
  CardActions,
  CardContent,
  Card,
} from "@mui/material";

const DisplayPost = ({
  title,
  body,
  id,
  postUserId,
  userId,
  handleOpenComments,
  handleOpenEditPostModal,
  handleDeletePost,
}) => {
  console.log("child rerender");
  return (
    <Card sx={{ marginTop: 4, display: "flex" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "1 0 0",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            handleOpenComments(id);
          }}
        >
          Comments
        </Button>
      </CardActions>
      {userId === postUserId && (
        <Stack
          spacing={2}
          direction="column"
          sx={{ float: "right", justifyContent: "center" }}
        >
          <EditIcon
            color="success"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              handleOpenEditPostModal(id);
            }}
          />
          <DeleteIcon
            color="error"
            sx={{ cursor: "pointer" }}
            onClick={() => handleDeletePost(id)}
          />
        </Stack>
      )}
    </Card>
  );
};

export default memo(DisplayPost);
