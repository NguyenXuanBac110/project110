import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Stack,
  Typography,
  Box,
  IconButton,
  Grid,
  Alert,
  AppBar,
  Toolbar,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Product } from "src/types/product";
import Loading from "src/components/loading";
import icon from '../../images/star.png'

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
      const { data } = await axios.get<Product>(`http://localhost:3000/products/${id}`);
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
    if (id) {
      getProduct(id);
    }
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
    if (product) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingProductIndex = cart.findIndex((item: { id: string }) => item.id === product.id);
      if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += quantity;
      } else {
        cart.push({ ...product, quantity });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${quantity} of ${product.title} added to cart`);
      navigate('/cart');
    }
  };

  return (
    < >
     <Box sx={{backgroundColor: 'white'}}>
     <Loading />
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'black' }}>
            <img src="https://censor.vn/wp-content/uploads/2022/03/logo-cac-hang-giay-noi-tieng-1.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
          </Typography>
          <Box>
            <Button color="inherit" sx={{ color: 'black' }}>Home</Button>
            <Button color="inherit" sx={{ color: 'black' }}>Bags</Button>
            <Button color="inherit" sx={{ color: 'black' }}>Sneakers</Button>
            <Button color="inherit" sx={{ color: 'black' }}>Belt</Button>
            <Button color="inherit" sx={{ color: 'black' }}>Contact</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: '20px', marginBottom: '20px', maxWidth: '1400px' }}>
        {loading && <Loading />}
        {error && <Alert severity="error">{error}</Alert>}
        {product ? (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ border: '2px solid', borderColor: '#e0e0e0', borderRadius: '16px', overflow: 'hidden' }}>
                <img src={product.image} alt={product.title} style={{ width: '100%', height: 'auto' }} />
              </Box>
              <Stack direction="row" spacing={2} sx={{ marginTop: '10px' }}>
                {Array.isArray(product.images) && product.images.map((img, index) => (
                  <IconButton key={index} onMouseOver={() => { /* Handle image change */ }}>
                    <img src={img} alt={`Product ${index}`} style={{ width: '100px', height: 'auto', border: '2px solid #e0e0e0', borderRadius: '8px' }} />
                  </IconButton>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ color: '#003F62' }}>{product.title}</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>${product.price}</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                {Array(5).fill(null).map((_, index) => (
                  <img key={index} src={icon} alt={`Star ${index}`} style={{ width: '29px', height: 'auto' }} />
                ))}
                <Typography variant="body2" sx={{ color: '#4A4A4A' }}>No reviews</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: '10px' }}>
                <Typography variant="body1">Availability:</Typography>
                <img src="/assets/images/Vector.png" alt="Availability" style={{ width: '20px', height: 'auto' }} />
                <Typography variant="body1" sx={{ color: '#30BD57' }}>In stock</Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: '#5D5D5D', marginTop: '10px' }}>{product.description}</Typography>
              <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />
              <Stack direction="row" spacing={2} alignItems="center" sx={{ marginTop: '10px' }}>
                <Typography>Color:</Typography>
                <Box sx={{ width: '15px', height: '15px', backgroundColor: '#565656', borderRadius: '50%' }} />
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: '10px' }}>
                <Typography>Size:</Typography>
                {[30, 32, 34, 36].map(size => (
                  <Button key={size} sx={{ width: '63px', height: '32px', backgroundColor: '#EEEEEE', '&:hover': { borderColor: '#000' } }}>
                    {size}
                  </Button>
                ))}
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: '10px' }}>
                <Typography>Quantity:</Typography>
                <IconButton onClick={() => handleQuantityChange('decrease')} sx={{ backgroundColor: '#EEEEEE' }}>
                  <RemoveIcon />
                </IconButton>
                <Typography>{quantity}</Typography>
                <IconButton onClick={() => handleQuantityChange('increase')} sx={{ backgroundColor: '#EEEEEE' }}>
                  <AddIcon />
                </IconButton>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ marginTop: '20px' }}>
                <Button variant="contained" color="warning" onClick={handleAddToCart} sx={{ width: '250px', height: '74px', fontSize: '22px' }}>
                  Add to cart
                </Button>
                <Button variant="contained" color="warning" sx={{ width: '250px', height: '74px', fontSize: '22px' }}>
                  Buy it now
                </Button>
                <IconButton sx={{ backgroundColor: '#EEEEEE' }}>
                  <img src="/assets/images/traitim.png" alt="Favorite" style={{ width: '36px' }} />
                </IconButton>
              </Stack>
              <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />
              <Stack spacing={2} sx={{ marginTop: '20px' }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>Sku:</Typography>
                  <Typography>01133-9-9</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>Category:</Typography>
                  <Typography sx={{ fontSize: '13px' }}>20% off,</Typography>
                  <Typography sx={{ fontSize: '13px' }}>49% off</Typography>
                  <Typography sx={{ fontSize: '13px' }}>51% off</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>Tags:</Typography>
                  <Typography sx={{ fontSize: '13px' }}>White</Typography>
                  <Typography sx={{ fontSize: '13px' }}>Socks</Typography>
                  <Typography sx={{ fontSize: '13px' }}>Sports</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        ) : (
          !loading && !error && <Typography>No product found</Typography>
        )}
      </Container>
     </Box>
    </>
  );
}

export default ProductDetail;
