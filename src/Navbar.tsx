import { MenuOutlined } from '@mui/icons-material';
import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';

const getNavLinkStyle = ({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) => {
  const s: any = {
    textDecoration: 'none',
    marginRight: 8,
  };
  if (isActive) {
    s.fontWeight = 'bold';
  }
  return s;
};

const Nav = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuOutlined />
          </IconButton>
          <NavLink to={'/worker'} style={getNavLinkStyle}>
            worker
          </NavLink>
          <NavLink to={'/react/transition'} style={getNavLinkStyle}>
            transition
          </NavLink>
          <Link
            to="/react/deferredValue"
            style={{ textDecoration: 'none', marginRight: 8 }}
          >
            deferredValue
          </Link>
          <Link
            to="/react/suspense"
            style={{ textDecoration: 'none', marginRight: 8 }}
          >
            suspense
          </Link>
          <Link
            to="/react/contextProvider"
            style={{ textDecoration: 'none', marginRight: 8 }}
          >
            contextProvider
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Nav;
