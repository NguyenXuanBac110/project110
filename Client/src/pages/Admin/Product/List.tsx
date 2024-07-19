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
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Stack } from "@mui/material";
import { Dashboard as DashboardIcon, BarChart as BarChartIcon, Payment as PaymentIcon, AccountBalanceWallet as AccountBalanceWalletIcon, ShoppingCart as ShoppingCartIcon, PeopleAlt as PeopleAltIcon, Message as MessageIcon, Settings as SettingsIcon, ExitToApp as ExitToAppIcon, Delete as DeleteIcon, Edit as EditIcon, AddCircleOutline as AddCircleOutlineIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";

import { Product } from "src/types/product";

type ComfirmDialogProps = {
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

function ComfirmDialog({ confirm, onConfirm, onDeleteConfirmed }: ComfirmDialogProps) {
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
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  const handleDelete = (productId: number) => {
    setSelectedProductId(productId);
    setConfirm(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      // Perform deletion logic using selectedProductId
      if (selectedProductId) {
        await axios.delete(`http://localhost:3000/products/${selectedProductId}`);
        // After deletion, update the product list
        setProducts((prevProducts) => prevProducts.filter(product => product.id !== selectedProductId));
        // Open snackbar
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


  return (
    <>
      <Box sx={{ display: 'flex', width: 1440, height: 956 }}>
        {/* Navigation Sidebar */}
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
            {/* Logo */}
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
              Logo
            </Typography>
            {/* Navigation Items */}
            <List>
              <ListItem button>
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><BarChartIcon /></ListItemIcon>
                <ListItemText primary="Statistics" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><PaymentIcon /></ListItemIcon>
                <ListItemText primary="Payment" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
                <ListItemText primary="Transactions" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                <ListItemText primary="Products" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><PeopleAltIcon /></ListItemIcon>
                <ListItemText primary="Customer" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><MessageIcon /></ListItemIcon>
                <ListItemText primary="Message" />
              </ListItem>
            </List>
            {/* Bottom Items */}
            <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
              <List>
                <ListItem button>
                  <ListItemIcon><SettingsIcon /></ListItemIcon>
                  <ListItemText primary="Setting" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Drawer>

        {/* Main Content */}
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
    {products.map((product, index) => (
      <TableRow key={index}>
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
        </Box>
      </Box>

      {/* Confirmation Dialog */}
      <ComfirmDialog
        confirm={confirm}
        onConfirm={handleConfirmDialogClose}
        onDeleteConfirmed={handleDeleteConfirmed}
      />

      {/* Snackbar for success message */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Product deleted successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default AdminList;
