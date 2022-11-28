import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  useScrollTrigger,
} from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { ROUTES } from '../../constants';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { logout, selectUser } from 'store/user';

export const Header = () => {
  const dispatch = useAppDispatch();
  const {
    data: { id: loggedUserId },
  } = useAppSelector(selectUser);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
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

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavMenuClick = (link: string) => {
    navigate(`/${link}`);
    handleCloseNavMenu();
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  const color = trigger ? theme.palette.text.secondary : theme.palette.common.white;
  const colorTransition = { transition: 'all 0.5s ease', color };

  const routes = loggedUserId
    ? {
        'Go to Main Page': ROUTES.BOARDS,
        'Create New Board': () => {},
        'Edit Profile': ROUTES.PROFILE,
        'Sign Out': handleLogOut,
      }
    : {
        'Sign In': ROUTES.SIGN_IN,
        'Sign Up': ROUTES.SIGN_UP,
      };

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
            <Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {Object.entries(routes).map(([name, action]) =>
                  typeof action === 'string' ? (
                    <Typography
                      key={name}
                      to={`/${action}`}
                      component={NavLink}
                      sx={{
                        ...colorTransition,
                        textDecoration: 'none',
                        display: 'block',
                        '&.active': {
                          textDecoration: `solid underline ${theme.palette.primary.contrastText} 3px`,
                        },
                        px: 1,
                      }}
                    >
                      {name}
                    </Typography>
                  ) : (
                    <Typography
                      key={name}
                      onClick={action}
                      sx={{
                        ...colorTransition,
                        cursor: 'pointer',
                        display: 'block',
                        px: 1,
                      }}
                    >
                      {name}
                    </Typography>
                  )
                )}
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
                  {Object.entries(routes).map(([name, action]) => (
                    <MenuItem
                      key={name}
                      onClick={() => {
                        typeof action === 'string' ? handleNavMenuClick(action) : action();
                      }}
                    >
                      <Typography textAlign="center">{name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
