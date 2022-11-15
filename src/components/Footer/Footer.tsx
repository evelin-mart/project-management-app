import React from 'react';
import { AppBar, Box, Container, Toolbar, Grid, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/system';
import RsSchoolLogo from '../../assets/img/rs-school-js.svg';
import GitHubLogo from '../../assets/img/github-logo.png';

const Image = styled('img')({
  height: '30px',
});

const gitHubUsers = {
  denisselet: 'https://github.com/denisselet',
  evelin: 'https://github.com/evelin-mart',
  lapkot: 'https://github.com/lapkot',
};

export const Footer = () => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.palette.grey[100], boxShadow: 'none' }}
      component="footer"
    >
      <Container maxWidth="xl" sx={{ py: smUp ? 0 : 2 }}>
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              flexDirection: smUp ? 'row' : 'column',
            }}
          >
            <Link href="https://rs.school/react/">
              <Image src={RsSchoolLogo} alt="home image" loading="lazy" />
            </Link>
            <Grid
              container
              spacing={smUp ? 2 : 0}
              justifyContent="center"
              alignItems="center"
              direction={smUp ? 'row' : 'column'}
              sx={{ py: smUp ? 0 : 1 }}
            >
              {Object.entries(gitHubUsers).map(([user, link]) => (
                <Grid item key={user} sx={{ p: 0 }}>
                  <Link href={link} underline="hover">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {smUp && <Image src={GitHubLogo} alt="github image" loading="lazy"></Image>}
                      <Typography color="text.primary" sx={{ px: 1 }}>
                        {user}
                      </Typography>
                    </Box>
                  </Link>
                </Grid>
              ))}
            </Grid>
            <Typography component="span" color="text.primary" noWrap sx={{ overflow: 'unset' }}>
              2022. React 2022Q3
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
