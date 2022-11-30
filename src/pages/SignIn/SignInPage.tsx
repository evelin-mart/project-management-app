import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Paper, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ERRORS } from 'constants/ValidationErrors';
import { ROUTES } from 'constants/Routes';
import { selectUser, authorizeUser } from 'store/user';
import { useAppDispatch, useAppSelector } from 'store';
import { Loader } from 'components/Loader';
import { useNavigate } from 'react-router';
import { SignInQuery } from 'services/types/Auth.types';
import { Link } from 'react-router-dom';
import { UserProfileFields, userForm } from 'constants/UserForm';

export const SignInPage = () => {
  const { data, isLoading } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<SignInQuery>();

  useEffect(() => {
    if (!isLoading && data.id) {
      navigate(`/${ROUTES.BOARDS}`);
    }
  }, [data.id, isLoading, navigate]);

  const onSubmit: SubmitHandler<SignInQuery> = (data) => {
    dispatch(authorizeUser(data));
    reset();
  };

  return (
    <Loader isLoading={isLoading}>
      <Paper
        id="form"
        component="form"
        sx={{
          p: 3,
          maxWidth: '400px',
          width: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          m: 'auto',
          backgroundColor: theme.palette.grey[100],
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register(UserProfileFields.login, {
            required: userForm[UserProfileFields.login].required ? ERRORS.required : false,
            minLength: {
              value: userForm[UserProfileFields.login].minLength,
              message: ERRORS.minLength(
                userForm[UserProfileFields.login].title,
                userForm[UserProfileFields.login].minLength
              ),
            },
          })}
          fullWidth
          error={!!errors[UserProfileFields.login]}
          helperText={(errors[UserProfileFields.login]?.message as string) || ''}
          label={userForm[UserProfileFields.login].title}
          margin="normal"
        />
        <TextField
          {...register(UserProfileFields.password, {
            required: userForm[UserProfileFields.password].required ? ERRORS.required : false,
            minLength: {
              value: userForm[UserProfileFields.password].minLength,
              message: ERRORS.minLength(
                userForm[UserProfileFields.password].title,
                userForm[UserProfileFields.password].minLength
              ),
            },
          })}
          fullWidth
          error={!!errors[UserProfileFields.password]}
          helperText={(errors[UserProfileFields.password]?.message as string) || ''}
          label={userForm[UserProfileFields.password].title}
          margin="normal"
          type={'password'}
          autoComplete={'current-password'}
        />
        <Box>
          <Button
            sx={{ my: 2 }}
            type="submit"
            form="form"
            variant="contained"
            color="secondary"
            disabled={isDirty && !!Object.keys(errors).length}
          >
            Sign in
          </Button>
        </Box>
        <Box sx={{ my: 2 }}>
          <Link to={`/${ROUTES.SIGN_UP}`}>Don&#39;t have an account? Sign Up</Link>
        </Box>
      </Paper>
    </Loader>
  );
};
