import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet,  } from 'react-router-dom'
import ResponsiveDrawer from './ResponsiveDrawer';
import { useAuth } from '../hook/useAuth';

const Home = () => {

  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname;

  useEffect(() => {
    if (location.pathname === '/') {
      if (localStorage.getItem('accessToken')) {
        console.log(location)
        navigate('/main');
      } else {
        navigate('/login')
      }
    }
  }, [location.pathname])

  return (
    <ResponsiveDrawer />
    // <Outlet />
  )
};

export default Home;