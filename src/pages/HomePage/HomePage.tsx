import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/system';
import MainImage from '../../assets/img/home-main-img.jpg';
import DenisAvatar from '../../assets/img/denis-avatar.png';
import EvelinAvatar from '../../assets/img/evelin-avatar.png';
import TanyaAvatar from '../../assets/img/tanya-avatar.png';

const Image = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  objectFit: 'contain',
});

const developers = {
  Evelin: {
    image: EvelinAvatar,
    text: 'Работала над таким-то функционалом. Еще над вот таким и немного над вот таким. Сделала это, то и сё.',
  },
  Denis: {
    image: DenisAvatar,
    text: 'Работал над таким-то функционалом. Еще над вот таким и немного над вот таким. Сделал это, то и сё.',
  },
  Tanya: {
    image: TanyaAvatar,
    text: 'Работала над таким-то функционалом. Еще над вот таким и немного над вот таким. Сделал это, то и сё.',
  },
};

export const HomePage = () => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={{ p: 4, maxWidth: '1200px', margin: 'auto' }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            aligntItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            color="textPrimary"
            variant={smUp ? 'h4' : 'h5'}
            component="h2"
            sx={{ my: 2 }}
          >
            About EASYtoDO
          </Typography>
          <Typography color="textPrimary">
            Текст текст текст текст Много текста: текст текст текст текст текст текст текст текст
            текст текст текст текст текст текст текст текст текст текст Еще текст Еще текст Текст
            текст текст текст Много текста: текст текст текст текст текст текст текст текст текст
            текст текст текст текст текст текст текст текст текст Еще текст Еще текст Текст текст
            текст текст Много текста: текст текст текст текст текст текст текст текст текст текст
            текст текст текст текст текст текст текст текст Еще текст Еще текст Текст текст текст
            текст Много текста: текст текст текст текст текст текст текст текст текст текст текст
            текст текст текст текст текст текст текст Еще текст Еще текст
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            aligntItems: 'center',
          }}
        >
          <Image src={MainImage} alt="home image" loading="lazy" />
        </Grid>
      </Grid>
      <Box sx={{ my: 10 }}>
        <Typography
          variant={smUp ? 'h4' : 'h5'}
          component="h2"
          align="center"
          color="textPrimary"
          sx={{ my: 2 }}
        >
          Team
        </Typography>
        <Grid container spacing={6} justifyContent="center" alignItems="stretch">
          {Object.entries(developers).map(([developer, { image, text }]) => (
            <Grid item key={developer} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  image={image}
                  alt={developer}
                  sx={{ height: '100px', width: 'auto', mt: 2, mx: 'auto' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" align="center">
                    {developer}
                  </Typography>
                  <Typography variant="body2">{text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
