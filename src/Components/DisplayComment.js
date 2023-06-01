import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography, Card, CardContent, Stack } from "@mui/material";

const DisplayComment = ({
  commentId,
  postId,
  email,
  body,
  currentUserEmail,
}) => {
  return (
    <Card variant="outlined" sx={{ display: "flex" }}>
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography gutterBottom variant="h6" component="div">
          {email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
      {email === currentUserEmail && (
        <Stack
          spacing={2}
          direction="column"
          alignItems="center"
          sx={{ float: "right", justifyContent: "center" }}
        >
          <EditIcon
            color="success"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              console.log(commentId + " " + postId);
              //  handleOpenEdit(currentUserEmail);
            }}
          />
          <DeleteIcon
            color="error"
            sx={{ cursor: "pointer" }}
            //onClick={() => handleDeletePost(id)}
          />
        </Stack>
      )}
    </Card>
  );
};

export default DisplayComment;
