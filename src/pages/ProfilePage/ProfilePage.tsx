import React, { useEffect, useMemo, MouseEventHandler } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Container, Paper, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ERRORS } from 'constants/ValidationErrors';
import { ROUTES } from 'constants/Routes';
import { selectUser, updateUser } from 'store/user';
import { useAppDispatch, useAppSelector } from 'store';
import { Loader } from 'components/Loader';
import { useNavigate } from 'react-router';
import { UpdateUserRequest } from 'services/types/Users.types';
import { UserProfileFields, userForm } from 'constants/UserForm';
import { ModalTypes, openModal } from 'store/modal';
import { DeleteItems } from 'components/Modal/ConfirmDeletion/ConfirmDeletion';

export const ProfilePage = () => {
  const { data, isLoading } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<UpdateUserRequest>({
    defaultValues: useMemo(() => {
      return { name: data.name, login: data.login };
    }, [data]),
  });

  useEffect(() => {
    reset({ name: data.name, login: data.login });
  }, [data, reset]);

  useEffect(() => {
    if (!isLoading && !data.id) {
      navigate(`/${ROUTES.SIGN_IN}`);
    }
  }, [data.id, isLoading, navigate]);

  const onUpdateSubmit: SubmitHandler<UpdateUserRequest> = (data) => {
    dispatch(updateUser(data));
    reset();
  };

  const handleDeleteUser: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(openModal({ type: ModalTypes.DELETE, props: { type: DeleteItems.USER } }));
  };

  return (
    <Loader isLoading={isLoading}>
      <Container
        sx={{ flex: '1 1 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper
          id="form"
          component="form"
          sx={{
            p: 3,
            maxWidth: '500px',
            width: 'inherit',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: theme.palette.grey[100],
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onUpdateSubmit)}
        >
          <Typography
            variant={smUp ? 'h5' : 'h6'}
            align="center"
            sx={{ mb: '1rem', wordBreak: 'break-word' }}
          >
            My profile
          </Typography>
          {Object.values(UserProfileFields).map((key) => (
            <TextField
              key={key}
              {...register(key, {
                required: userForm[key].required ? ERRORS.required : false,
                minLength: {
                  value: userForm[key].minLength,
                  message: ERRORS.minLength(userForm[key].title, userForm[key].minLength),
                },
              })}
              fullWidth
              error={!!errors[key]}
              helperText={(errors[key]?.message as string) || ''}
              label={userForm[key].title}
              margin="normal"
              type={key === UserProfileFields.password ? 'password' : 'text'}
              autoComplete={key === UserProfileFields.password ? 'current-password' : 'text'}
            />
          ))}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap-reverse',
            }}
          >
            <Button
              sx={{ mt: 2, mx: 1 }}
              form="form"
              variant="contained"
              color="error"
              onClick={handleDeleteUser}
            >
              Delete user
            </Button>
            <Button
              sx={{ mt: 2, mx: 1 }}
              type="submit"
              form="form"
              variant="contained"
              color="secondary"
              disabled={isDirty && !!Object.keys(errors).length}
            >
              Save
            </Button>
          </Box>
        </Paper>
      </Container>
    </Loader>
  );
};
