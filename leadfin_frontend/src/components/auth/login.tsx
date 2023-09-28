import React, { FormEvent } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from './login.module.css';

export default function Login() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div className={styles.loginContainer}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className={styles.loginElement}>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate className={styles.loginForm}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Запомнить меня"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={styles.loginSubmitButton}
            >
              Войти
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/registration" variant="body2">
                  {"Нет аккаунта? Зарегистрироваться"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
