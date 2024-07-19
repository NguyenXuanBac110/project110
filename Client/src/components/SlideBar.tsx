
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Stack } from "@mui/material";
import { Dashboard as DashboardIcon, BarChart as BarChartIcon, Payment as PaymentIcon, AccountBalanceWallet as AccountBalanceWalletIcon, ShoppingCart as ShoppingCartIcon, PeopleAlt as PeopleAltIcon, Message as MessageIcon, Settings as SettingsIcon, ExitToApp as ExitToAppIcon, Delete as DeleteIcon, Edit as EditIcon, AddCircleOutline as AddCircleOutlineIcon } from "@mui/icons-material";
export default function TemporaryDrawer() {


 

  return (
    <div>
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
    </div>
  );
}

