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
import { ROUTES } from 'constants/Routes';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';

const routes = {
  [ROUTES.SING_IN]: 'Sing In',
  [ROUTES.SING_UP]: 'Sing Up',
};

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const loggedUser = null;

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
            color="primary"
            variant={smUp ? 'h4' : 'h6'}
            noWrap
            component="a"
            href={ROUTES.HOME}
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EASYtoDO
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>
              <ToggleButtonGroup value="ru" exclusive size="small" sx={{ m: 1 }}>
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
            {loggedUser ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                  {Object.entries(routes).map(([key, name]) => (
                    <MenuItem key={key} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{name} </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  {Object.entries(routes).map(([key, name]) => (
                    <Button
                      key={key}
                      onClick={() => handleNavMenuClick(key)}
                      sx={{ my: 2, ...colorTransition, display: 'block', fontWeight: 700 }}
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
