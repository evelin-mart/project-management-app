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
import { useTranslation } from 'react-i18next';
import { ModalTypes, openModal } from 'store/modal';

export const Header = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const { id } = useAppSelector(selectUser).data;
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

  const HandleAddBoard = () => {
    dispatch(openModal({ type: ModalTypes.ADD_BOARD, props: null }));
  };

  const handleLangChange = (_: React.MouseEvent<HTMLElement>, lang: string) => {
    i18n.changeLanguage(lang);
  };

  const color = trigger ? theme.palette.text.secondary : theme.palette.common.white;
  const colorTransition = { transition: 'all 0.5s ease', color };

  const routes = id
    ? {
        gtmp: ROUTES.BOARDS,
        cnb: HandleAddBoard,
        epro: ROUTES.PROFILE,
        signOut: handleLogOut,
      }
    : {
        signIn: ROUTES.SIGN_IN,
        signUp: ROUTES.SIGN_UP,
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
              <ToggleButtonGroup
                value={i18n.resolvedLanguage}
                onChange={handleLangChange}
                exclusive
                size="small"
                sx={{ mx: 2 }}
              >
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
                      {t(name)}
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
                      {t(name)}
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
                      <Typography textAlign="center">{t(name)}</Typography>
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
