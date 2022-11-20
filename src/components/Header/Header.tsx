import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
  ToggleButton,
  ToggleButtonGroup,
  useScrollTrigger,
} from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { ROUTES } from '../../constants';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { logout, selectUser } from 'store/user';

const routes = {
  [ROUTES.SIGN_IN]: 'Sign In',
  [ROUTES.SIGN_UP]: 'Sign Up',
};

export const Header = () => {
  const dispatch = useAppDispatch();
  const {
    data: { id: loggedUserId },
  } = useAppSelector(selectUser);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavMenuClick = (link: string) => {
    navigate(`/${link}`);
    handleCloseNavMenu();
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    dispatch(logout());
    navigate(ROUTES.HOME);
    setAnchorElUser(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const color = trigger ? theme.palette.text.secondary : theme.palette.common.white;
  const colorTransition = { transition: 'all 0.5s ease', color };

  return (
    <AppBar position="sticky" color={trigger ? 'secondary' : 'primary'} sx={colorTransition}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            to={ROUTES.HOME}
            color="white"
            variant={smUp ? 'h4' : 'h6'}
            noWrap
            component={Link}
            sx={{
              textDecoration: 'none',
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
            }}
          >
            EASYtoDO
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>
              <ToggleButtonGroup value="ru" exclusive size="small" sx={{ mx: 2 }}>
                <ToggleButton
                  value="en"
                  sx={{
                    ...colorTransition,
                    '&.Mui-selected, &.Mui-selected:hover': colorTransition,
                    py: 0.3,
                  }}
                >
                  En
                </ToggleButton>
                <ToggleButton
                  value="ru"
                  sx={{
                    ...colorTransition,
                    '&.Mui-selected, &.Mui-selected:hover': colorTransition,
                    py: 0.3,
                  }}
                >
                  Ru
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            {loggedUserId ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => handleNavMenuClick(ROUTES.PROFILE)}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogOut}>
                    <Typography textAlign="center">Log Out</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  {Object.entries(routes).map(([key, name]) => (
                    <Button
                      key={key}
                      onClick={() => handleNavMenuClick(key)}
                      sx={{ ...colorTransition, display: 'block', fontWeight: 700 }}
                    >
                      {name}
                    </Button>
                  ))}
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                  >
                    {Object.entries(routes).map(([key, name]) => (
                      <MenuItem key={key} onClick={() => handleNavMenuClick(key)}>
                        <Typography textAlign="center">{name}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
