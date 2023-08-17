import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AddCardIcon from '@mui/icons-material/AddCard';
import LoginIcon from '@mui/icons-material/Login';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
// import PropTypes from 'prop-types';

import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const auth = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const cont = window !== undefined ? () => window().document.body : undefined;

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: 2, 
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />

            {/* Menu sprava */}
            {/* {
              auth.accessToken && (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={localStorage.getItem("userId")} src="/images/1.webp" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={() => { navigate("/cabinet"); handleCloseUserMenu() }}>
                      <Typography textAlign="center">Кабинет</Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => {
                      auth.logout(() => navigate("/login", { replace: true }));
                      handleCloseUserMenu();
                    }}>
                      <Typography textAlign="center">Выйти</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              )
            } */}
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={cont}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            onClick={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <Toolbar />
            <Divider />
            <Box>
              <List>
                {
                  auth.accessToken && (
                    <>
                    <ListItem onClick={() => { navigate("/main")}} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <HomeIcon /> 
                        </ListItemIcon>
                        <ListItemText primary="Главная" primaryTypographyProps={{ fontSize: 14 }}/>
                      </ListItemButton>
                    </ListItem>
                    <ListItem onClick={() => { navigate("/cabinet")}} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <AccountCircleIcon /> 
                        </ListItemIcon>
                        <ListItemText primary="Кабинет" primaryTypographyProps={{ fontSize: 14 }}/>
                      </ListItemButton>
                    </ListItem>
                    </>
                  )
                }
                {
                  auth.accessToken && auth.userRole == 4 ? (
                    <>
                    <ListItem onClick={() => { navigate("/patients")}} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <AddCardIcon /> 
                        </ListItemIcon>
                        <ListItemText primary="Регистратура" primaryTypographyProps={{ fontSize: 14 }}/>
                      </ListItemButton>
                    </ListItem>
                    </>
                  ) : (
                    <Box />
                  )
                }
                {
                  auth.accessToken && auth.userRole == 2 ? (
                    <>
                    <ListItem onClick={() => { navigate("/patients")}} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <AddCardIcon /> 
                        </ListItemIcon>
                        <ListItemText primary="Пациенты" primaryTypographyProps={{ fontSize: 14 }}/>
                      </ListItemButton>
                    </ListItem>
                    </>
                  ) : (
                    <Box />
                  )
                }
                {
                  auth.accessToken && auth.userRole == 1 ? (
                    <>
                    <ListItem onClick={() => { navigate("/patients")}} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <AddCardIcon /> 
                        </ListItemIcon>
                        <ListItemText primary="Пациенты" primaryTypographyProps={{ fontSize: 14 }}/>
                      </ListItemButton>
                    </ListItem>
                    </>
                  ) : (
                    <Box />
                  )
                }
                {
                  auth.accessToken && auth.userRole === "3" ? (
                    <>
                    <ListItem onClick={() => { navigate("/users")}} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <GroupIcon /> 
                        </ListItemIcon>
                        <ListItemText primary="Пользователи" primaryTypographyProps={{ fontSize: 14 }}/>
                      </ListItemButton>
                    </ListItem>
                    <ListItem onClick={() => { navigate("/patients")}} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <GroupIcon /> 
                        </ListItemIcon>
                        <ListItemText primary="Пациенты" primaryTypographyProps={{ fontSize: 14 }}/>
                      </ListItemButton>
                    </ListItem>
                    </>
                  ) : (
                    <Box />
                  )
                }
                {
                  auth.accessToken ? (
                    <ListItem onClick={() => {
                      auth.logout(() => navigate("/login", { replace: true })) }
                    } disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <LogoutIcon /> 
                        </ListItemIcon>
                        <ListItemText primary="Выйти" primaryTypographyProps={{ fontSize: 14 }}/>
                      </ListItemButton>
                    </ListItem>
                  ) : (
                    <div>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => {
                              navigate("/login", { replace: true })
                            }}>
                        <ListItemText primaryTypographyProps={{ fontSize: 14 }}>Войти</ListItemText>
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => {
                              navigate("/register", { replace: true })
                            }}>
                        <ListItemText primaryTypographyProps={{ fontSize: 14 }}>Зарегистрироваться</ListItemText>
                      </ListItemButton>
                    </ListItem>
                    </div>
                  )
                }
              </List>
            </Box>
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 2, width: { sm: `calc(100% - ${drawerWidth}px)` }}}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Container>  
  );
}

export default ResponsiveDrawer;
