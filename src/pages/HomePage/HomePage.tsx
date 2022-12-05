import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  useMediaQuery,
  Container,
  Stack,
} from '@mui/material';
import { styled, Box } from '@mui/system';
import MainImage from '../../assets/img/home-main-img.jpg';
import DenisAvatar from '../../assets/img/denis-avatar.png';
import EvelinAvatar from '../../assets/img/evelin-avatar.png';
import TanyaAvatar from '../../assets/img/tanya-avatar.png';
import { useTranslation } from 'react-i18next';

const Image = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  objectFit: 'contain',
});

const developers = {
  Evelin: {
    image: EvelinAvatar,
    text: 'dev1',
  },
  Denis: {
    image: DenisAvatar,
    text: 'dev2',
  },
  Tanya: {
    image: TanyaAvatar,
    text: 'dev3',
  },
};

export const HomePage = () => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const { t } = useTranslation();

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        pb: 2,
        pt: 2,
      }}
    >
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
            {t('about')} EASYtoDO
          </Typography>
          <Typography component="div" color="textPrimary">
            <p>{t('pro1')}</p>
            {t('pro2')}
            <ul>
              <li>{t('list1')}</li>
              <li>{t('list2')}</li>
              <li>{t('list3')}</li>
            </ul>
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
      <Box sx={{ mt: 5 }}>
        <Typography
          variant={smUp ? 'h4' : 'h5'}
          component="h2"
          align="center"
          color="textPrimary"
          sx={{ my: 2 }}
        >
          {t('team')}
        </Typography>
        <Stack
          gap={5}
          justifyContent="center"
          alignItems="stretch"
          flexDirection={smUp ? 'row' : 'column'}
        >
          {Object.entries(developers).map(([developer, { image, text }]) => (
            <Card key={developer} sx={{ maxWidth: '350px' }}>
              <CardMedia
                component="img"
                image={image}
                alt={t(developer)}
                sx={{ height: '100px', width: 'auto', mt: 2, mx: 'auto' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" align="center">
                  {t(developer)}
                </Typography>
                <Typography variant="body2">{t(text)}</Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
      <Stack sx={{ my: 5, width: '100%', alignItems: 'center' }}>
        <Typography
          variant={smUp ? 'h4' : 'h5'}
          component="h2"
          align="center"
          color="textPrimary"
          sx={{ my: 2 }}
        >
          {t('guide')}
        </Typography>
        <iframe
          style={{
            aspectRatio: '16/9',
            width: smUp ? '70%' : '100%',
            height: 'auto',
          }}
          src="https://www.youtube.com/embed/qhAiLOYf01E"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Stack>
    </Container>
  );
};
