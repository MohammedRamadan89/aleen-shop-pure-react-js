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

export default function ResetPasswordPage() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    let valid = true;
    let newErrors = { password: '', confirmPassword: '' };

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = t('auth.resetPassword.password_error');
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.resetPassword.confirm_password_error');
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Password reset with:', formData.password);
      // لاحقاً سترسل التوكن + كلمة المرور الجديدة إلى API
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
            backgroundImage: 'url(https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[100] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* نموذج Reset Password */}
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
              {t('auth.resetPassword.title')}
            </Typography>

            <Typography variant="body2" sx={{ mt: 1, mb: 2, textAlign: 'center', color: 'text.secondary' }}>
              {t('auth.resetPassword.subtitle')}
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t('auth.resetPassword.password_label')}
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label={t('auth.resetPassword.confirm_password_label')}
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {t('auth.resetPassword.submit_button')}
              </Button>

              <Stack direction="row" justifyContent="center">
                <Link href="/login" variant="body2">
                  {t('auth.resetPassword.back_to_signin')}
                </Link>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
