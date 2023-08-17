// import axios from "axios";
// import { useState } from 'react';
// import { Outlet, useNavigate } from "react-router-dom";
// import { useAuth } from "../hook/useAuth";

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';

// const Layout = () => {
//   const auth = useAuth();
//   const navigate = useNavigate();


//   const [anchorElNav, setAnchorElNav] = useState(null);
//   const [anchorElUser, setAnchorElUser] = useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = (key) => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return ( 
//     <>
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               <MenuItem onClick={() => { navigate("/test"); setAnchorElNav(null);}}>
//                 <Typography textAlign="center">Test page</Typography>
//               </MenuItem>
//               <MenuItem onClick={() => { navigate("/home"); setAnchorElNav(null);}}>
//                 <Typography textAlign="center">Home</Typography>
//               </MenuItem>
//               {
//                 auth.accessToken ? (
//                   <div>
//                     <MenuItem onClick={() => {navigate("/cabinet"); setAnchorElNav(null);}}>
//                       <Typography textAlign="center">Cabinet</Typography>
//                     </MenuItem>
//                     <MenuItem onClick={() => {
//                       auth.logout(() => navigate("/", { replace: true }));
//                       setAnchorElNav(null);
//                     }}>
//                       <Typography textAlign="center">Log out</Typography>
//                     </MenuItem>
//                   </div>
//                 ) : (
//                   <div>
//                     <MenuItem onClick={() => { navigate("/login"); setAnchorElNav(null);}}>
//                       <Typography textAlign="center">Log in</Typography>
//                     </MenuItem>
//                     <MenuItem onClick={() => { navigate("/register"); setAnchorElNav(null);}}>
//                       <Typography textAlign="center">Register</Typography>
//                     </MenuItem>
//                   </div>
//                 )
                  
//               }
//             </Menu>
//           </Box>
//           <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href=""
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {/* {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 {page}
//               </Button>
              
//             ))} */}
//             {/* <Link to="/login">
//               Login
//             </Link> */}
//             <Button 
//               sx={{ my: 2, color: 'white', display: 'block' }} 
//               onClick={() => navigate("/test")}
//             >
//               Test page
//             </Button>
//             <Button 
//               sx={{ my: 2, color: 'white', display: 'block' }} 
//               onClick={() => navigate("/home")}
//             >
//               Home
//             </Button>
//             {
//               auth.accessToken ? (
//                   <>
//                   <Button 
//                     sx={{ my: 2, color: 'white', display: 'block' }}
//                     onClick={() => {
//                       navigate("/cabinet"); 
//                       setAnchorElNav(null);
//                     }}
//                     >
//                     Cabinet
//                   </Button>
//                   <Button 
//                     sx={{ my: 2, color: 'white', display: 'block' }}
//                     onClick={() => {
//                       auth.logout(() => navigate("/", { replace: true }));
//                       setAnchorElNav(null);
//                     }}
//                   >
//                     Log out
//                   </Button>
//                   </>
//                 ) : (
//                   <>
//                   <Button 
//                     sx={{ my: 2, color: 'white', display: 'block' }} 
//                     onClick={() => navigate("/login")}
//                   >
//                     Log in
//                   </Button>
//                   <Button 
//                     sx={{ my: 2, color: 'white', display: 'block' }} 
//                     onClick={() => navigate("/register")}
//                   >
//                     Register
//                   </Button>
//                   </>
//                 )
//             }
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//     <Outlet />
//   </>
//   );
// };

// export default Layout;