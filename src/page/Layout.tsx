import { Box } from '@mui/material';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

const Layout = () => {

  const _location = useLocation();
  const to = Navigate;
  console.log(to);

  if(_location.pathname !== '/mui') {
    to({
      to: '/mui'
    });
  }

  console.log(_location);

  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default Layout;
