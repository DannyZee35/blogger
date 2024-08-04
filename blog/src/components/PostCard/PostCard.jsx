import { Link } from "react-router-dom";
import bucketService from "../../services/bucketService";
import { Card, CardMedia, CardContent, Typography, CardActionArea } from "@mui/material";

export const PostCard = ({ title, featuredImage, $id }) => {
  const imageUrl = bucketService.filePreview(featuredImage)?.href;

  return (
    <Link to={`/post/${$id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          maxWidth: 500,
          maxHeight: 400,
          borderRadius: '15px',
          boxShadow: 3,
          overflow: 'hidden',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: 6,
          },
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={imageUrl}
            alt={title}
            sx={{ borderBottom: '1px solid #ddd' }}
          />
          <CardContent
            sx={{
              p: 2,
              backgroundColor: '#f9f9f9',
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};
