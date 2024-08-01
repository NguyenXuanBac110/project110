import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Stack, TextField, MenuItem, Pagination } from "@mui/material";
import { Dashboard as DashboardIcon, BarChart as BarChartIcon, Payment as PaymentIcon, AccountBalanceWallet as AccountBalanceWalletIcon, ShoppingCart as ShoppingCartIcon, PeopleAlt as PeopleAltIcon, Message as MessageIcon, Settings as SettingsIcon, ExitToApp as ExitToAppIcon, Delete as DeleteIcon, Edit as EditIcon, AddCircleOutline as AddCircleOutlineIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";

import { Product } from "src/types/product";

type ConfirmDialogProps = {
  confirm: boolean;
  onConfirm: (confirm: boolean) => void;
  onDeleteConfirmed: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ConfirmDialog({ confirm, onConfirm, onDeleteConfirmed }: ConfirmDialogProps) {
  const handleClose = () => {
    onConfirm(false);
  };

  const handleAgree = () => {
    onConfirm(false);
    onDeleteConfirmed();
  };

  return (
    <React.Fragment>
      <Dialog
        open={confirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAgree} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function AdminList() {
  const [confirm, setConfirm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get<Product[]>('http://localhost:3000/products');
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleDelete = (productId: string) => {
    setSelectedProductId(productId);
    setConfirm(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      if (selectedProductId !== null) {
        await axios.delete(`http://localhost:3000/products/${selectedProductId}`);
        setProducts((prevProducts) => prevProducts.filter(product => product.id !== selectedProductId));
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setSelectedProductId(null);
    }
  };

  const handleConfirmDialogClose = () => {
    setConfirm(false);
    setSelectedProductId(null);
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const filteredProducts = products.filter(product => {
    return (
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory ? product.category.name === filterCategory : true)
    );
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterCategory(event.target.value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <Box sx={{ display: 'flex', width: 1440, height: 956 }}>
        <Drawer
          variant="permanent"
          sx={{
            width: 209,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 209,
              backgroundColor: '#2E2E48',
              color: '#FFFFFF',
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
              Ag
            </Typography>
            <List>
              <ListItem button>
                <ListItemIcon sx={{ color: '#FFFFFF' }}><DashboardIcon /></ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button>
                <ListItemIcon sx={{ color: '#FFFFFF' }}><BarChartIcon /></ListItemIcon>
                <ListItemText primary="Statistics" />
              </ListItem>
              <ListItem button>
                <ListItemIcon sx={{ color: '#FFFFFF' }}><PaymentIcon /></ListItemIcon>
                <ListItemText primary="Payment" />
              </ListItem>
              <ListItem button>
                <ListItemIcon sx={{ color: '#FFFFFF' }}><AccountBalanceWalletIcon /></ListItemIcon>
                <ListItemText primary="Transactions" />
              </ListItem>
              <ListItem button>
                <ListItemIcon sx={{ color: '#FFFFFF' }}><ShoppingCartIcon /></ListItemIcon>
                <ListItemText primary="Products" />
              </ListItem>
              <ListItem button>
                <ListItemIcon sx={{ color: '#FFFFFF' }}><PeopleAltIcon /></ListItemIcon>
                <ListItemText primary="Customer" />
              </ListItem>
              <ListItem button>
                <ListItemIcon sx={{ color: '#FFFFFF' }}><MessageIcon /></ListItemIcon>
                <ListItemText primary="Message" />
              </ListItem>
            </List>
            <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
              <List>
                <ListItem button>
                  <ListItemIcon sx={{ color: '#FFFFFF' }}><SettingsIcon /></ListItemIcon>
                  <ListItemText primary="Setting" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon sx={{ color: '#FFFFFF' }}><ExitToAppIcon /></ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1">
              Latest Orders
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/admin/product/add">
                <IconButton color="primary" aria-label="Add Product">
                  <AddCircleOutlineIcon />
                </IconButton>
              </Link>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <TextField
              label="Search Products"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <TextField
              select
              label="Filter by Category"
              value={filterCategory}
              onChange={handleFilterChange}
              variant="outlined"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {/* Add your categories here */}
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="2HAND">2HAND</MenuItem>
              <MenuItem value="Sản phẩm chính hãng">Sản phẩm chính hãng</MenuItem>
            </TextField>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>
                      <img src={product.image} alt={product.title} style={{ width: 100, height: 'auto' }} />
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <IconButton
                          component={Link}
                          to={`/admin/product/edit/${product.id}`}
                          color="primary"
                          aria-label="Edit Product"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" aria-label="Delete Product" onClick={() => handleDelete(product.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(filteredProducts.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
          />
        </Box>
      </Box>

      <ConfirmDialog
        confirm={confirm}
        onConfirm={handleConfirmDialogClose}
        onDeleteConfirmed={handleDeleteConfirmed}
      />

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Product deleted successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default AdminList;
