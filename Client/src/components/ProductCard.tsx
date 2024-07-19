import { FC } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { Product } from "src/types/product";

type ProductCardProps = {
  product: Product;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    
    <Card
    sx={{
      width: "100%",
      maxWidth: 345,
      marginTop: "20px",
      position: "relative",
      "&:hover": {
        "& .hover-overlay": {
          display: "flex",
        },
      },
    }}
  >
    <Box
      className="hover-overlay"
      sx={{
        display: "none",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 2,
      }}
    >
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
      </IconButton>
      <IconButton aria-label="add to cart" component={Link} to={`/products/${product.id}`}>
        <ShoppingCartIcon />
      </IconButton>
    </Box>
    <CardMedia
      component="img"
      alt={product.title}
      height="140"
      image={product.image}
      sx={{ objectFit: "contain" }}
    />
    <CardContent
      sx={{
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <Typography gutterBottom variant="h6" component="div">
        {product.title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
        <Rating value={4} readOnly precision={0.5} />
        <Rating value={0} readOnly precision={0.5} emptyIcon={<span />} />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6" color="primary">
          ${product.price}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textDecoration: "line-through", marginLeft: 1 }}
        >
          ${product.price}
        </Typography>
        <Typography variant="body2" color="red" sx={{ marginLeft: 1 }}>
          24% Off
        </Typography>
      </Box>
    </CardContent>
  </Card>
  );
};

export default ProductCard;
