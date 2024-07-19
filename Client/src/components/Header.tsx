import React from 'react';
import { AppBar, Toolbar, Typography, Button, InputBase, Container, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled, alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm kiếm…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', color: 'black' }}>
            {/* Giữ trống để căn giữa các thành phần */}
          </Typography>
          <Box>
            <IconButton component={Link} to="/login" color="inherit" style={{ color: 'black' }}>
              <PersonIcon />
            </IconButton>
            <IconButton color="inherit" style={{ color: 'black' }}>
              <ShoppingCartIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <AppBar position="static" style={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
            <img src="https://censor.vn/wp-content/uploads/2022/03/logo-cac-hang-giay-noi-tieng-1.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
          </Typography>
          <Box>
            <Button color="inherit" style={{ color: 'black' }}>Home</Button>
            <Button color="inherit" style={{ color: 'black' }}>Bags</Button>
            <Button color="inherit" style={{ color: 'black' }}>Sneakers</Button>
            <Button color="inherit" style={{ color: 'black' }}>Belt</Button>
            <Button color="inherit" style={{ color: 'black' }}>Contact</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} style={{ padding: 0, position: 'relative' }}>
        <Box
          style={{
            position: 'relative',
            width: '100%',
            height: '700px', // chiều cao của banner, có thể điều chỉnh
            backgroundImage: 'url(https://file.hstatic.net/200000174405/collection/19238246_1997064527179566_5473797071884482645_o_ff15685be80c4d21973dcb914398e04f.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '100%' }}>
            <Box textAlign="center">
              <Typography variant="h1" component="h1" style={{ color: 'white' }}>
                Collections
              </Typography>
              <Typography variant="body1" component="p" style={{ margin: '20px 0', color: 'white' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac.
              </Typography>
              <Button variant="contained" color="primary">
                Shop Now
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>

      <Box sx={{ padding: "20px 0" }}>
        <Typography variant="h1" textAlign="center" marginBottom={4}>
          BEST SELLER
        </Typography>
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
          <Button variant="text">All</Button>
          <Button variant="text">Bags</Button>
          <Button variant="text">Sneakers</Button>
          <Button variant="text">Belt</Button>
          <Button variant="text">Sunglasses</Button>
        </Box>
      </Box>
    </div>
  );
}

export default Header;
