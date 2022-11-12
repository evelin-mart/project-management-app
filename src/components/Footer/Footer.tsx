import React from 'react';
import { AppBar, Box, Container, Toolbar, Grid, Typography, Link } from '@mui/material';

import RsSchoolLogo from '../../assets/img/rs-school-js.svg';
import GitHubLogo from '../../assets/img/github-logo.png';
import { styled } from '@mui/system';

const Image = styled('img')({
  height: '30px',
});

const gitHubUsers = {
  denisselet: 'https://github.com/denisselet',
  evelin: 'https://github.com/evelin-mart',
  lapkot: 'https://github.com/lapkot',
};

export const Footer = () => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: '#e8e8e8', boxShadow: 'none' }}
      component="footer"
    >
      <Container maxWidth="xl">
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
            }}
          >
            <Link href="https://rs.school/react/">
              <Image src={RsSchoolLogo} alt="home image" loading="lazy" />
            </Link>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              {Object.entries(gitHubUsers).map(([user, link]) => (
                <Grid item key={user}>
                  <Link href={link} underline="hover">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Image src={GitHubLogo} alt="github image" loading="lazy"></Image>
                      <Typography sx={{ px: 1 }}>{user}</Typography>
                    </Box>
                  </Link>
                </Grid>
              ))}
            </Grid>
            <Typography component="span" noWrap sx={{ overflow: 'unset' }}>
              2022. React 2022Q3
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
