import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
  Paper,
  Avatar,
  CssBaseline,
  Grid,
  createTheme,
  ThemeProvider,
  Stack,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from "react-i18next";

const theme = createTheme();

export default function LogIn() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    let valid = true;
    let newErrors = { email: '', password: '' };

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.login.email_error');
      valid = false;
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = t('auth.login.password_error');
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Signed in with:', formData);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        
        {/* صورة خلفية */}
        <Grid
          item size={{ xs: false, sm:4, md:6 }}
          sx={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[100] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* نموذج تسجيل الدخول */}
        <Grid item size={{ xs: 12, sm:8, md:6 }} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              {t('auth.login.title')}
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t('auth.login.email_label')}
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t('auth.login.password_label')}
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={t('auth.login.remember_me')}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t('auth.login.submit_button')}
              </Button>

              <Stack direction="row" justifyContent={"space-between"}>
                  <Link href="/forgot-password" variant="body2">
                    {t('auth.login.forgot_password')}
                  </Link>

                  <Link href="/signup" variant="body2">
                    {t('auth.login.no_account')}
                  </Link>
                
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
