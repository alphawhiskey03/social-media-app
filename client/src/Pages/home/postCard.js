import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import AddPost from "./addPost";
import {
  Grid,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../context/auth";
import { useContext } from "react";

const PostCard = ({ posts }) => {
  const { user } = useContext(AuthContext);
  return (
    <Grid container spacing={2}>
      {user && (
        <Grid item md={4} xs={12}>
          <AddPost />
        </Grid>
      )}
      {posts &&
        posts.map((post) => (
          <Grid item md={4} xs={12} key={post.body}>
            <Card
              sx={{ minWidth: 50 }}
              style={{ backgroundColor: "#e8f4fd", borderRadius: 15 }}
              elevation={5}
            >
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="recipe"
                    style={{
                      backgroundColor: "white",
                      border: "1px solid grey",
                    }}
                  >
                    <img
                      src="./logo192.png"
                      style={{ height: 30, width: 30 }}
                    />
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={post.username}
                subheader={moment(post.createdAt).fromNow(true)}
              />
              <CardContent>
                <div style={{ marginTop: 5 }}>
                  <Typography>{post.body}</Typography>
                </div>
              </CardContent>
              <CardActions>
                <Button size="small" color="info" startIcon={<FavoriteIcon />}>
                  {post.likeCount}
                </Button>
                <Button size="small" color="info" startIcon={<CommentIcon />}>
                  {post.commentCount}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default PostCard;
