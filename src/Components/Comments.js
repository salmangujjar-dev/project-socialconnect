import { Typography, Card, CardContent } from "@mui/material";

const Comments = ({ email, body }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Comments;
