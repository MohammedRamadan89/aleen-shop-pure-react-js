import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper,
  Avatar,
  CssBaseline,
  Grid,
  createTheme,
  ThemeProvider,
  Stack,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from 'react-i18next';

const theme = createTheme();

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ email: '' });
  const [errors, setErrors] = useState({ email: '' });

  const handleChange = (e) => {
    setFormData({ email: e.target.value });
  };

  const validate = () => {
    let valid = true;
    let newErrors = { email: '' };

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.forgot_password.email_error');
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Password reset request sent for:', formData.email);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        {/* صورة خلفية */}
        <Grid
          item size={{ xs: false, sm: 4, md: 6 }}
          sx={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[100] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* نموذج Forgot Password */}
        <Grid item size={{ xs: 12, sm: 8, md: 6 }} component={Paper} elevation={6} square>
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
              {t('auth.forgot_password.title')}
            </Typography>

            <Typography variant="body2" sx={{ mt: 1, mb: 2, textAlign: 'center', color: 'text.secondary' }}>
              {t('auth.forgot_password.description')}
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t('auth.forgot_password.email_label')}
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t('auth.forgot_password.send_button')}
              </Button>

              <Stack direction="row" justifyContent="space-between">
                <Link href="/signin" variant="body2">
                  {t('auth.forgot_password.back_to_signin')}
                </Link>

                <Link href="/signup" variant="body2">
                  {t('auth.forgot_password.create_account')}
                </Link>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
