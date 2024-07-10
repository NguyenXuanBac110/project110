import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Stack,
  Typography,
  Box,
  Rating,
  IconButton,
  TextField,
  Grid,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Product } from "src/types/product";
import Loading from "src/components/loading";


function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  const getProduct = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      if (data) {
        setProduct(data);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      setError("An error occurred while fetching the product.");
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);

  useEffect(() => {
    if (notFound) {
      navigate("/not-found");
    }
  }, [notFound, navigate]);

  const handleQuantityChange = (action: "increase" | "decrease") => {
    setQuantity((prevQuantity) => {
      if (action === "increase") {
        return prevQuantity + 1;
      } else if (action === "decrease" && prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  const handleAddToCart = () => {
    // Logic để thêm sản phẩm vào giỏ hàng
    console.log(`Added ${quantity} of ${product?.title} to cart`);
  };

  return (
    <>
      <Loading isShow={loading} />
      <Container sx={{ marginTop: "20px" }}>
        {error && <Alert severity="error">{error}</Alert>}
        {product && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box
                component="img"
                src={product.image}
                alt={product.title}
                sx={{ width: "100%", objectFit: "contain" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack gap={3}>
                <Typography component="h1" fontSize={"26px"}>
                  {product.title}
                </Typography>
                <Typography fontWeight={"bold"} color={"Highlight"}>
                  ${product.price}
                </Typography>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Rating value={product.rating.rate} precision={0.5} readOnly />
                  <Typography fontSize={"20px"}>
                    ({product.rating.count} reviews)
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Category: {product.category}
                </Typography>
                <Typography>{product.description}</Typography>
                <Stack direction="row" alignItems="center" gap={1}>
                  <IconButton onClick={() => handleQuantityChange("decrease")}>
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    value={quantity}
                    inputProps={{ readOnly: true }}
                    sx={{ width: "40px", textAlign: "center" }}
                  />
                  <IconButton onClick={() => handleQuantityChange("increase")}>
                    <AddIcon />
                  </IconButton>
                </Stack>
                <Button variant="outlined" onClick={handleAddToCart}>
                  Add to cart
                </Button>
              </Stack>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}

export default ProductDetail;
