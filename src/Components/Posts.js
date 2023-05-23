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

const Posts = ({
  title,
  body,
  id,
  postUserId,
  userId,
  handleOpenComments,
  handleOpenEdit,
  handleDeletePost,
}) => {
  return (
    <Card sx={{ marginTop: 4 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {userId === postUserId && (
          <Stack spacing={2} direction="column" sx={{ float: "right" }}>
            <EditIcon
              color="success"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                console.log(id);
                handleOpenEdit(id);
              }}
            />
            <DeleteIcon
              color="error"
              sx={{ cursor: "pointer" }}
              onClick={() => handleDeletePost(id)}
            />
          </Stack>
        )}
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
    </Card>
  );
};

export default Posts;
