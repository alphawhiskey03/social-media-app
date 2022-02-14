import {
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
const AddPost = () => {
  return (
    <>
      <Card
        sx={{ minWidth: 50 }}
        style={{ backgroundColor: "#e8f4fd", borderRadius: 15 }}
        elevation={5}
      >
        <CardHeader
          title={"Whats on your mind?"}
          titleTypographyProps={{ variant: "body1" }}
        />
        <CardContent>
          <TextField
            variant="standard"
            color="info"
            style={{ width: "100%" }}
            multiline
            label="Say hello"
            rows={1}
          />
        </CardContent>
        <CardActions>
          <Button color="info" size="small" startIcon={<SendIcon />}>
            Post
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AddPost;
